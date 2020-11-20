export interface Resolver {
  match: any;
  resolve?: (resolve: { key: string, value: any }) => object;
  options?: (options: { key: string, value: any }) => object;
}

export interface ProviderProps {
  resolvers?: Resolver[] | Resolver[][];
}

export interface BoxProps {
  children?: Resolver[];
  [x: string]: any;
}

export interface ResolverProps {
  className?: string;
  [key: string]: any;
}
