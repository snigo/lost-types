/**
 * @function getPrecision Calculates precision of number
 *
 * @param {number} number Number to be checked
 *
 * @returns {number} Precision of the number
 */
function getPrecision(number) {
  number = +number;
  if (Number.isNaN(number)) return NaN;

  number = number.toString();
  const sciRe = /^[+-]?\d+(?:\.(\d+))?e([+-]?\d+)$/;
  const numRe = /^[+-]?\d+(?:\.(\d+))?$/;
  const zerosRe = /^[+-]?\d+?(0+)$/;

  if (zerosRe.test(number)) {
    const group = number.match(zerosRe)[1];
    return group ? -group.length : 0;
  }

  if (numRe.test(number)) {
    const group = number.match(numRe)[1];
    return group ? group.length : 0;
  }

  if (sciRe.test(number)) {
    const [, numGroup = '', expGroup = 0] = number.match(sciRe);
    return numGroup.length - expGroup;
  }

  return 0;
}

export default getPrecision;
