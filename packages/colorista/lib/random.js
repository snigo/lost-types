const Color = require('../../color/lib/color');
const { random } = require('../../mathx/lib/mathx');
const { findByContrast } = require('./contrast');


/**
 * Generates random color with provided red, green and blue ranges
 *
 * @param {number[] | number} redRange Red range, if number provided - it's used as fixed value
 * @param {number[] | number} greenRange Green range, if number provided - it's used as fixed value
 * @param {number[] | number} blueRange Blue range, if number provided - it's used as fixed value
 */
function randomRgbColor(redRange = [0, 255], greenRange = [0, 255], blueRange = [0, 255]) {
  const red = Array.isArray(redRange) ? random(redRange, 0) : redRange;
  const green = Array.isArray(greenRange) ? random(greenRange, 0) : greenRange;
  const blue = Array.isArray(blueRange) ? random(blueRange, 0) : blueRange;

  return new Color([red, green, blue]);
}


/**
 * Generates random color with provided hue, saturation and lightness ranges
 * @param {number[] | number} hueRange
 * Hue range, if number provided - it's used as fixed value
 *
 * @param {number[] | number} saturationRange
 * Saturation range, if number provided - it's used as fixed value
 *
 * @param {number[] | number} lightnessRange
 * Lightness range, if number provided - it's used as fixed value
 */
function randomHslColor(hueRange = [0, 359], saturationRange = [0, 1], lightnessRange = [0, 1]) {
  const hue = Array.isArray(hueRange)
    ? random(hueRange, 0)
    : +hueRange;

  const saturation = Array.isArray(saturationRange)
    ? random(saturationRange, 2)
    : +saturationRange;

  const lightness = Array.isArray(lightnessRange)
    ? random(lightnessRange, 2)
    : +lightnessRange;

  return new Color({ hue, saturation, lightness });
}


/**
 * Generates random color with target contrast to the provided base color
 * and with saturation within given range
 *
 * @param {number} targetContrast Target contrast to be aimed to
 * @param {Color} base Base color the target contrast to be check on
 * @param {number[] | number} saturationRange
 * Saturation range, if number provided - it's used as fixed value
 */
function randomByContrast(targetContrast = 4.5, base = [255, 255, 255], saturationRange = [0, 1]) {
  const hue = random([0, 359], 0);
  const saturation = Array.isArray(saturationRange)
    ? random(saturationRange, 2)
    : +saturationRange;

  return findByContrast(hue, saturation, base, targetContrast);
}

module.exports = {
  randomRgbColor,
  randomHslColor,
  randomByContrast,
};
