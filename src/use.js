import { useContext } from 'react'
import applyMiddlewares from './applyMiddlewares'

export default Context => props => applyMiddlewares(useContext(Context), props);
