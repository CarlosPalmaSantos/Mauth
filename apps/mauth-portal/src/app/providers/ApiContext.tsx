import { Api } from '@mauth/mauth-lib'
import { ReactNode, useState, createContext, useContext } from "react";

const ApiContext = createContext<Api | undefined>(undefined)

export function ApiProvider({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<Api>(new Api(import.meta.env.VITE_API_URL))

  return <ApiContext.Provider value={api}>
    {children}
  </ApiContext.Provider>
}

export function useApi() {
  const ctx = useContext(ApiContext)

  if (ctx === undefined) {
    throw new Error('useApi must be inside an ApiProvider')
  }

  return ctx
}
