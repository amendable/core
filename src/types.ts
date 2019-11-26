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
