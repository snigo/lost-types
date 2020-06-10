/**
 * @function modulo Calculates modulo in the correct way including negative numbers
 * Fixes so called JavaScript modulo bug:
 * https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
 *
 * @param {number} a Left operand
 * @param {number} b Right operand
 *
 * @returns {number} Modulo of a mod b
 */
function modulo(a, b) {
  return ((+a % +b) + +b) % +b;
}

export default modulo;
