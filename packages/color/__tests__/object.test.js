const parseColorObject = require('../src/object');

test('parses RGBA Object and otherwise returns empty array', () => {
  expect(parseColorObject({
    blue: 178,
    green: 45,
    red: 12,
  })).toEqual([12, 45, 178, 228, 0.87, 0.37, 1]);

  expect(parseColorObject({
    alpha: '34%',
    blue: '178',
    green: '45%',
    red: '12',
  })).toEqual([12, 115, 178, 203, 0.87, 0.37, 0.34]);

  expect(parseColorObject({
    alpha: '34%',
    blue: '178',
    hue: '180',
    red: '12',
  })).toEqual([]);

  expect(parseColorObject([255, 169, 13])).toEqual([]);
});

test('parses HSLA Object and otherwise returns empty array', () => {
  expect(parseColorObject({
    hue: 178,
    saturation: 0.45,
    lightness: 0.8,
  })).toEqual([181, 227, 225, 178, 0.45, 0.8, 1]);

  expect(parseColorObject({
    alpha: '34%',
    hue: '178',
    saturation: '45%',
    lightness: '80%',
  })).toEqual([181, 227, 225, 178, 0.45, 0.8, 0.34]);

  expect(parseColorObject({
    alpha: 0.5,
    blue: '178',
    hue: '180',
    saturation: '25%',
    lightness: '65%',
  })).toEqual([143, 188, 188, 180, 0.25, 0.65, 0.5]);
});
