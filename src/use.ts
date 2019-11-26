import { useContext } from 'react';
import { Context } from './Context';
import applyResolvers from './applyResolvers';

export default (props: object) =>
  applyResolvers(useContext(Context), props);
