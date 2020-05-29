const approx = require('../lib/approx');

test('approx function should approximate value with given delta', () => {
  expect(approx(0.34, 0.45, 0.1)).toBe(false);
  expect(approx(0.34, 0.44, 0.1)).toBe(true);
});

test('approx function should account for precision errors', () => {
  expect(approx(0.3, 0.1, 0.2)).toBe(true);
});

test('approx function should function correctly if strings or mixed types are provided', () => {
  expect(approx('0.3', '0.1', '0.2')).toBe(true);
  expect(approx(0.34, '0.45', 0.1)).toBe(false);
  expect(approx('0.34', 0.44, '0.1')).toBe(true);
});

test('approx function should work correctly if no delta provided, assuming delta = 0', () => {
  expect(approx(35.5, 35.55)).toBe(false);
  expect(approx(36.6, 36.6)).toBe(true);
});
