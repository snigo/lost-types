import Color from '@lost-types/color';
import Range from '@lost-types/range';
import { round } from '@lost-types/mathx';

const alphaRange = new Range(1);


/**
 * Mixes two colors with optional alpha value
 *
 * @param {Color} color Color to be mixed
 * @param {Color} base Color to be mixed
 * @param {number} alpha Optional alpha value for the color, number in [0...1] range
 */
function mix(color, base, alpha = 1) {
  if (!arguments.length) return undefined;
  if (!base) return new Color(color);
  if (!color) return new Color(base);

  const _color = !(color instanceof Color) ? new Color(color) : color;
  const _base = !(base instanceof Color) ? new Color(base) : base;

  const factor = alphaRange.clamp(round(_color.alpha * alpha, 4));

  const R = round(_base.red + factor * (_color.red - _base.red), 0);
  const G = round(_base.green + factor * (_color.green - _base.green), 0);
  const B = round(_base.blue + factor * (_color.blue - _base.blue), 0);

  return new Color([R, G, B]);
}

export default mix;
