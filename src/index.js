import { Context } from './Context'
import use from './use'
export const useAmendable = use(Context)

export { default as AmendableProvider } from './Provider';
export { Consumer as AmendableConsumer } from './Context';
export { default } from './Box';
