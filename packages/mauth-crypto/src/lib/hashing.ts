import * as crypto from 'crypto'

export function hash(info: string): string {
  return crypto.hash('sha256', Buffer.from(info))
}
