const {
  defined,
  assumeAlphaValue,
  assumeHueValue,
  assumePersentageValue,
  assumeRgbValue,
} = require('./utils');
const { parseRgbaArray, _parseHslaArray } = require('./array');

function parseColorObject(color) {
  if (typeof color !== 'object') return [];

  if (defined(color.red, color.green, color.blue, color.hue, color.saturation, color.lightness)) {
    const output = [
      assumeRgbValue(color.red),
      assumeRgbValue(color.green),
      assumeRgbValue(color.blue),
      assumeHueValue(color.hue),
      assumePersentageValue(color.saturation),
      assumePersentageValue(color.lightness),
      assumeAlphaValue(color.alpha),
    ];
    return output.some((v) => Number.isNaN(v)) ? [] : output;
  }

  if (defined(color.red, color.green, color.blue)) {
    return parseRgbaArray([
      color.red,
      color.green,
      color.blue,
      color.alpha,
    ]);
  }

  if (defined(color.hue, color.saturation, color.lightness)) {
    return _parseHslaArray([
      color.hue,
      color.saturation,
      color.lightness,
      color.alpha,
    ]);
  }

  return [];
}

module.exports = parseColorObject;
