const Range = require('../../range/lib/range');
const { toNumber, round } = require('../../mathx/lib/mathx');

const namedColors = require('./named-colors');
const { HEX_RE, RGBA_RE, HSLA_RE } = require('./regex');
const {
  assumeHslPercentage,
  assumeRgbPercentage,
  defined,
  extractGroups,
  hexByteToDec,
  toDegrees,
} = require('./utils');

const rgbRange = new Range(255);
const hueRange = new Range(359);
const percentRange = new Range(1);

/**
 * @function hexToRgba Converts hex string to array of [red, green, blue, alpha] values
 *
 * @param {string} hex Color in #hex format
 *
 * @returns {number[]} Array of red, green, blue and alpha values where
 * red, green and blue are integers in [0, 255] range and alpha is decimal in [0, 1] range
 */
function hexToRgba(hexString) {
  const rgba = extractGroups(hexString, HEX_RE).map(hexByteToDec);
  rgba[3] = rgba[3] !== undefined ? rgbRange.getFraction(rgba[3], 4) : 1;

  return rgba;
}


/**
 * @function appendHSL Helper function for parseColor()
 * Appends Hue, Saturation and Luminosity values to input rgbaArray
 *
 * @param {number[]} rgbaArray Array of red, green, blue and alpha values
 *
 * @returns {number[]} Array of red, green, blue, hue, saturation, luminosity and alpha values where
 * red, green and blue are integers in [0, 255] range, hue is integer in [0, 359] range
 * saturation and luminosity are integers in [0, 100] range and alpha is decimal in [0, 1] range
 */
function appendHSL([red, green, blue, alpha]) {
  const R = red / 255;
  const G = green / 255;
  const B = blue / 255;

  const min = Math.min(R, G, B);
  const max = Math.max(R, G, B);
  const chroma = max - min;

  let hue = 0;
  let saturation = 0;
  let lightness = 0;

  if (chroma === 0) {
    hue = 0;
  } else if (max === R) {
    hue = (G - B) / chroma;
  } else if (max === G) {
    hue = (B - R) / chroma + 2;
  } else {
    hue = (R - G) / chroma + 4;
  }

  hue = hueRange.mod(round(hue * 60, 0));

  lightness = (max + min) / 2;

  if (lightness > 0 && lightness <= 0.5) {
    saturation = chroma / (2 * lightness);
  } else {
    saturation = chroma / ((2 - 2 * lightness) || lightness);
  }

  lightness = percentRange.clamp(round(lightness, 2));
  saturation = percentRange.clamp(round(saturation, 2));


  return [red, green, blue, hue, saturation, lightness, alpha];
}


/**
 * @function appendRGB Helper function for parseColor()
 * Appends Red, Green and Blue values to input hslaArray
 *
 * @param {number[]} hslaArray Array of hue, saturation, luminance and alpha values
 *
 * @returns {number[]} Array of red, green, blue, hue, saturation, luminosity and alpha values where
 * red, green and blue are integers in [0, 255] range, hue is integer in [0, 359] range
 * saturation and luminosity are integers in [0, 100] range and alpha is decimal in [0, 1] range
 */
function appendRGB([hue, saturation, lightness, alpha]) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const brightness = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue >= 0 && hue < 60) {
    red = chroma;
    green = x;
    blue = 0;
  } else if (hue >= 60 && hue < 120) {
    red = x;
    green = chroma;
    blue = 0;
  } else if (hue >= 120 && hue < 180) {
    red = 0;
    green = chroma;
    blue = x;
  } else if (hue >= 180 && hue < 240) {
    red = 0;
    green = x;
    blue = chroma;
  } else if (hue >= 240 && hue < 300) {
    red = x;
    green = 0;
    blue = chroma;
  } else if (hue >= 300 && hue < 360) {
    red = chroma;
    green = 0;
    blue = x;
  }

  red = rgbRange.clamp(round((red + brightness) * 255, 0));
  green = rgbRange.clamp(round((green + brightness) * 255, 0));
  blue = rgbRange.clamp(round((blue + brightness) * 255, 0));

  return [red, green, blue, hue, saturation, lightness, alpha];
}


