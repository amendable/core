import { createContext } from 'react';

const defaultContext = {
  resolvers: [],
};

export const Context = createContext(defaultContext);
export const { Consumer, Provider } = Context;
