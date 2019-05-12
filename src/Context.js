import { createContext } from 'react'

const defaultContext = {
  middlewares: [],
}

export const Context = createContext(defaultContext)
export const { Consumer, Provider } = Context
