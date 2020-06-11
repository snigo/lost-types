import { round, modulo, approx } from '@lost-types/mathx/src/mathx';

import parseColor from './parse';
import { decByteToHex } from './hex';
import { getColorName } from './named';
import { oneRange } from './utils';


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
    return this.toXYZ()[1];
  }

  get mode() {
    return +(this.luminance < 0.25);
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

  toRgbString() {
    return this.alpha < 1
      ? `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
      : `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  toHexString() {
    return `#${decByteToHex(this.red)}${decByteToHex(this.green)}${decByteToHex(this.blue)}${this.alpha < 1 ? decByteToHex(Math.round(255 * this.alpha)) : ''}`;
  }

  toHslString() {
    return this.alpha < 1
      ? `hsla(${this.hue}, ${round(this.saturation * 100, 0)}%, ${round(this.lightness * 100, 0)}%, ${this.alpha})`
      : `hsl(${this.hue}, ${round(this.saturation * 100, 0)}%, ${round(this.lightness * 100, 0)}%)`;
  }

  contrast(base) {
    if (!base) return 1;
    const _base = this.mix(base);

    const dark = Math.min(this.luminance, _base.luminance);
    const light = Math.max(this.luminance, _base.luminance);

    return round((light + 0.05) / (dark + 0.05), 2);
  }

  mix(color, alpha = 1) {
    if (!color) return this;
    const _color = !(color instanceof Color) ? new Color(color) : color;
    if (_color.alpha === 1 && alpha === 1) return _color;

    const factor = oneRange.clamp(_color.alpha * alpha);
    const R = this.red + factor * (_color.red - this.red);
    const G = this.green + factor * (_color.green - this.green);
    const B = this.blue + factor * (_color.blue - this.blue);

    return new Color([R, G, B]);
  }

  opacity(value = 1) {
    return new Color({ ...this, alpha: value });
  }

  findByContrast(targetContrast, hue, saturation) {
    const CONTRAST_DELTA = 0.05;
    const MAX_ITERATION_COUNT = 7;

    let minL = 0;
    let maxL = 1;

    let color;
    let currentContrast;
    let iterationCount = 0;

    while (iterationCount <= MAX_ITERATION_COUNT) {
      color = new Color({
        hue,
        saturation,
        lightness: round((maxL + minL) / 2, 2),
      });
      currentContrast = this.contrast(color);

      if (approx(currentContrast, targetContrast, CONTRAST_DELTA)) return color;

      if (
        (currentContrast > targetContrast && color.luminance > this.luminance)
        || (currentContrast < targetContrast && color.luminance < this.luminance)
      ) {
        maxL = (maxL + minL) / 2;
      } else {
        minL = (maxL + minL) / 2;
      }

      iterationCount += 1;
    }

    return color;
  }

  tone() {
    if (this.lightness === 0.5) return this;
    return new Color({ hue: this.hue, saturation: this.saturation, lightness: 0.5 });
  }

  invert() {
    return new Color([
      255 - this.red,
      255 - this.green,
      255 - this.blue,
      this.alpha,
    ]);
  }

  shiftHue(angle = 1) {
    if (modulo(angle, 360) === 0) return this;
    return new Color({
      hue: this.hue + angle,
      saturation: this.saturation,
      lightness: this.lightness,
      alpha: this.alpha,
    });
  }

  opposite() {
    return this.shiftHue(180);
  }

  offsetHue(offsetValue) {
    if (this.hueGroupOffset === offsetValue) return this;
    return new Color({
      hue: modulo(this.hueGroup * 30 - 45 + this.hueGroupOffset, 360),
      saturation: this.saturation,
      lightness: this.lightness,
      alpha: this.alpha,
    });
  }

  warmer(intensity = 0.1, filter = [247, 166, 115]) {
    return this.mix(filter, intensity / 2);
  }

  cooler(intensity = 0.1, filter = [67, 162, 237]) {
    return this.mix(filter, intensity / 2);
  }

  grayscale() {
    if (this.saturation === 0) return this;
    const l = this.luminance > 0.0393
      ? ((this.luminance ** (1 / 2.4)) * 1.055 - 0.055) * 255
      : this.luminance * 3294.6;
    return new Color([l, l, l, this.alpha]);
  }

  toXYZ() {
    const rgbXyzMatrix = [[0.4125, 0.3576, 0.1804], [0.2127, 0.7152, 0.0722], [0.0193, 0.1192, 0.9503]];
    return [this.red, this.green, this.blue]
      .map((value) => {
        const V = value / 255;
        return V <= 0.03928 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4;
      })
      .map((_, i, rgb) => round(rgb.reduce((a, b, j) => a + b * rgbXyzMatrix[i][j]), 4));
  }
}

export default Color;
