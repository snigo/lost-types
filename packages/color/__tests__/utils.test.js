const { hexByteToDec, decByteToHex, toDegrees } = require('../lib/utils');

test('hexByteToDec should correctly convert hexidecimal number to integer case insensitive', () => {
  expect(hexByteToDec('ff')).toBe(255);
  expect(hexByteToDec('0F')).toBe(15);
  expect(hexByteToDec('aB')).toBe(171);
});

test('hexByteToDec should repeat number if only one digit provided', () => {
  expect(hexByteToDec('f')).toBe(255);
  expect(hexByteToDec('1')).toBe(17);
  expect(hexByteToDec('0f')).toBe(15);
  expect(hexByteToDec('01')).toBe(1);
});

test('hexByteToDec should return NaN if incorrect hexadecimal value provided', () => {
  expect(hexByteToDec('fg')).toBeNaN();
  expect(hexByteToDec('o1')).toBeNaN();
});

test('hexByteToDec should truncate number to 8-bit number only', () => {
  expect(hexByteToDec('fff')).toBe(255);
  expect(hexByteToDec('ff0')).toBe(255);
});

test('toDegrees function should convert CSS approved angle units to numeric degrees', () => {
  expect(toDegrees('240deg')).toBe(240);
  expect(toDegrees('360')).toBe(0);
  expect(toDegrees('361deg')).toBe(1);
  expect(toDegrees('.45turn')).toBe(162);
  expect(toDegrees('-.25turn')).toBe(270);
  expect(toDegrees('.25turns')).toBe(NaN);
  expect(toDegrees('200grad')).toBe(180);
  expect(toDegrees('0.25grad')).toBe(0);
  expect(toDegrees('0.25rad')).toBe(14);
  expect(toDegrees('.25RAD')).toBe(14);
  expect(toDegrees('3.14rad')).toBe(180);
  expect(toDegrees('-3.14rad')).toBe(180);
  expect(toDegrees(90)).toBe(90);
});

test('decByteToHex function should convert integer to hexadecimal number, appending 0 at the start if needed', () => {
  expect(decByteToHex(255)).toBe('ff');
  expect(decByteToHex(0)).toBe('00');
  expect(decByteToHex('155')).toBe('9b');
});

test('result of decByteToHex function should not exceed 8-bit range from 00 to ff', () => {
  expect(decByteToHex(256)).toBe('ff');
  expect(decByteToHex(-100)).toBe('00');
});
