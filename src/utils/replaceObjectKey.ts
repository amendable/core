const replaceObjectKey = (object: { [key: string]: any }, replaceKey: string, newObject: object) => {
  let o: { [key: string]: any } = {}

  Object.keys(object).forEach((key: string) => {
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
