/**
 * This method generates a random string of digit length
 * @param {Number} digits the number of hexes in the string
 */
export var generateSerial = (digits, radis = 16) => {
  return (Math.random() * Math.pow(10, digits)).toString(radis);
};

export default (module.export = {
  generateSerial
});
