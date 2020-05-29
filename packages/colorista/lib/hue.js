const Color = require('../../color/lib/color');
const { modulo } = require('../../mathx/lib/mathx');


/**
 * Gets tone of the color
 *
 * @param {Color} color Color to calculate tone from
 */
function getTone(color) {
  const _color = !(color instanceof Color) ? new Color(color) : color;
  if (_color.lightness === 0.5) return _color;

  const tone = {
    hue: _color.hue,
    saturation: _color.saturation,
    lightness: 0.5,
  };

  return new Color(tone);
}


/**
 * Inverts color
 *
 * @param {Color} color Color to be inverted
 */
function invert(color) {
  const {
    red,
    green,
    blue,
    alpha,
  } = !(color instanceof Color) ? new Color(color) : color;

  return new Color([
    255 - red,
    255 - green,
    255 - blue,
    alpha,
  ]);
}


/**
 * Shifts hue with provided angle. Returns new color with shifted hue
 *
 * @param {Color} color Color to be hue shifted
 * @param {number} angle Angle hue will be shifted with
 */
function hueShift(color, angle) {
  const _color = !(color instanceof Color) ? new Color(color) : color;
  if (modulo(angle, 360) === 0) return _color;

  const shifted = {
    hue: modulo(_color.hue + angle, 360),
    saturation: _color.saturation,
    lightness: _color.lightness,
    alpha: _color.alpha,
  };

  return new Color(shifted);
}


/**
 * Return opposite color on the color wheel
 *
 * @param {Color} color Original color opposite color to be calculated from
 */
function opposite(color) {
  return hueShift(color, 180);
}


/**
 * Gets hue value by provided hue group and hue group offset
 *
 * @param {number} hueGroup Color hue group, number in [0...11] range
 * @param {number} hueGroupOffset Hue group offset, number in [0...29] range
 */
function getHueByOffset(hueGroup, hueGroupOffset = 0) {
  if (!arguments.length) return undefined;

  return modulo(hueGroup * 30 - 45 + hueGroupOffset, 360);
}


/**
 * Returns new color within the same hue group but with the new hue group offset
 *
 * @param {Color} color Original color new color to be calculated from
 * @param {number} offsetValue Hue group offset, number in [0...29] range
 */
function offsetHue(color, offsetValue) {
  const _color = !(color instanceof Color) ? new Color(color) : color;
  if (_color.hueGroupOffset === offsetValue) return _color;

  const offsetColor = {
    hue: getHueByOffset(_color.hueGroup, offsetValue),
    saturation: _color.saturation,
    lightness: _color.lightness,
    alpha: _color.alpha,
  };

  return new Color(offsetColor);
}

module.exports = {
  getHueByOffset,
  getTone,
  hueShift,
  invert,
  offsetHue,
  opposite,
};
