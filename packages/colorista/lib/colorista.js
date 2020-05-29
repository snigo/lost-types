const { contrast, findByContrast } = require('./contrast');
const {
  getHueByOffset,
  getTone,
  hueShift,
  invert,
  offsetHue,
  opposite,
} = require('./hue');
const mix = require('./mix');
const {
  randomRgbColor,
  randomHslColor,
  randomByContrast,
} = require('./random');
const { warmer, cooler } = require('./temperature');

module.exports = {
  contrast,
  cooler,
  getHueByOffset,
  getTone,
  findByContrast,
  hueShift,
  invert,
  mix,
  offsetHue,
  opposite,
  randomByContrast,
  randomHslColor,
  randomRgbColor,
  warmer,
};
