const {
  appendHSL,
  appendRGB,
  assumeAlphaValue,
  assumeHueValue,
  assumePersentageValue,
  assumeRgbValue,
  defined,
  extractGroups,
} = require('../src/utils');

test('appendHSL function should append HSL values to the RGBA array', () => {
  expect(appendHSL([0, 191, 255, 1])).toEqual([0, 191, 255, 195, 1, 0.5, 1]);
  expect(appendHSL([23, 80, 42, 0.45])).toEqual([23, 80, 42, 140, 0.55, 0.2, 0.45]);
  expect(appendHSL([0, 255, 0, 0])).toEqual([0, 255, 0, 120, 1, 0.5, 0]);
});

test('appendRGB function should append RGB values to the HSLA array', () => {
  expect(appendRGB([330, 0.8, 0.55, 1])).toEqual([232, 48, 140, 330, 0.8, 0.55, 1]);
  expect(appendRGB([0, 0, 0.95, 0.45])).toEqual([242, 242, 242, 0, 0, 0.95, 0.45]);
  expect(appendRGB([34, 1, 1, 1])).toEqual([255, 255, 255, 34, 1, 1, 1]);
});

test('assumeAlphaValue function should convert alpha value to corresponding numeric', () => {
  expect(assumeAlphaValue('40%')).toBe(0.4);
  expect(assumeAlphaValue('3.145317%')).toBe(0.0315);
  expect(assumeAlphaValue('0.361')).toBe(0.361);
  expect(assumeAlphaValue('.45')).toBe(0.45);
  expect(assumeAlphaValue('-.25')).toBe(0);
  expect(assumeAlphaValue('34e-2')).toBe(0.34);
  expect(assumeAlphaValue(0.42)).toBe(0.42);
  expect(assumeAlphaValue(4.2)).toBe(1);
});

test('assumePersentageValue function should convert persentage value to corresponding numeric', () => {
  expect(assumePersentageValue('40%')).toBe(0.4);
  expect(assumePersentageValue('3.145317%')).toBe(0.03);
  expect(assumePersentageValue('0.361')).toBe(NaN);
  expect(assumePersentageValue('.45')).toBe(NaN);
  expect(assumePersentageValue('3.4e1%')).toBe(0.34);
  expect(assumePersentageValue(0.42)).toBe(0.42);
  expect(assumePersentageValue(4.2)).toBe(1);
});

test('assumeHueValue function should convert CSS approved angle units to numeric degrees', () => {
  expect(assumeHueValue('240deg')).toBe(240);
  expect(assumeHueValue('360')).toBe(0);
  expect(assumeHueValue('361deg')).toBe(1);
  expect(assumeHueValue('.45turn')).toBe(162);
  expect(assumeHueValue('-.25turn')).toBe(270);
  expect(assumeHueValue('.25turns')).toBe(NaN);
  expect(assumeHueValue('200grad')).toBe(180);
  expect(assumeHueValue('0.25grad')).toBe(0);
  expect(assumeHueValue('0.25rad')).toBe(14);
  expect(assumeHueValue('.25RAD')).toBe(14);
  expect(assumeHueValue('3.14rad')).toBe(180);
  expect(assumeHueValue('-3.14rad')).toBe(180);
  expect(assumeHueValue(90)).toBe(90);
});

test('assumeRgbValue function should convert Rgb value to corresponding numeric', () => {
  expect(assumeRgbValue('40%')).toBe(102);
  expect(assumeRgbValue('3.1457%')).toBe(8);
  expect(assumeRgbValue('361')).toBe(255);
  expect(assumeRgbValue('-.45')).toBe(0);
  expect(assumeRgbValue('3.4e1')).toBe(34);
  expect(assumeRgbValue(42)).toBe(42);
  expect(assumeRgbValue(4.2)).toBe(4);
});

test('defined function should indicate whether all arguments are defined - not Nil and not NaN', () => {
  expect(defined(0, '', false)).toBe(true);
  expect(defined(255, {}, [])).toBe(true);
  expect(defined(255, NaN, 255)).toBe(false);
  expect(defined(undefined)).toBe(false);
  expect(defined(null)).toBe(false);
});

test('extractGroups function extracts groups with provided string and regex pattern', () => {
  const str = 'Can you extract me?';
  const re = /^.+(ex\w+)\s(.+)\?$/;
  expect(extractGroups(str, re)).toEqual(['extract', 'me']);
  expect(extractGroups('Hello World', re)).toEqual([]);
});
