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
