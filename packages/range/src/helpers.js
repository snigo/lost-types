/**
 * Determines if Range is iterable and throws error if not
 */
export function checkLength() {
  const MAX_ARRAY_SIZE = 4294967295;
  if (this.length > MAX_ARRAY_SIZE) {
    throw RangeError('Cannot iterate infinite size range');
  }
}

/**
 * Verifies step argument
 * @param {number} step Step value
 */
export function normalizeStep(step = 1) {
  step = +step;
  if (Number.isNaN(step)) step = 1;
  if (step <= 0) throw TypeError('Step cannot be 0 or negative number');

  return step;
}
