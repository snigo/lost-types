import {
  appendHSL,
  appendRGB,
  assumeAlphaValue,
  assumeHueValue,
  assumePersentageValue,
  assumeRgbValue,
} from './utils';

export function parseRgbaArray(rgba) {
  if (!Array.isArray(rgba)) return [];
  if (!rgba.length || rgba.length > 4) return [];
  rgba[0] = assumeRgbValue(rgba[0]);
  rgba[1] = assumeRgbValue(rgba[1]);
  rgba[2] = assumeRgbValue(rgba[2]);
  rgba[3] = assumeAlphaValue(rgba[3]);
  if (rgba.some((v) => Number.isNaN(v))) return [];

  return appendHSL(rgba);
}

export function _parseHslaArray(hsla) {
  if (!Array.isArray(hsla)) return [];
  if (!hsla.length || hsla.length > 4) return [];
  hsla[0] = assumeHueValue(hsla[0]);
  hsla[1] = assumePersentageValue(hsla[1]);
  hsla[2] = assumePersentageValue(hsla[2]);
  hsla[3] = assumeAlphaValue(hsla[3]);
  if (hsla.some((v) => Number.isNaN(v))) return [];

  return appendRGB(hsla);
}
