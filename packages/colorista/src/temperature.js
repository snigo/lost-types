import Range from '@lost-types/range';
import { round } from '@lost-types/mathx';

import mix from './mix';

const filterRange = new Range(0.5);

const WARM_FILTER = [247, 166, 115];
const COLD_FILTER = [67, 162, 237];


/**
 * Returns warmer version of the provided color with given factor and filter
 *
 * @param {Color} color Color to be modified
 * @param {number} intensity Intensity of the filter, number within [0...1] range
 * @param {Color} filter Filter color
 */
export function warmer(color, intensity = 0.2, filter = WARM_FILTER) {
  const alpha = filterRange.clamp(round(intensity / 10, 2));

  return mix(filter, color, alpha);
}


/**
 * Returns cooler version of the provided color with given factor and filter
 *
 * @param {Color} color Color to be modified
 * @param {number} intensity Intensity of the filter, number within [0...1] range
 * @param {Color} filter Filter color
 */
export function cooler(color, intensity = 0.2, filter = COLD_FILTER) {
  const alpha = filterRange.clamp(round(intensity / 10, 2));

  return mix(filter, color, alpha);
}
