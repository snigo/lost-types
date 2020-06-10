const round = require('../src/round');

test('correctly rounds provided number or string', () => {
  expect(round(0.45876453, 4)).toBe(0.4588);
  expect(round('0.45876453', 4)).toBe(0.4588);
  expect(round(12.45, 1)).toBe(12.5);
  expect(round('1245', -2)).toBe(1200);
  expect(round(45, -1)).toBe(50);
  expect(round('45')).toBe(45);
});
