const apiUrl = import.meta.env.VITE_API_URL

async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // ¡OBLIGATORIO para que el servidor entienda el body!
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  console.log(res)

  if (res.ok) {
    return await res.text()
  }

  throw new Error()
}

export default {
  login
}
