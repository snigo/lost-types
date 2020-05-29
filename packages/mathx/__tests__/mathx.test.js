const MathX = require('../lib/mathx');

test('MathX should be an object with methods', () => {
  expect(typeof MathX).toBe('object');
  expect(typeof MathX.approx).toBe('function');
  expect(typeof MathX.getPrecision).toBe('function');
  expect(typeof MathX.modulo).toBe('function');
  expect(typeof MathX.random).toBe('function');
  expect(typeof MathX.round).toBe('function');
  expect(typeof MathX.toNumber).toBe('function');
});
