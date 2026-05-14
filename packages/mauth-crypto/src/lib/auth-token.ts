import * as crypto from 'node:crypto'

export type AuthToken = {
  author: string
  expire: number
  userId: string
}

export function GenerateToken(author: string, userId: string, offset = 500000): AuthToken {
  return {
    author,
    expire: Date.now() + offset,
    userId
  }
}

export function SignToken(token: AuthToken, privateKey: string): string {
  const stringToken = Buffer.from(JSON.stringify(token)).toString('base64url')

  const sign = crypto.sign(
    'sha256',
    Buffer.from(stringToken),
    privateKey
  ).toString('base64url')

  return `${stringToken}.${sign}`
}

export function ValidateToken(rawToken: string, publicKey: string): AuthToken | undefined {
  try {
    const strokes = rawToken.split('.')

    if (strokes.length !== 2) {
      console.error('Incorrect format')
      return undefined
    }

    const [payload, signature] = strokes

    const isValid = crypto.verify(
      'sha256',
      Buffer.from(payload),
      publicKey,
      Buffer.from(signature, 'base64url')
    )

    if (!isValid)
      return undefined

    const token = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AuthToken

    if (Date.now() > token.expire) {
      console.error('token expire')
      return undefined
    }

    return token;
  }
  catch (error) {
    console.error(error)
    return undefined
  }
}

export function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Longitud estándar segura
    publicKeyEncoding: {
      type: 'spki',       // "Subject Public Key Info" (estándar para llaves públicas)
      format: 'pem',      // Formato de texto legible
    },
    privateKeyEncoding: {
      type: 'pkcs8',      // Estándar moderno para llaves privadas
      format: 'pem',
    },
  });

  return { publicKey, privateKey };
}
