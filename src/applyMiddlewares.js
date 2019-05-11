import _ from 'lodash';

const isMiddlewareMatch = (match, key, value) => {
  if (_.isFunction(match)) {
    return match({ key, value });
  } else if (_.isRegExp(match)) {
    return key.match(match);
  } else if (_.isArray(match)) {
    return match.includes(key);
  } else {
    return false;
  }
}

const applyMiddlewares = (middlewares, props) => {
  let result = _.cloneDeep(props);

  middlewares.forEach((middleware, index) => {
    result = _.cloneDeep(result)

    if (_.isFunction(middleware)) {
      result = middleware(result);

      if (_.isFunction(result)) {
        console.warn(`Warning: Middleware index #${index} is passed as a function. You might need to call it instead.`)
      }

      return;
    }

    Object.keys(result).forEach(key => {
      const value = result[key];

      if (!isMiddlewareMatch(middleware.match, key, value)) return

      const options = _.isFunction(middleware.options) ? middleware.options({ key, value }) : {};

      delete result[key]
      Object.assign(result, middleware.resolve({ key, value, options }));
    });
  });

  return result;
}

export default applyMiddlewares;
