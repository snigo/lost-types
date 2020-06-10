const Color = require('../../color/lib/color');
const {
  getHueByOffset,
  getTone,
  hueShift,
  invert,
  offsetHue,
  opposite,
} = require('../src/hue');

test('gets correct hue by group offset', () => {
  expect(getHueByOffset(0, 0)).toBe(315);
  expect(getHueByOffset(11, 29)).toBe(314);
  expect(getHueByOffset(1, 15)).toBe(0);
  expect(getHueByOffset(1, 14)).toBe(359);
});

test('getTone function should get a tone of a color', () => {
  expect(getTone('pink').toHexString()).toBe('#ff002b');
  expect(getTone([255, 255, 255]).toRgbString()).toBe('rgb(128, 128, 128)');
});

test('hueShift function should return color object with shifted hue amount', () => {
  const color = new Color('yellow');

  expect(hueShift(color, 60).hue).toBe(120);
  expect(hueShift(color, -60).toHexString()).toBe('#ff0000');
  expect(hueShift(color, 360).hue).toBe(60);
});

test('invert function should return inverted color object', () => {
  expect(invert('white').toRgbString()).toBe('rgb(0, 0, 0)');
  expect(invert('#f00').toHexString()).toBe('#00ffff');
  expect(invert('rgb(128, 128, 128)').toHslString()).toBe('hsl(0, 0%, 50%)');
});

test('offsetHue returns color with correct hue group offset', () => {
  const offsetRed = offsetHue('red', 2);

  expect(offsetRed).toBeInstanceOf(Color);
  expect(offsetRed.hueGroupOffset).toBe(2);
  expect(offsetRed.hueGroup).toBe(1);
});

test('opposite function should return color with opposite hue', () => {
  expect(opposite('hsl(34, 50%, 28%)').toHslString()).toBe('hsl(214, 50%, 28%)');
  expect(opposite('navy').toRgbString()).toBe('rgb(128, 128, 0)');
});
