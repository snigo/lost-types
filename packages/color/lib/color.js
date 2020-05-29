const { round, modulo } = require('../../mathx/lib/mathx');

const parseColor = require('./parse-color');
const { decByteToHex } = require('./utils');
const namedColors = require('./named-colors');


/**
 * @fileoverview Lightweight color class that would keep both RGB and HSL values
 * to avoid possible double conversions or unnecessary calculations
 *
 *
 * @class Color
 */
class Color {
  /**
   * @param {string} color Color in any acceptable by browsers format:
   * hex, RGB, HSL or named color, as well as RGBA array and Color object
   */
  constructor(color) {
    if (color === undefined) throw Error('Cannot invoke constructor without argument.');
    if (color instanceof Color) {
      Object.assign(this, color);
      return undefined;
    }

    const parsedColor = parseColor(color);
    if (!parsedColor.length) throw Error('Cannot recognize color');

    const [
      red,
      green,
      blue,
      hue,
      saturation,
      lightness,
      alpha,
    ] = parsedColor;

    Object.defineProperties(this, {
      red: {
        value: red,
      },
      green: {
        value: green,
      },
      blue: {
        value: blue,
      },
      hue: {
        value: hue,
      },
      saturation: {
        value: saturation,
      },
      lightness: {
        value: lightness,
      },
      alpha: {
        value: alpha,
      },
    });
  }

  static get name() {
    return 'Color';
  }

  get luminance() {
    const [R, G, B] = [this.red, this.green, this.blue]
      .map((value) => {
        const rsV = value / 255;
        return rsV <= 0.03928 ? rsV / 12.92 : ((rsV + 0.055) / 1.055) ** 2.4;
      });

    return round(0.2126 * R + 0.7152 * G + 0.0722 * B, 4);
  }

  get hueGroup() {
    return modulo(Math.floor(((this.hue + 15) % 360) / 30) + 1, 11);
  }

  get hueGroupOffset() {
    return modulo((this.hue % 30) + 15, 30);
  }

  get name() {
    return namedColors.get(this.toHexString().substring(0, 7));
  }

  /**
   * @method toRgbString returns color value in rgb[a] function notation
   */
  toRgbString() {
    return this.alpha < 1
      ? `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
      : `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  /**
   * @method toHexString returns color value in #-hexadecimal notation
   */
  toHexString() {
    return `#${decByteToHex(this.red)}${decByteToHex(this.green)}${decByteToHex(this.blue)}${this.alpha < 1 ? decByteToHex(Math.round(255 * this.alpha)) : ''}`;
  }

  /**
   * @method toHslString returns color value in hsl[a] function notation
   */
  toHslString() {
    return this.alpha < 1
      ? `hsla(${this.hue}, ${round(this.saturation * 100, 0)}%, ${round(this.lightness * 100, 0)}%, ${this.alpha})`
      : `hsl(${this.hue}, ${round(this.saturation * 100, 0)}%, ${round(this.lightness * 100, 0)}%)`;
  }
}

module.exports = Color;
