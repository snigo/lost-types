const parseRgba = require('../src/rgb');

test('parses string in RGBA function comma notation', () => {
  expect(parseRgba('rgb(214, 80, 65)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 1]);
  expect(parseRgba('rgba(214, 80, 65)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 1]);
  expect(parseRgba('rgb(214, 80, 65, 50%)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 0.5]);
  expect(parseRgba('rgba(214, 80, 65, 0.5)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 0.5]);
  expect(parseRgba('rgba(25%, 100%, 45%)')).toEqual([64, 255, 115, 136, 1, 0.63, 1]);
  expect(parseRgba('rgba(34, 100%, 45%)')).toEqual([34, 255, 115, 142, 1, 0.57, 1]);
});

test('parses string in RGBA function whitespace notation', () => {
  expect(parseRgba('rgb(214 80 65)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 1]);
  expect(parseRgba('rgba(214 80 65)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 1]);
  expect(parseRgba('rgb(214 80 65 / 50%)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 0.5]);
  expect(parseRgba('rgba(214 80 65 / 0.5)')).toEqual([214, 80, 65, 6, 0.65, 0.55, 0.5]);
  expect(parseRgba('rgba(25% 100% 45%)')).toEqual([64, 255, 115, 136, 1, 0.63, 1]);
  expect(parseRgba('rgba(34 100% 45%)')).toEqual([34, 255, 115, 142, 1, 0.57, 1]);
});

test('returns empty array if failed to parse', () => {
  expect(parseRgba()).toEqual([]);
  expect(parseRgba('')).toEqual([]);
  expect(parseRgba('rgb()')).toEqual([]);
  expect(parseRgba('rbga(214 80% 65% / 0.5)')).toEqual([]);
  expect(parseRgba('rgba (25 100% 45%)')).toEqual([]);
  expect(parseRgba(42)).toEqual([]);
});

test('ugly typing', () => {
  expect(parseRgba('rgba(     100    ,      100%,45%         )')).toEqual([100, 255, 115, 126, 1, 0.7, 1]);
});
