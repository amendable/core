import { createContext } from 'react';
import { ProviderProps } from './types';

const defaultContext = {
  resolvers: [],
};

export const Context = createContext<ProviderProps>(defaultContext);
export const { Consumer, Provider } = Context;
