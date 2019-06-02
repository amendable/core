import _ from 'lodash';
import stylis from 'stylis';
import classNames from 'classnames';
import replaceObjectKey from './utils/replaceObjectKey';
import hashStr from './utils/hash';

const isResolverMatch = (match, key, value) => {
  if (_.isFunction(match)) {
    return match({ key, value });
  } else if (_.isRegExp(match)) {
    return key.match(match);
  } else if (_.isArray(match)) {
    return match.includes(key);
  } else if (_.isString(match)) {
    return match === key;
  } else if (_.isUndefined(match)) {
    return true;
  } else {
    return match;
  }
}

const injectGlobalCss = (css, global = true) => {
  const id = `amendable-${hashStr(css)}`;
  const stylisSelector = global ? '' : `.${id}`;
  const className = global ? null : id;

  if (!document.head.querySelector(`#${id}`)) {
    const node = document.createElement('style')
    node.id = id
    node.textContent = stylis(stylisSelector, css)
    node.type = 'text/css'

    document.head.appendChild(node)
  }

  return { className }
}

const applyResolvers = ({ resolvers, ...contextRest }, props) => {
  let result = props;

  if (!_.isArray(resolvers)) {
    console.error('Resolvers:', resolvers);
    throw new Error('Resolvers must be provided as Array.')
  }

  resolvers.forEach((resolver, index) => {
    result = _.cloneDeep(result)

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

      const options = _.isFunction(resolver.options) ? resolver.options({ key, value, hashStr }) : {};

      if (resolver.resolve) {
        result = replaceObjectKey(result, key, resolver.resolve({ key, value, options }));
      }

      if (_.isFunction(resolver.globalCss)) {
        injectGlobalCss(resolver.globalCss({
          key,
          value,
          options,
          applyResolvers: (props) => (
            applyResolvers({ resolvers, ...contextRest }, props)
          ),
        }), true);
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
