import _ from "lodash";
export const findKey = (rec, key) => {
  if (rec === undefined) return;
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

export const pop = (array, index) => _.remove(array, (n, i) => index == i);

export const isJson = str => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

export default (module.export = {
  isJson
});
