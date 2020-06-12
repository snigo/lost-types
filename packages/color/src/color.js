import { round, modulo, approx } from '@lost-types/mathx/src/mathx';

import parseColor from './parse';
import { decByteToHex } from './hex';
import { getColorName } from './named';
import { oneRange } from './utils';
import { applyMatrix, RGB_XYZ_MATRIX, XYZ_RGB_MATRIX } from './matrix';


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

  static get D50() {
    return [0.96422, 1, 0.82521];
  }

  static get D65() {
    return [0.9505, 1, 1.089];
  }

  static transferGamma(linrgb) {
    if (!Array.isArray(linrgb)) return undefined;
    return linrgb.map((V) => V > 0.0031308 ? V ** (1 / 2.4) * 1.055 - 0.055 : 12.92 * V);
  }

  static xyz(xyz) {
    if (!Array.isArray(xyz)) return undefined;
    const alpha = xyz[3] || 1;
    const linRgb = applyMatrix(xyz.slice(0, 3), XYZ_RGB_MATRIX);
    return new Color(Color.transferGamma(linRgb).concat(alpha));
  }

  static lab(lab, whitePoint = Color.D50) {
    if (!Array.isArray(lab)) return undefined;
    const alpha = lab[3] || 1;
    const e = 0.008856;
    const k = 903.3;
    const fy = (lab[0] + 16) / 116;
    const fx = lab[1] / 500 + fy;
    const fz = fy - lab[2] / 200;
    const xyz = [
      fx ** 3 > e ? fx ** 3 : (116 * fx - 16) / k,
      lab[0] > k * e ? ((lab[0] + 16) / 116) ** 3 : lab[0] / k,
      fz ** 3 > e ? fz ** 3 : (116 * fz - 16) / k,
    ].map((V, i) => V * whitePoint[i]);

    return Color.xyz(xyz.concat(alpha));
  }

  static lch(lch) {
    if (!Array.isArray(lch)) return undefined;
    return Color.lab([
      lch[0],
      lch[1] * Math.cos((lch[2] * Math.PI) / 180),
      lch[1] * Math.sin((lch[2] * Math.PI) / 180),
      lch[3] || 1,
    ]);
  }

  get luminance() {
    return this.toXyz()[1];
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
      ? `rgb(${this.red} ${this.green} ${this.blue} / ${this.alpha})`
      : `rgb(${this.red} ${this.green} ${this.blue})`;
  }

  toHexString() {
    return `#${decByteToHex(this.red)}${decByteToHex(this.green)}${decByteToHex(this.blue)}${this.alpha < 1 ? decByteToHex(Math.round(255 * this.alpha)) : ''}`;
  }

  toHslString() {
    return this.alpha < 1
      ? `hsl(${this.hue}deg ${round(this.saturation * 100, 0)}% ${round(this.lightness * 100, 0)}% / ${this.alpha})`
      : `hsl(${this.hue}deg ${round(this.saturation * 100, 0)}% ${round(this.lightness * 100, 0)}%)`;
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
    if (this.alpha === value) return this;
    return new Color({ ...this, alpha: value });
  }

  findByContrast(targetContrast, hue = 0, saturation = 0) {
    const CONTRAST_DELTA = 0.05;
    const MAX_ITERATION_COUNT = 7;

    let minL = 0;
    let maxL = 1;

    let color;
    let currentContrast;
    let iterationCount = 0;

    while (iterationCount <= MAX_ITERATION_COUNT) {
      const _color = new Color({
        hue,
        saturation,
        lightness: round((maxL + minL) / 2, 2),
      });
      const _contrast = this.contrast(_color);
      if (Math.abs(_contrast - targetContrast) < Math.abs(currentContrast - targetContrast)) {
        currentContrast = _contrast;
        color = _color;
      }

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

  grayscaleLab() {
    const L = (this.toLab()[0] / 100) * 255;
    return new Color([L, L, L, this.alpha]);
  }

  toLinearRgb() {
    return [this.red, this.green, this.blue]
      .map((value) => {
        const V = value / 255;
        return round(V < 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4, 7);
      });
  }

  toXyz() {
    return applyMatrix(this.toLinearRgb(), RGB_XYZ_MATRIX).map((v) => round(v, 7));
  }

  toLab(whitePoint = Color.D50) {
    const e = 0.008856;
    const k = 903.3;
    const [fx, fy, fz] = this.toXYZ()
      .map((V, i) => V / whitePoint[i])
      .map((vr) => vr > e ? Math.cbrt(vr) : (k * vr + 16) / 116);

    return [
      116 * fy - 16,
      500 * (fx - fy),
      200 * (fy - fz),
    ].map((v) => round(v, 7));
  }

  toLch() {
    const [L, a, b] = this.toLab();
    return [
      L,
      Math.sqrt(a ** 2 + b ** 2),
      modulo((Math.atan2(b, a) * 180) / Math.PI, 360),
    ].map((v) => round(v, 7));
  }

  toLchString() {
    const [L, C, H] = this.toLch().map((v) => round(v, 3));
    return this.alpha < 1
      ? `lch(${L}% ${C} ${H}deg / ${this.alpha})`
      : `lch(${L}% ${C} ${H}deg)`;
  }

  toLabString() {
    const [L, a, b] = this.toLab().map((v) => round(v, 3));
    return this.alpha < 1
      ? `lab(${L}% ${a} ${b} / ${this.alpha})`
      : `lab(${L}% ${a} ${b})`;
  }

  toRgb() {
    return [this.red, this.green, this.blue, this.alpha];
  }
}

export default Color;
