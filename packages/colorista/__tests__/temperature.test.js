const Color = require('../../color/lib/color');
const { cooler, warmer } = require('../src/temperature');

test('cooler function should return new color', () => {
  const originalColor = new Color('#bbb');
  const coolerColor = cooler(originalColor, 0.2);

  expect(coolerColor).toBeInstanceOf(Color);
  expect(coolerColor.blue > coolerColor.red).toBe(true);
  expect(originalColor.toHexString() !== coolerColor.toHexString()).toBe(true);
});

test('warmer function should return new color', () => {
  const originalColor = new Color('#bbb');
  const warmerColor = warmer(originalColor, 0.2);

  expect(warmerColor).toBeInstanceOf(Color);
  expect(warmerColor.red > warmerColor.blue).toBe(true);
  expect(originalColor.toHexString() !== warmerColor.toHexString()).toBe(true);
});
