const { parseRgbaArray, _parseHslaArray } = require('../lib/array');

test('parses RGBA Array and otherwise returns empty array', () => {
  expect(parseRgbaArray([1, 2, 3])).toEqual([1, 2, 3, 210, 0.5, 0.01, 1]);
  expect(parseRgbaArray(['255', '25%', '+3e1', '45%'])).toEqual([255, 64, 30, 9, 1, 0.56, 0.45]);
  expect(parseRgbaArray([24.1334, 65.656565, 33.000, '.34'])).toEqual([24, 66, 33, 133, 0.47, 0.18, 0.34]);
  expect(parseRgbaArray([3452345, -2345, Infinity, 1e-50])).toEqual([255, 0, 255, 300, 1, 0.5, 0]);
  expect(parseRgbaArray([0x100, 0o34, 0b1110001])).toEqual([255, 28, 113, 338, 1, 0.55, 1]);
  expect(parseRgbaArray([255, 255])).toEqual([]);
  expect(parseRgbaArray(['255', '255', '2SS'])).toEqual([]);
  expect(parseRgbaArray('#ff0')).toEqual([]);
  expect(parseRgbaArray({})).toEqual([]);
  expect(parseRgbaArray([])).toEqual([]);
  expect(parseRgbaArray()).toEqual([]);
  expect(parseRgbaArray(['255', true, false])).toEqual([]);
});

test('parses HSLA Array and otherwise returns empty array', () => {
  expect(_parseHslaArray([214, 0.8, 0.45])).toEqual([23, 103, 207, 214, 0.8, 0.45, 1]);
  expect(_parseHslaArray(['255e-1grad', '25%', '+3e1%', '45%'])).toEqual([96, 72, 57, 23, 0.25, 0.3, 0.45]);
  expect(_parseHslaArray([24.1334, 0.656565, '33.33333%', '.34'])).toEqual([140, 73, 29, 24, 0.66, 0.33, 0.34]);
  expect(_parseHslaArray(['-3.4turn', '-2345%', Infinity, 1e-50])).toEqual([255, 255, 255, 216, 0, 1, 0]);
  expect(_parseHslaArray([0b100100, 1, 0.5])).toEqual([255, 153, 0, 36, 1, 0.5, 1]);
  expect(_parseHslaArray([165, 0, 0.45])).toEqual([115, 115, 115, 165, 0, 0.45, 1]);
  expect(_parseHslaArray(['0.25turn', 1, 0.45])).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(_parseHslaArray(['100grad', 1, 0.45])).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(_parseHslaArray(['1.57rad', 1, 0.45])).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(_parseHslaArray(['90deg', 1, 0.45])).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(_parseHslaArray([0, 0])).toEqual([]);
  expect(_parseHslaArray(['255', '25', '100'])).toEqual([]);
  expect(_parseHslaArray('#ff0')).toEqual([]);
  expect(_parseHslaArray({})).toEqual([]);
  expect(_parseHslaArray([])).toEqual([]);
  expect(_parseHslaArray()).toEqual([]);
  expect(_parseHslaArray(['25rad', true, false])).toEqual([]);
});
