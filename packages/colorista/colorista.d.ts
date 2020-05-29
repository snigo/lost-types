import { Color, AnyColor } from '../color/color';

declare interface Colorista {
  contrast(color: AnyColor, base: AnyColor): number;
  cooler(color: AnyColor, intensity?: number, filter?: AnyColor): Color;
  getHueByOffset(hueGroup: number, hueGroupOffset?: number): number;
  getTone(color: AnyColor): Color;
  findByContrast(hue: number, saturation: number, baseColor: AnyColor, targetContrast: number): Color;
  hueShift(color: AnyColor, angle: number): Color;
  invert(color: AnyColor): Color;
  mix(color: AnyColor, base: AnyColor, alpha?: number): Color;
  offsetHue(color: AnyColor, offsetValue: number): Color;
  opposite(color: AnyColor): Color;
  randomByContrast(targetContrast?: number, base?: AnyColor, saturationRange?: number[] | number): Color;
  randomHslColor(hueRange?: number[] | number, saturationRange?: number[] | number, lightnessRange?: number[] | number): Color;
  randomRgbColor(redRange?: number[] | number, greenRange?: number[] | number, blueRange?: number[] | number): Color;
  warmer(color: AnyColor, intensity?: number, filter?: AnyColor): Color;
}