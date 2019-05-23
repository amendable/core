import _ from 'lodash';
import stylis from 'stylis';
import classNames from 'classnames';
import replaceObjectKey from './utils/replaceObjectKey';
import hashStr from './utils/hash';

const isMiddlewareMatch = (match, key, value) => {
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

const applyMiddlewares = ({ middlewares, ...contextRest }, props) => {
  let result = props;

  if (!_.isArray(middlewares)) {
    console.error('Middlewares:', middlewares);
    throw new Error('Middlewares must be provided as Array.')
  }

  middlewares.forEach((middleware, index) => {
    result = _.cloneDeep(result)

    if (_.isFunction(middleware)) {
      result = middleware(result);

      if (_.isFunction(result)) {
        console.warn(`Warning: Middleware index #${index} is passed as a function. You might need to call it instead.`)
      }

      return;
    }

    if (_.isArray(middleware)) {
      result = applyMiddlewares({ middlewares: middleware, ...contextRest }, result);
      return;
    }

    Object.keys(result).forEach(key => {
      const value = result[key];

      if (!isMiddlewareMatch(middleware.match, key, value)) {
        return
      }

      const options = _.isFunction(middleware.options) ? middleware.options({ key, value }) : {};

      if (middleware.resolve) {
        result = replaceObjectKey(result, key, middleware.resolve({ key, value, options }));
      }

      if (_.isFunction(middleware.globalCss)) {
        injectGlobalCss(middleware.globalCss({ key, value, options }), true);
      } else if (_.isString(middleware.globalCss)) {
        injectGlobalCss(middleware.globalCss, true);
      }

      if (middleware.css) {
        const css = _.isFunction(middleware.css) ? middleware.css({ key, value, options }) : middleware.css
        const { className } = injectGlobalCss(css, false);

        if (className) {
          result.className = classNames(className, result.className)
        }
      }
    });
  });

  return result;
}

export default applyMiddlewares;
