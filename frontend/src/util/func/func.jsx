/**
 * This method generates a random string of digit length
 * @param {Number} digits the number of hexes in the string
 */
export var generateSerial = (digits, radis = 16) => {
  return Math.floor(Math.random() * Math.pow(digits, digits)).toString(radis);
};

export var isJson = str => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

export default (module.export = {
  generateSerial,
  isJson
});
