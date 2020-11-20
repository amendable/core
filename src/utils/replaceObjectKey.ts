type PlainObject = { [key: string]: any };

type ReplaceObjectKeyFn = (
  object: PlainObject,
  replaceKey: string,
  newObject: object
) => PlainObject;

const replaceObjectKey: ReplaceObjectKeyFn = (
  object,
  replaceKey,
  newObject
) => {
  let o: PlainObject = {};

  Object.keys(object).forEach((key: string) => {
    if (key === replaceKey) {
      Object.assign(o, newObject);
    } else {
      delete o[key];
      o[key] = object[key];
    }
  });

  return o;
};

export default replaceObjectKey;
