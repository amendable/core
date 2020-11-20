export type ApplyResolversFn = ({ resolvers, ...contextRest }: ProviderProps, props: ResolverProps) => ResolverProps
export interface Options {
  key: string;
  value: any;
}
export interface ResolveType {
  key: string;
  value: any;
  props: ResolverProps;
  options: Options | {};
  applyResolvers: (props: ResolverProps) => ResolverProps
}
export interface Resolver {
  match: any;
  resolve?: (resolve: ResolveType) => object;
  options?: (options: Options) => object;
}

export interface ProviderProps {
  resolvers?: Resolver[];
}

export interface BoxProps {
  children?: Resolver[];
  [x: string]: any;
}

export interface ResolverProps {
  className?: string;
  [key: string]: any;
}
