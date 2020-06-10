/**
 * @function round Rounds number to a certain precision
 * Negative precision will work as well: round(1234, -2) => 1200
 *
 * @param {number} num Number to be rounded
 * @param {number} precision Precision, the number to be rounded to
 *
 * @returns {number} Rounded number
 */
function round(num, precision = 12) {
  return +(+(num * 10 ** precision).toFixed(0) * 10 ** -precision)
    .toFixed(precision < 0 ? 0 : precision);
}

export default round;
