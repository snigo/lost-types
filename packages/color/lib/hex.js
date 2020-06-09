const { appendHSL, extractGroups, rgbRange } = require('./utils');

const HEX_RE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i;
const HEX_RE_S = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;

/**
 * @function hexByteToDec Converts 8-bit hexadecimal number to a decimal number
 *
 * @param {string} hex 8-bit hexadecimal number between 00 and ff
 *
 * @returns {number} Converted decimal number
 */
function hexByteToDec(hex) {
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
  num = rgbRange.clamp(+num);
  return num.toString(16).padStart(2, '0');
}

function parseHexColor(hexColor) {
  if (typeof hexColor !== 'string') return [];

  const re = hexColor.length > 5 ? HEX_RE : HEX_RE_S;

  const groups = extractGroups(hexColor, re);
  if (!groups.length) return groups;

  const rgba = groups.map(hexByteToDec);
  rgba[3] = rgba[3] !== undefined ? rgbRange.getFraction(rgba[3], 4) : 1;

  return appendHSL(rgba);
}

module.exports = {
  parseHexColor,
  decByteToHex,
};
