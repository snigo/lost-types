import round from './round';

/**
 * @function toNumber Converts string or number to a certain precision
 * NOTE! This function will not coerce values to number, so
 * toNumber(false) => NaN
 * toNumber(null) => NaN
 *
 * @param {string | number} num Number to be converted
 * @param {number} precision Precision, the number to be rounded to
 */
function toNumber(num, precision = 12) {
  if (num == null || Array.isArray(num)) return NaN;
  num = num.toString();
  num = /%$/.test(num) ? +num.slice(0, -1) / 100 : +num;
  if (precision !== undefined) {
    num = round(num, precision);
  }

  return num;
}

export default toNumber;
