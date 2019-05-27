import React from 'react'
import {
  Consumer,
  Provider,
} from './Context'

export default ({
  children,
  middlewares = [],
  ...rest
}) => (
  <Provider value={{
    middlewares,
    ...rest,
  }}>
    {children}
  </Provider>
)
