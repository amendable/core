import { createContext } from 'react'

const defaultContext = {
  middlewares: [],
}

export const { Consumer, Provider } = createContext(defaultContext)
