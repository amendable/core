import React, { useState } from 'react'
import {
  StyleCacheProvider,
  UniversalStyle,
} from 'react-css-component'
import {
  Consumer,
  Provider,
} from './Context'

export default ({
  middlewares,
  children,
  ...rest
}) => {
  const [globalCss, setGlobalCss] = useState('')
  const appendGlobalCss = (value) => setGlobalCss([globalCss, value].join('\n'))
  console.log(globalCss)

  return (
    <StyleCacheProvider>
      <UniversalStyle css={globalCss} />
      <Provider value={{
        middlewares,
        appendGlobalCss,
        ...rest,
      }}>
        {children}
      </Provider>
    </StyleCacheProvider>
  )
}
