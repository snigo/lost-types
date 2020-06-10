import round from './round';

/**
 * @function random Generates random number within range with certain precision
 *
 * @param {number[]} range Array of min and max values of the range
 * @param {number} precision Precision, the generated number to be rounded to
 */
function random(range = [0, 1], precision = 12) {
  const [min, max] = range;
  return round(min + Math.random() * (max - min), precision);
}

export default random;
