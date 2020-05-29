const Range = require('../../range/lib/range');
const { toNumber, round } = require('../../mathx/lib/mathx');

const byteRange = new Range(0, 255);
const hueRange = new Range(0, 359);

/**
 * @function hexByteToDec Converts 8-bit hexadecimal number to a decimal number
 *
 * @param {string} hex 8-bit hexadecimal number between 00 and ff
 *
 * @returns {number} Converted decimal number
 */
function hexByteToDec(hex) {
  if (/[^0-9a-f]/i.test(hex)) return NaN;
  return parseInt(hex.length === 1 ? hex.repeat(2) : hex.substring(0, 2), 16);
}


/**
 * @function decByteToHex Converts decimal number to 8-bit hexadecimal number
 *
 * @param {number | string} num Number to be converted
 *
 * @returns {string} 8-bit hexadecimal number between 00 and ff
 */
function decByteToHex(num) {
  num = byteRange.clamp(+num);
  return num.toString(16).padStart(2, '0');
}


/**
 * @function toDegrees Converts CSS approved angle units to degrees
 * List of units: https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 *
 * @param {string} angle Angle unitin degrees, turns, radians or gradians
 *
 * @returns {number} Number of degrees
 */
function toDegrees(angle) {
  const [unit] = angle.toString().match(/\D+$/) || ['deg'];
  switch (unit.toLowerCase()) {
    case 'turn':
      return round(hueRange.mod(parseFloat(angle.toString()) * 360), 0);

    case 'rad':
      return round(hueRange.mod(parseFloat(angle.toString()) * (180 / Math.PI)), 0);

    case 'grad':
      return round(hueRange.mod(parseFloat(angle.toString()) * 0.9), 0);

    case 'deg':
      return round(hueRange.mod(parseFloat(angle.toString())), 0);
    default:
      return NaN;
  }
}

function extractGroups(str, re) {
  const groups = re.exec(str);
  if (!groups) throw Error(`Cannot recognize color: ${str}`);
  return groups.filter((value, index) => index && !!value);
}

function assumeRgbPercentage(value) {
  if (value == null) return undefined;

  if (/%$/.test(value.toString())) {
    return byteRange.fromFraction(toNumber(value), 0);
  }
  return round(value, 0);
}

function assumeHslPercentage(value) {
  if (value == null) return undefined;

  return round(/%$/.test(value.toString()) ? +value.toString().replace(/%/, '') / 100 : value, 2);
}

/**
 * @function defined Checks whether arguments are defined (not equal to undefined)
 *
 * @param  {...any} args List of values to be checked
 *
 * @returns {boolean} True if all arguments are defined
 * or false if at least one argument is undefined
 */
function defined(...args) {
  return args.every((arg) => arg != null && !Number.isNaN(arg));
}

module.exports = {
  assumeHslPercentage,
  assumeRgbPercentage,
  decByteToHex,
  defined,
  extractGroups,
  hexByteToDec,
  toDegrees,
};
