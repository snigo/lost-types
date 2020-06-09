export declare class Range {
  constructor(rangeStart: number, rangeEnd: number, step?: number);
  static from(iterableNumbers: any): Range;
  get length(): number;
  get max(): number;
  get min(): number;
  get center(): number;
  forEach(fn: Function, step?: number): void;
  forEachReverse(fn: Function, step?: number): void;
  has(number: number): boolean;
  clamp(number: number): number;
  toArray(): number[];
  getFraction(number: number, precision?: number): number;
  fromFraction(number: number, precision?: number): number;
  slice(parts: number): number[];
  mod(number: number): number;
}
