import Range from '@lost-types/range/src/range';
import { toNumber, round } from '@lost-types/mathx/src/mathx';

export const rgbRange = new Range(255);
export const hueRange = new Range(359);
export const oneRange = new Range(1);

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
export function appendHSL([red, green, blue, alpha]) {
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

  lightness = oneRange.clamp(round(lightness, 2));
  saturation = oneRange.clamp(round(saturation, 2));


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
export function appendRGB([hue, saturation, lightness, alpha]) {
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

export function assumeAlphaValue(value) {
  if (value == null) return 1;
  return oneRange.clamp(toNumber(value, 4));
}


export function assumeHueValue(value) {
  if (typeof value === 'number') return hueRange.mod(round(value, 0));
  if (typeof value !== 'string') return NaN;
  value = value.trim().toLowerCase();

  const hue = value.match(/^([+\-0-9e.]+)(turn|g?rad|deg)?$/);
  if (!hue) return NaN;
  hue[1] = round(hue[1]);
  hue[2] = hue[2] || 'deg';
  switch (hue[2]) {
    case 'turn':
      return round(hueRange.mod(parseFloat(hue[1]) * 360), 0);

    case 'rad':
      return round(hueRange.mod(parseFloat(hue[1]) * (180 / Math.PI)), 0);

    case 'grad':
      return round(hueRange.mod(parseFloat(hue[1]) * 0.9), 0);

    case 'deg':
      return round(hueRange.mod(parseFloat(hue[1])), 0);
    default:
      return NaN;
  }
}


export function assumePersentageValue(value) {
  if (typeof value === 'number') return oneRange.clamp(round(value, 2));
  if (!/%$/.test(value)) return NaN;
  return oneRange.clamp(toNumber(value, 2));
}


export function assumeRgbValue(value) {
  if (typeof value === 'number') return rgbRange.clamp(round(value, 0));
  if (typeof value !== 'string') return NaN;
  return rgbRange.clamp(/%$/.test(value) ? rgbRange.fromFraction(toNumber(value), 0) : round(value, 0));
}


export function defined(...args) {
  // eslint-disable-next-line eqeqeq
  return args.every((arg) => arg || (!arg && arg == 0));
}


export function extractGroups(str, re) {
  return (re.exec(str) || []).filter((value, index) => index && !!value);
}
