import _ from "lodash";
/**
 * This method generates a random string of digit length
 * @param {Number} digits the number of hexes in the string
 */
export const generateSerial = (digits, radis = 16) => {
  return Math.floor(Math.random() * Math.pow(digits, digits)).toString(radis);
};

export const ifNil = (operator, alternative = null) => {
  return _.isNil(operator) ? alternative : operator;
};

export const ifThen = (operator, alternative = null) => {
  return !_.isNil(operator) ? alternative : null;
};

export function isAnyNil() {
  return _.some(...arguments, _.isNil);
}

export function prettyNumber(object, path) {
  let number = _.get(object, path, NaN).toLocaleString();
  return !_.isNaN(number) ? number : "?";
}

export default {
  generateSerial,
  ifNil,
  ifThen,
  isAnyNil,
  prettyNumber
};
