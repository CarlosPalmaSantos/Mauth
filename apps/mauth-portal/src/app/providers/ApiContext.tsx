import { Api, UserDto } from '@mauth/mauth-lib'
import { ReactNode, useState, createContext, useContext, useEffect } from "react";


const ApiContext = createContext<{ api: Api, user: UserDto | undefined, setUser: (user: UserDto | undefined) => void } | undefined>(undefined)

export function ApiProvider({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<Api>(new Api(import.meta.env.VITE_API_URL))
  const [user, setUser] = useState<UserDto>()

  return <ApiContext.Provider value={{
    api, user, setUser
  }} >
    {children}
  </ ApiContext.Provider>
}

export function useApi() {
  const ctx = useContext(ApiContext)

  if (ctx === undefined) {
    throw new Error('useApi must be inside an ApiProvider')
  }

  async function validate() {
    if (!ctx?.api) {
      ctx?.setUser(undefined)
      throw new Error('API_UNREACHABLE')
    }
    const res = await ctx.api.validate()
    ctx.setUser(res)
  }

  return {
    api: ctx.api,
    user: ctx.user,
    validate
  }
}
