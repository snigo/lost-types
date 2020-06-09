const { parseRgbaArray } = require('./array');
const parseColorObject = require('./object');
const { parseNamed } = require('./named');
const { parseHexColor } = require('./hex');
const parseRgba = require('./rgb');
const parseHsla = require('./hsl');

/**
 * @function parseColor Parses color and returns array of [r, g, b, h, s, l, a] values
 * @param {string | Array | Object} color Color in any acceptable by browsers format:
 * hex, RGB, HSL or named color string, RGBA array or object
 * @returns {number[]} Array of red, green, blue, hue, saturation, luminosity and alpha values where
 * red, green and blue are integers in [0, 255] range, hue is integer in [0, 359] range
 * saturation and luminosity are integers in [0, 100] range and alpha is decimal in [0, 1] range
 */
function parseColor(color) {
  if (color == null) return [];
  let output = [];

  const parsers = [
    parseHsla,
    parseRgba,
    parseHexColor,
    parseNamed,
    parseColorObject,
    parseRgbaArray,
  ];

  while (parsers.length && !output.length) {
    output = parsers.pop()(color);
  }

  return output;
}

module.exports = parseColor;
