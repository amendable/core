export interface Resolver {
  match: any,
  css?: ({}) => string | string,
  globalCss?: ({}) => string | string,
  resolve?: ({}) => object,
  options?: ({}: { key: string, value: any }) => object,
}

export interface ProviderProps {
  resolvers?: Resolver[],
}

export interface BoxProps {
  children?: Resolver[],
  [x:string]: any;
}

export interface ResolverProps {
  className?: string,
  [key: string]: any,
}
