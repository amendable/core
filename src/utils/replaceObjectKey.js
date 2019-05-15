const replaceObjectKey = (object, replaceKey, newObject) => {
  let o = {}

  Object.keys(object).forEach(key => {
    if (key === replaceKey) {
      Object.assign(o, newObject);
    } else {
      delete o[key];
      o[key] = object[key];
    }
  });

  return o;
}

export default replaceObjectKey;
