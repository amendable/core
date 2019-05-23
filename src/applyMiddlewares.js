import _ from 'lodash';
import stylis from 'stylis';
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

  if (document.head.querySelector(`#${id}`)) return;

  const node = document.createElement('style')
  node.id = id
  node.textContent = stylis(global ? '' : id, css)
  node.type = 'text/css'

  document.head.appendChild(node)
}

const applyMiddlewares = ({ middlewares, ...contextRest }, props) => {
  let result = props;

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

      if (_.isFunction(middleware.css)) {
        injectGlobalCss(middleware.css({ key, value, options }));
      } else if (_.isString(middleware.css)) {
        injectGlobalCss(middleware.css);
      }
    });
  });

  return result;
}

export default applyMiddlewares;
