import Color from '@lost-types/color';
import { approx, round } from '@lost-types/mathx';

import mix from './mix';


/**
 * Calculates contrast value between color and base
 *
 * @param {Color} color Color to be checked
 * @param {Color} base Color to be checked
 */
export function contrast(color, base) {
  if (!arguments.length) return undefined;
  if (!color || !base) return 1;

  let _color = !(color instanceof Color) ? new Color(color) : color;
  const _base = !(base instanceof Color) ? new Color(base) : base;

  if (_color.alpha < 1) _color = mix(_color, _base);

  const dark = Math.min(_color.luminance, _base.luminance);
  const light = Math.max(_color.luminance, _base.luminance);

  return round((light + 0.05) / (dark + 0.05), 2);
}


/**
 * Finds color with given hue and saturation with provided contrast ratio
 * relative to given base color
 *
 * @param {number} hue Hue of the target color
 * @param {number} saturation Saturation of the target color in [0...100] range
 * @param {Color} base Base color to compare the contrast
 * @param {number} targetContrast Target contrast
 */
export function findByContrast(hue, saturation, baseColor, targetContrast) {
  const base = !(baseColor instanceof Color) ? new Color(baseColor) : baseColor;

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
    currentContrast = contrast(color, base);

    if (approx(currentContrast, targetContrast, CONTRAST_DELTA)) return color;

    if (
      (currentContrast > targetContrast && color.luminance > base.luminance)
      || (currentContrast < targetContrast && color.luminance < base.luminance)
    ) {
      maxL = (maxL + minL) / 2;
    } else {
      minL = (maxL + minL) / 2;
    }

    iterationCount += 1;
  }

  return color;
}
