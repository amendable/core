import _ from 'lodash';

const isKeyMatch = (match, key, value) => {
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

const applyMiddleware = (middleware, props) => {
  const style = {};
  const originalProps = {}

  Object.keys(props).forEach(key => {
    const value = props[key];

    if (!isKeyMatch(middleware.match, key, value)) {
      originalProps[key] = value;
      return;
    }

    const options = _.isFunction(middleware.options) ? middleware.options({ key, value }) : {};

    Object.assign(style, middleware.resolve({ key, value, options }));
  })

  return { style, props: originalProps };
}

export default applyMiddleware;
