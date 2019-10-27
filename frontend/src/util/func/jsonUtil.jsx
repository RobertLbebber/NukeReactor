import _ from "lodash";

export const findKey = (rec, key) => {
  if (_.isNil(rec)) return;
  else if (rec[key]) return rec;
  else if (rec instanceof Object) {
    for (let i = 0; i < Object.keys(rec).length; i++) {
      let wasFound = findKey(rec[Object.keys(rec)[i]], key);
      if (wasFound !== undefined) {
        return wasFound;
      }
    }
  }
  return;
};

export const pop = (array, index) => _.remove(array, (n, i) => index === i);

export const isJson = str => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

export function flatten(json) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop + "[" + i + "]");
      if (l === 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(json, "");
  return result;
}

export const isNilDeep = (item, path) => {
  let descent = item;
  if (_.isNil(item)) {
    return null;
  }

  for (let i = 0; i < path.length; i++) {
    let current = path[i];
    descent = descent[current];
    if (_.isNil(descent)) {
      return false;
    }
  }
  return true;
};

export const isNilGetDeep = (item, path) => {
  let descent = item;
  if (_.isNil(item)) {
    return null;
  }

  for (let i = 0; i < path.length; i++) {
    let current = path[i];
    descent = descent[current];
    if (_.isNil(descent)) {
      return null;
    } else if (i === path.length - 1) {
      return descent;
    }
  }
  return null;
};

export default {
  isJson,
  flatten
};
