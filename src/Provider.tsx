import React from 'react';
import { Provider } from './Context';
import { ProviderProps } from './types';

const AmendableProvider: React.FC<ProviderProps> = ({ children, resolvers, ...rest }) => (
  <Provider value={{ resolvers, ...rest }}>{children}</Provider>
);

export default AmendableProvider;
