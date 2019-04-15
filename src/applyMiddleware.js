import _ from 'lodash';

const isKeyMatch = (match, key, value) => {
  if (_.isFunction(match)) {
    return match({ key, value });
  } else if (_.isRegExp(match)) {
    return match.match(key);
  } else if (_.isArray(match)) {
    return _.any(match, key);
  } else {
    return false;
  }
}

const applyMiddleware = (middleware, props) => {
  Object.keys(props).forEach(key => {
    const value = props[key];

    if (!isKeyMatch(middleware.match, key, value)) { return props; }

    const options = _.isFunction(middleware.options) ? middleware.options({ key, value }) : {};

    return middleware.resolve({ key, value, options });
  })
}

export default applyMiddleware;
