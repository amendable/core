import _ from 'lodash';

export default (match: any, key: string, value: any) => {
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
};
