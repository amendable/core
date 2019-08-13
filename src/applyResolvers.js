import _ from 'lodash';
import classNames from 'classnames';
import replaceObjectKey from './utils/replaceObjectKey';
import injectGlobalCss from './utils/injectGlobalCss';
import isResolverMatch from './isResolverMatch';

const applyResolvers = ({ resolvers, ...contextRest }, props) => {
  let result = props;

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
      const value = result[key];

      if (!isResolverMatch(resolver.match, key, value)) {
        return
      }

      const options = _.isFunction(resolver.options) ? resolver.options({ key, value }) : {};

      if (resolver.resolve) {
        result = replaceObjectKey(result, key, resolver.resolve({ key, value, options }));
      }

      if (_.isFunction(resolver.globalCss)) {
        injectGlobalCss(resolver.globalCss({ key, value, options }), true);
      } else if (_.isString(resolver.globalCss)) {
        injectGlobalCss(resolver.globalCss, true);
      }

      if (resolver.css) {
        const css = _.isFunction(resolver.css) ? resolver.css({ key, value, options }) : resolver.css
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
