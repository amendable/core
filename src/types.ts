export interface Resolver {
  match: any,
}

export interface ProviderProps {
  resolvers?: Resolver[]
}
