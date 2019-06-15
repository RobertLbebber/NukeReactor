import _ from "lodash";
/**
 * This method generates a random string of digit length
 * @param {Number} digits the number of hexes in the string
 */
export var generateSerial = (digits, radis = 16) => {
  return Math.floor(Math.random() * Math.pow(digits, digits)).toString(radis);
};

export let ifNil = (operator, alternative = null) => {
  return _.isNil(operator) ? alternative : operator;
};

export const switchCase = key => cases => defaultCase => {
  return cases.hasOwnProperty(key) ? cases[key] : defaultCase;
};
export const switchBlock = key => cases => defaultCase => {
  const executeIfFunction = f => (f instanceof Function ? f() : f);
  const switchcaseF = key => cases => defaultCase => executeIfFunction(switchCase(key)(cases)(defaultCase));
  return switchcaseF(key)(cases)(defaultCase);
};
export const switchBox = (key, cases, defaultCase) => {
  return switchBlock(key)(cases)(defaultCase);
};

export default (module.export = {
  generateSerial,
  ifNil,
  switchBox
});
