import { getPrecision, modulo } from '@lost-types/mathx/src/mathx';

import { checkLength, normalizeStep } from './helpers';

class Range {
  /**
   * If only one argument provided the output will be
   * [0 ... number] range
   *
   * @param {number} rangeStart Number the range will start with
   * @param {number} rangeEnd Number the range will end on, including this number
   * @param {number} step Step size, default to 1
   */
  constructor(rangeStart, rangeEnd, step = 1) {
    const from = arguments.length > 1 ? +rangeStart : 0;
    const to = arguments.length > 1 ? +rangeEnd : +rangeStart;
    if (Number.isNaN(from) || Number.isNaN(to) || !arguments.length) return undefined;
    step = normalizeStep(step);
    Object.defineProperties(this, {
      from: {
        value: from,
      },
      to: {
        value: to,
      },
      step: {
        value: step,
      },
    });
  }


  /**
   * Standard iterator using JS built-in Symbol.iterator
   * Creates default iteration behavior and ability of using
   * Range instances with for...of loops or spread operators:
   * range = new Range(3);
   * [...range]; // [0, 1, 2, 3]
   *
   * It will try to account for presicion errors
   */
  * [Symbol.iterator]() {
    checkLength.call(this);

    const isAsc = this.from <= this.to;
    const precision = Math.max(
      getPrecision(this.step),
      getPrecision(this.from),
      getPrecision(this.to),
    );
    for (
      let i = this.from;
      isAsc ? i <= this.to : i >= this.to;
      i = +((isAsc ? i + this.step : i - this.step).toFixed(precision))
    ) {
      yield i;
    }
  }


  /**
   * @static
   *
   * Creates range from any array-like (iterable) structure holding numbers:
   * const arr = [7, 6, 5, 42, 16, 9];
   * Range.from(arr); // Range {5 ... 42}
   *
   * @param {any} iterableNumbers Any iterable structure holding numbers
   */
  static from(iterableNumbers) {
    if (iterableNumbers == null) return new Range();
    if (typeof iterableNumbers[Symbol.iterator] !== 'function') return new Range();
    if (iterableNumbers.length !== undefined && !iterableNumbers.length) return new Range();
    if (iterableNumbers.size !== undefined && !iterableNumbers.size) return new Range();

    const min = Math.min(...iterableNumbers);
    const max = Math.max(...iterableNumbers);

    return new Range(min, max);
  }


  /**
   * Executes provided function on every element of the range
   * with provided step. If no step provided initial this.step will be used
   * Similarly to forEach in Array, following arguments will be passed to callback:
   * - currentValue
   * - index
   * - range
   * Will try to account for precision errors between numbers in the range
   *
   * @param {function} fn Function to be executed on every number in the range
   * @param {number} step Optional step, if different from initial range step
   */
  forEach(fn, step = this.step) {
    checkLength.call(this);
    step = normalizeStep(step);

    const isAsc = this.from <= this.to;
    const precision = Math.max(getPrecision(step), getPrecision(this.from), getPrecision(this.to));
    let count = 0;
    for (
      let i = this.from;
      isAsc ? i <= this.to : i >= this.to;
      i = +((isAsc ? i + step : i - step).toFixed(precision))
    ) {
      fn(i, count, this);
      count += 1;
    }

    return undefined;
  }


  /**
   * Similarly to Range.prototype.forEach iterates through every number
   * in the range executing provided function backwards (to -> from)
   *
   * @param {function} fn Function to be executed on every number in the range
   * @param {number} step Optional step, if different from initial range step
   */
  forEachReverse(fn, step = this.step) {
    checkLength.call(this);
    step = normalizeStep(step);

    const isAsc = this.from <= this.to;
    const precision = Math.max(getPrecision(step), getPrecision(this.from), getPrecision(this.to));
    let count = 0;
    for (
      let i = this.to;
      isAsc ? i >= this.from : i <= this.from;
      i = +((isAsc ? i - step : i + step).toFixed(precision))
    ) {
      fn(i, count, this);
      count += 1;
    }

    return undefined;
  }


  /**
   * Returns total number of items in the range.
   * The length of the resulting array when toArray() method invoked
   */
  get length() {
    if (this.to === undefined || this.from === undefined) return 0;
    return Math.round(Math.abs(this.to - this.from) / this.step) + 1;
  }


  /**
   * Returns largest number in the range.
   */
  get max() {
    return this.from <= this.to ? this.to : this.from;
  }


  /**
   * Returns lowest number in the range.
   */
  get min() {
    return this.from <= this.to ? this.from : this.to;
  }


  /**
   * Returns central number in the range:
   * const range = new Range(-100, 100);
   * range.center; // 0
   */
  get center() {
    if (this.to === undefined || this.from === undefined) return undefined;
    return this.min + (this.max - this.min) / 2;
  }


  /**
   * Returns boolean indicating whether number within a range
   *
   * @param {number} number Number to be checked
   */
  has(number) {
    return (+number >= this.min) && (+number <= this.max);
  }


  /**
   * Similarly to _.clamp(), ensures resulting number is in the range:
   * const range = new Range(100);
   * range.clamp(120); // 100
   * range.clamp(-Infinity); // 0
   *
   * @param {number} number Number to be clamped
   */
  clamp(number) {
    if (+number < this.min) return this.min;
    if (+number > this.max) return this.max;
    return +number;
  }


  /**
   * Converts range to array of numbers with initial range step
   */
  toArray() {
    return [...this];
  }


  /**
   * Returns distance of number relative to the range:
   * const range = new Range(-100, 100);
   * range.getFraction(0); // 0.5 (aka 50%)
   * range.getFraction(-150); // -0.25
   * range.getFraction(400); // 2.5
   *
   * @param {number} number Number to be checked
   * @param {number} precision Output precision, defaults to 12
   */
  getFraction(number, precision = 12) {
    if (Number.isNaN(+precision) || +precision < 0) return NaN;
    if (precision > 100) precision = 100;

    return +((+number - this.min) / (this.max - this.min)).toFixed(precision);
  }


  /**
   * Inverse from getFraction, returns number with given precision relative
   * to provided fraction of the range:
   * const range = new Range(-100, 100);
   * range.fromFraction(0); // -100
   * range.fromFraction(.5); // 0
   * range.fromFraction(1); // 100
   *
   * @param {number} number Fraction
   * @param {number} precision Output precision, defaults to 12
   */
  fromFraction(number, precision = 12) {
    return +(this.min + +number * (this.max - this.min)).toFixed(precision);
  }


  /**
   * Slices range into provided number of equal parts.
   * Returns array of numbers representing boundaries of each slice
   * For example, slice circle into 6 parts:
   * const range = new Range(0, 359);
   * range.slice(6); // [0, 60, 120, 180, 240, 300]
   *
   * @param {number} parts Number of parts range ro be sliced to
   */
  slice(parts) {
    if (!parts) return [];

    const step = +((this.max - this.min + this.step) / parts).toFixed(12);
    const output = [];
    this.forEach((number) => output.push(number), step);

    return output;
  }


  /**
   * Returns number in the range, such as number = input mod range:
   * const range = new Range(0, 9);
   * range.mod(0); // 0
   * range.mod(-2); // 8
   * range.mod(23); // 3
   *
   * @param {number} number Number to be checked
   */
  mod(number) {
    return this.min + modulo(+number, this.max - this.min + 1);
  }
}

export default Range;