/**
 * @function parseColorString Parses color and returns array of [r, g, b, h, s, l, a] values
 * @param {string} colorString Color in any acceptable by browsers format:
 * hex, RGB, HSL or named color
 * @returns {number[]} Array of red, green, blue, hue, saturation, luminosity and alpha values where
 * red, green and blue are integers in [0, 255] range, hue is integer in [0, 359] range
 * saturation and luminosity are integers in [0, 100] range and alpha is decimal in [0, 1] range
 */
function parseColorString(colorString) {
  colorString = colorString.toString().trim().toLowerCase();

  // If transparent (keyword for rgb(0, 0, 0))
  if (colorString === 'transparent') {
    return [0, 0, 0, 0, 0, 0, 0];
  }

  // If color is in hex format
  if (colorString.startsWith('#')) {
    try {
      const rgba = hexToRgba(colorString);
      return appendHSL(rgba);
    } catch (e) {
      return [];
    }
  }

  // If color is named color
  if (namedColors.has(colorString)) {
    try {
      const rgba = hexToRgba(namedColors.get(colorString));
      return appendHSL(rgba);
    } catch (e) {
      return [];
    }
  }


  // If color is in RGBA() format
  try {
    if (/^rgb/.test(colorString)) {
      const rgbGroups = extractGroups(colorString, RGBA_RE)
        .map((value, index) => {
          if (index < 3) {
            return rgbRange.clamp(assumeRgbPercentage(value));
          }
          return percentRange.clamp(toNumber(value, 4));
        });

      if (rgbGroups[3] == null) {
        rgbGroups[3] = 1;
      }

      return appendHSL(rgbGroups);
    }
  } catch (e) {
    return [];
  }

  // If color is in HSLA() format
  if (/^hsl/.test(colorString)) {
    try {
      const groups = extractGroups(colorString, HSLA_RE);
      const hue = toDegrees(groups[0]);
      const saturation = percentRange.clamp(assumeHslPercentage(groups[1]));
      const lightness = percentRange.clamp(assumeHslPercentage(groups[2]));
      const alpha = percentRange.clamp(toNumber((groups[3] || 1), 4));

      return appendRGB([hue, saturation, lightness, alpha]);
    } catch (e) {
      return [];
    }
  }

  return [];
}


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
  if (typeof color === 'string') return parseColorString(color);

  let red;
  let green;
  let blue;
  let hue;
  let saturation;
  let lightness;
  let alpha;

  if (Array.isArray(color)) {
    red = rgbRange.clamp(assumeRgbPercentage(color[0]));
    green = rgbRange.clamp(assumeRgbPercentage(color[1]));
    blue = rgbRange.clamp(assumeRgbPercentage(color[2]));
    alpha = defined(color[3]) ? percentRange.clamp(round(color[3], 4)) : 1;
  } else if (typeof color === 'object' && 'red' in color) {
    red = rgbRange.clamp(assumeRgbPercentage(color.red));
    green = rgbRange.clamp(assumeRgbPercentage(color.green));
    blue = rgbRange.clamp(assumeRgbPercentage(color.blue));
    alpha = defined(color.alpha) ? percentRange.clamp(round(color.alpha, 4)) : 1;
  } else if (typeof color === 'object' && 'hue' in color) {
    hue = hueRange.mod(round(color.hue, 0));
    saturation = percentRange.clamp(assumeHslPercentage(color.saturation));
    lightness = percentRange.clamp(assumeHslPercentage(color.lightness));
    alpha = defined(color.alpha) ? percentRange.clamp(round(color.alpha, 4)) : 1;
  }


  if (defined(red, green, blue) && !defined(hue, saturation, lightness)) {
    return appendHSL([red, green, blue, alpha]);
  }

  if (!defined(red, green, blue) && defined(hue, saturation, lightness)) {
    return appendRGB([hue, saturation, lightness, alpha]);
  }

  if (defined(red, green, blue) && defined(hue, saturation, lightness)) {
    return [red, green, blue, hue, saturation, lightness, alpha];
  }

  return [];
}

module.exports = parseColor;
