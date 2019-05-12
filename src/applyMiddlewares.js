import _ from 'lodash';
import replaceObjectKey from './utils/replaceObjectKey';

const isMiddlewareMatch = (match, key, value) => {
  if (_.isFunction(match)) {
    return match({ key, value });
  } else if (_.isRegExp(match)) {
    return key.match(match);
  } else if (_.isArray(match)) {
    return match.includes(key);
  } else if (_.isString(match)) {
    return match === key;
  } else {
    return false;
  }
}

const applyMiddlewares = ({ middlewares, ...rest }, props) => {
  let result = _.cloneDeep(props);

  middlewares.forEach((middleware, index) => {
    result = _.cloneDeep(result)

    if (_.isFunction(middleware)) {
      result = middleware(result, rest);

      if (_.isFunction(result)) {
        console.warn(`Warning: Middleware index #${index} is passed as a function. You might need to call it instead.`)
      }

      return;
    }

    if (_.isArray(middleware)) {
      result = applyMiddlewares({ middlewares: middleware, ...rest }, result);
      return;
    }

    Object.keys(result).forEach(key => {
      const value = result[key];

      if (!isMiddlewareMatch(middleware.match, key, value)) {
        return
      }

      const options = _.isFunction(middleware.options) ? middleware.options({ key, value }) : {};

      result = replaceObjectKey(result, key, middleware.resolve({ key, value, options, ...rest }));
    });
  });

  return result;
}

export default applyMiddlewares;
