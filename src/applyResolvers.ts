import _ from 'lodash';
import replaceObjectKey from './utils/replaceObjectKey';
import isResolverMatch from './isResolverMatch';
import { ApplyResolversFn, ResolverProps } from './types'

const applyResolvers: ApplyResolversFn = ({ resolvers, ...contextRest }, props) => {
  let result: ResolverProps = props;

  if (!_.isArray(resolvers)) {
    console.error('resolvers:', resolvers);
    throw new Error('Resolvers must be provided as Array.')
  }

  resolvers.forEach((resolver, index) => {
    if (_.isFunction(resolver)) {
      result = resolver(
        result,
        {
          applyResolvers: (props: ResolverProps) => (
            applyResolvers({ resolvers, ...contextRest }, props)
          ),
        }
      );

      if (_.isFunction(result)) {
        console.warn(`Warning: Resolver index #${index} is passed as a function. You might need to call it instead.`)
      }

      return;
    }

    if (_.isArray(resolver)) {
      result = applyResolvers({ resolvers: resolver, ...contextRest }, result);
      return;
    }

    Object.keys(result).forEach(key => {
      const value: any = result[key];

      if (!isResolverMatch(resolver.match, key, value)) {
        return
      }

      const options = _.isFunction(resolver.options) ? resolver.options({ key, value }) : {};

      if (resolver.resolve) {
        result = replaceObjectKey(result, key, resolver.resolve({
          key,
          value,
          props: result,
          options,
          applyResolvers: (props: ResolverProps) => (
            applyResolvers({ resolvers, ...contextRest }, props)
          ),
        }));
      }
    });
  });

  return result;
}

export default applyResolvers;
