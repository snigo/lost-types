const modulo = require('../src/modulo');

test('correct modulo value for positive and negative numbers', () => {
  expect(modulo(11, 3)).toBe(2);
  expect(modulo(-1, 3)).toBe(2);
  expect(modulo(1, -45)).toBe(-44);
});

test('support for string numbers', () => {
  expect(modulo('11', 3)).toBe(2);
  expect(modulo(-1, '3')).toBe(2);
  expect(modulo('1', '-45')).toBe(-44);
});

test('incorrect number format', () => {
  expect(modulo(1, 0)).toBeNaN();
  expect(modulo(1, Infinity)).toBeNaN();
  expect(modulo(1)).toBeNaN();
  expect(modulo()).toBeNaN();
});
