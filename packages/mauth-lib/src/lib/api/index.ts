import { LoginDto } from "../types";

export class Api {
  constructor(private uri: string) { }

  async login(body: LoginDto) {
    const res = await fetch(`${this.uri}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    console.log(res)

    if (res.ok) {
      return await res.text()
    }

    const jsonErr = await res.json()
    throw new Error(jsonErr.code)
  }
}
