const mix = require('../lib/mix');

test('mix function should mix colors', () => {
  expect(mix('rgb(128, 128, 128)', 'blue', 0.5).toHexString()).toBe('#4040c0');
  expect(mix('rgba(255,255,0,.35)', 'green').toRgbString()).toBe('rgb(89, 172, 0)');
  expect(mix([128, 128, 128, 0.25], 'blue', 2).toHexString()).toBe('#4040c0');
});
