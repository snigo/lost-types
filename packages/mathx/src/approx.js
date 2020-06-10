import getPrecision from './get-precision';

/**
 * @function approx Checks if the first argument approximately equals
 * to the second argument within delta
 *
 * @param {number} a Number to be checked
 * @param {number} b Number to be checked
 * @param {number} delta Acceptable difference between a and b
 *
 * @returns {boolean} True or False
 */
function approx(a, b, delta = 0) {
  const precision = Math.max(getPrecision(a), getPrecision(b), getPrecision(delta));

  return +Math.abs(a - b).toFixed(precision) <= delta;
}

export default approx;
