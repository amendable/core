import _ from 'lodash';

const isMiddlewareMatch = (match, key, value) => {
  if (_.isFunction(match)) {
    return match({ key, value });
  } else if (_.isRegExp(match)) {
    return match.match(key);
  } else if (_.isArray(match)) {
    return match.includes(key);
  } else {
    return false;
  }
}

const applyMiddlewares = (middlewares, props) => {
  let result = {};

  middlewares.forEach(middleware => {
    if (_.isFunction(middleware)) {
      result = middleware(props);
      return;
    }

    Object.keys(props).forEach(key => {
      const value = props[key];

      if (!isMiddlewareMatch(middleware.match, key, value)) {
        result[key] = value;
        return;
      }

      const options = _.isFunction(middleware.options) ? middleware.options({ key, value }) : {};

      Object.assign(result, middleware.resolve({ key, value, options }));
    });
  });

  return result;
}

export default applyMiddlewares;
