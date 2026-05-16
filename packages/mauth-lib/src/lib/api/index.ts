import { LoginDto, MauthError, RegisterDto } from "../types";

export class Api {
  constructor(private uri: string, public onRevokeToken: () => void) { }

  handleErrors(err: MauthError) {
    if (err.revoked) this.onRevokeToken()

    return new Error(err.code)
  }

  async login(body: LoginDto) {
    const res = await fetch(`${this.uri}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (res.ok) {
      return await res.text()
    }

    throw this.handleErrors(await res.json())
  }

  async register(body: RegisterDto) {
    const res = await fetch(`${this.uri}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (res.ok) {
      return await res.text()
    }


    throw this.handleErrors(await res.json())
  }

  async validate() {
    const res = await fetch(`${this.uri}/auth/validate`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (res.ok) {
      return await res.json()
    }


    throw this.handleErrors(await res.json())
  }

  async logout() {
    const res = await fetch(`${this.uri}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (res.ok) {
      return await res.text()
    }

    throw this.handleErrors(await res.json())
  }
}
