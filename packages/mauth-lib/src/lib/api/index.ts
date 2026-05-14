import { LoginDto, RegisterDto } from "../types";

export class Api {
  constructor(private uri: string) { }

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

    const jsonErr = await res.json()
    throw new Error(jsonErr.code)
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

    const jsonErr = await res.json()
    throw new Error(jsonErr.code)
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

    const jsonErr = await res.json()
    throw new Error(jsonErr.code)
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

    const jsonErr = await res.json()
    throw new Error(jsonErr.code)
  }
}
