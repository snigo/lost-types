const parseHsla = require('../src/hsl');

test('parses string in HSLA function comma notation', () => {
  expect(parseHsla('hsl(214, 80%, 65%)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 1]);
  expect(parseHsla('hsla(214, 80%, 65%)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 1]);
  expect(parseHsla('hsl(214, 80%, 65%, 50%)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 0.5]);
  expect(parseHsla('hsla(214, 80%, 65%, 0.5)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 0.5]);
  expect(parseHsla('hsla(0.25turn, 100%, 45%)')).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(parseHsla('hsla(100grad, 100%, 45%)')).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(parseHsla('hsla(1.57rad, 100%, 45%)')).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
  expect(parseHsla('hsla(90deg, 100%, 45%)')).toEqual([115, 230, 0, 90, 1, 0.45, 1]);
});

test('parses string in HSLA function whitespace notation', () => {
  expect(parseHsla('hsl(214 80% 65%)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 1]);
  expect(parseHsla('hsla(214 80% 65%)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 1]);
  expect(parseHsla('hsl(214 80% 65% / 50%)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 0.5]);
  expect(parseHsla('hsla(214 80% 65% / 0.5)')).toEqual([94, 156, 237, 214, 0.8, 0.65, 0.5]);
  expect(parseHsla('hsla(-0.25turn 100% 45%)')).toEqual([115, 0, 230, 270, 1, 0.45, 1]);
  expect(parseHsla('hsla(-100grad 100% 45%)')).toEqual([115, 0, 230, 270, 1, 0.45, 1]);
  expect(parseHsla('hsla(-1.57rad 100% 45%)')).toEqual([115, 0, 230, 270, 1, 0.45, 1]);
  expect(parseHsla('hsla(-90deg 100% 45%)')).toEqual([115, 0, 230, 270, 1, 0.45, 1]);
});

test('returns empty array if failed to parse', () => {
  expect(parseHsla()).toEqual([]);
  expect(parseHsla('')).toEqual([]);
  expect(parseHsla('hsl()')).toEqual([]);
  expect(parseHsla('hlsa(214 80% 65% / 0.5)')).toEqual([]);
  expect(parseHsla('hsla(-0.25turns 100% 45%)')).toEqual([]);
  expect(parseHsla('hsla(100 deg 100% 45%)')).toEqual([]);
  expect(parseHsla('hsla(-1.57rad 100% 45% 14% 32%)')).toEqual([]);
  expect(parseHsla(42)).toEqual([]);
});

test('ugly typing', () => {
  expect(parseHsla('hsla(     100deg    ,      100%,45%         )')).toEqual([76, 230, 0, 100, 1, 0.45, 1]);
});
