import * as deepmerge from 'deepmerge';

export const inject = (f, i) => (args) => f(args, i);

export function log(...args) {
  console.log(args);
}

export const loopNestedObj = (obj, callback, savedKeys = []) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object' && !(val instanceof Promise)) {
      loopNestedObj(val, callback, [...savedKeys, key]);
    } else {
      callback(val, [...savedKeys, key]);
    }
  });
};

export const merge = (a, b) =>
  deepmerge(a, b, {
    arrayMerge: (_, sourceArray) => sourceArray,
  });
