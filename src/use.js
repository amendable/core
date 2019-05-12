import {
    useContext,
} from 'react'

import applyMiddlewares from './applyMiddlewares'

export default (Context) => (props) => {
  const context = useContext(Context)
  return applyMiddlewares(context, props)
}
