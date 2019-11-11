import React from 'react';
import { Consumer, Provider } from './Context';

export default ({ children, resolvers = [], ...rest }) => (
  <Provider value={{ resolvers, ...rest }}>{children}</Provider>
);
