export interface ColorObject {
  red?: number | string;
  green?: number | string;
  blue?: number | string;
  hue?: number | string;
  saturation?: number | string;
  lightness?: number | string;
  alpha?: number | string;
}

export type AnyColor = string | number[] | ColorObject | Color;

declare class Color {
  red: number;
  green: number;
  blue: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  constructor(color: AnyColor);
  get name(): string;
  get luminance(): number;
  get hueGroup(): number;
  get hueGroupOffset(): number;
  toRgbString(): string;
  toHexString(): string;
  toHslString(): string;
}