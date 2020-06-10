const { parseHexColor, decByteToHex } = require('../src/hex');

test('decByteToHex converts integer to hexadecimal number, appending 0 at the start if needed', () => {
  expect(decByteToHex(255)).toBe('ff');
  expect(decByteToHex(0)).toBe('00');
  expect(decByteToHex('155')).toBe('9b');
  expect(decByteToHex('-34')).toBe('00');
  expect(decByteToHex(355)).toBe('ff');
});

test('parseHexColor parses hexadecimal notation color', () => {
  expect(parseHexColor('#f456ad')).toEqual([244, 86, 173, 327, 0.88, 0.65, 1]);
  expect(parseHexColor('#f456ad1f')).toEqual([244, 86, 173, 327, 0.88, 0.65, 0.1216]);
  expect(parseHexColor('#f0f')).toEqual([255, 0, 255, 300, 1, 0.5, 1]);
  expect(parseHexColor('#dead')).toEqual([221, 238, 170, 75, 0.67, 0.8, 0.8667]);
  expect(parseHexColor('ffffff')).toEqual([]);
  expect(parseHexColor('red')).toEqual([]);
  expect(parseHexColor()).toEqual([]);
});
