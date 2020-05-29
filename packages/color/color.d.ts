interface ColorObject {
  red?: number | string;
  green?: number | string;
  blue?: number | string;
  hue?: number | string;
  saturation?: number | string;
  lightness?: number | string;
  alpha?: number | string;
}

declare class Color {
  red: number;
  green: number;
  blue: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  constructor(color: string | number[] | ColorObject | Color);
  get name(): string;
  get luminance(): number;
  get hueGroup(): number;
  get hueGroupOffset(): number;
  toRgbString(): string;
  toHexString(): string;
  toHslString(): string;
}