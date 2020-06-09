export declare interface MathX {
  approx(a: number, b: number, delta?: number): boolean;
  getPrecision(number: number): number;
  modulo(a: number, b: number): number;
  random(range?: number[], precision?: number): number;
  round(num: number, precision?: number): number;
  toNumber(num: string | number, precision?: number): number;
}