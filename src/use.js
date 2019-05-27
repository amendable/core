import { useContext } from 'react'
import applyResolvers from './applyResolvers'

export default Context => props => applyResolvers(useContext(Context), props);
