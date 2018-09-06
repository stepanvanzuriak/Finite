export const inject = (f, i) => args => f(args, i);

export const loopNestedObj = (obj, callback, savedKeys = "") => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === "object" && !(val instanceof Promise)) {
      loopNestedObj(
        val,
        callback,
        savedKeys === "" ? key : savedKeys + "." + key
      );
    } else {
      callback(key, val, savedKeys);
    }
  });
};

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
