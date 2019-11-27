import _ from 'lodash';
import classNames from 'classnames';
import replaceObjectKey from './utils/replaceObjectKey';
import injectGlobalCss from './utils/injectGlobalCss';
import isResolverMatch from './isResolverMatch';
import { ProviderProps, ResolverProps } from './types'

const applyResolvers = ({ resolvers, ...contextRest }: ProviderProps, props: ResolverProps) => {
  let result: ResolverProps = props;

  if (!_.isArray(resolvers)) {
    console.error('resolvers:', resolvers);
    throw new Error('Resolvers must be provided as Array.')
  }

  resolvers.forEach((resolver, index) => {
    if (_.isFunction(resolver)) {
      result = resolver(result);

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
        result = replaceObjectKey(result, key, resolver.resolve({ key, value, options }));
      }

      if (_.isFunction(resolver.globalCss)) {
        injectGlobalCss(resolver.globalCss({
          key,
          value,
          options,
          applyResolvers: (props: ResolverProps) => (
            applyResolvers({ resolvers, ...contextRest }, props)
          ),
        }), true);
      } else if (_.isString(resolver.globalCss)) {
        injectGlobalCss(resolver.globalCss, true);
      }

      if (resolver.css) {
        const css = _.isFunction(resolver.css) ? resolver.css({
          key,
          value,
          options,
          applyResolvers: (props: ResolverProps) => (
            applyResolvers({ resolvers, ...contextRest }, props)
          ),
        }) : resolver.css
        const { className } = injectGlobalCss(css, false);

        if (className) {
          if (!result.className || !result.className.match(new RegExp(`\\b${className}\\b`))) {
            result.className = classNames(className, result.className)
          }
        }
      }
    });
  });

  return result;
}

export default applyResolvers;
