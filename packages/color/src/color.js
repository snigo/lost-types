import { round, modulo } from '@lost-types/mathx';

import parseColor from './parse';
import { decByteToHex } from './hex';
import { getColorName } from './named';


class Color {
  constructor(color) {
    const parsedColor = parseColor(color);
    if (!parsedColor.length) throw Error('Cannot recognize color');

    Object.defineProperties(this, {
      red: {
        value: parsedColor[0],
      },
      green: {
        value: parsedColor[1],
      },
      blue: {
        value: parsedColor[2],
      },
      hue: {
        value: parsedColor[3],
      },
      saturation: {
        value: parsedColor[4],
      },
      lightness: {
        value: parsedColor[5],
      },
      alpha: {
        value: parsedColor[6],
      },
    });
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
    const name = getColorName(this.toHexString().substring(0, 7));
    return this.alpha === 1 ? name : `${name}*`;
  }

  /**
   * Returns color value in rgb[a] function notation
   */
  toRgbString() {
    return this.alpha < 1
      ? `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
      : `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  /**
   * Returns color value in #-hexadecimal notation
   */
  toHexString() {
    return `#${decByteToHex(this.red)}${decByteToHex(this.green)}${decByteToHex(this.blue)}${this.alpha < 1 ? decByteToHex(Math.round(255 * this.alpha)) : ''}`;
  }

  /**
   * Returns color value in hsl[a] function notation
   */
  toHslString() {
    return this.alpha < 1
      ? `hsla(${this.hue}, ${round(this.saturation * 100, 0)}%, ${round(this.lightness * 100, 0)}%, ${this.alpha})`
      : `hsl(${this.hue}, ${round(this.saturation * 100, 0)}%, ${round(this.lightness * 100, 0)}%)`;
  }
}

export default Color;
