const parseColor = require('../lib/parse');

test('should parse color in #-hexadecimal format', () => {
  expect(parseColor('#ff0099ff')).toEqual([255, 0, 153, 324, 1, 0.5, 1]);
  expect(parseColor('#33AA3380')).toEqual([51, 170, 51, 120, 0.54, 0.43, 0.502]);
  expect(parseColor('#ff0099')).toEqual([255, 0, 153, 324, 1, 0.5, 1]);
  expect(parseColor('#3a38')).toEqual([51, 170, 51, 120, 0.54, 0.43, 0.5333]);
  expect(parseColor('#ff0')).toEqual([255, 255, 0, 60, 1, 0.5, 1]);
});

test('should parse named colors', () => {
  expect(parseColor('palegreen')).toEqual([152, 251, 152, 120, 0.93, 0.79, 1]);
  expect(parseColor('DarkSalmon')).toEqual([233, 150, 122, 15, 0.72, 0.7, 1]);
  expect(parseColor('AZURE')).toEqual([240, 255, 255, 180, 1, 0.97, 1]);
  expect(parseColor('deeppink')).toEqual([255, 20, 147, 328, 1, 0.54, 1]);
  expect(parseColor('yelloW')).toEqual([255, 255, 0, 60, 1, 0.5, 1]);
});

test('should parse rgba notation colors', () => {
  expect(parseColor('rgb(255,0,153)')).toEqual([255, 0, 153, 324, 1, 0.5, 1]);
  expect(parseColor('rgb(255 0 153)')).toEqual([255, 0, 153, 324, 1, 0.5, 1]);
  expect(parseColor('rgba(255,0,153)')).toEqual([255, 0, 153, 324, 1, 0.5, 1]);
  expect(parseColor('rgba(255 0 153)')).toEqual([255, 0, 153, 324, 1, 0.5, 1]);
  expect(parseColor('rgb(255,0,153,.45)')).toEqual([255, 0, 153, 324, 1, 0.5, 0.45]);
  expect(parseColor('rgb(255 0 153 / 45%)')).toEqual([255, 0, 153, 324, 1, 0.5, 0.45]);
  expect(parseColor('RGBA(  45%  ,  0%  ,  3%  )')).toEqual([115, 0, 8, 356, 1, 0.23, 1]);
  expect(parseColor('rGbA(.23e3, +346e-1, -255, .34e1%)')).toEqual([230, 35, 0, 9, 1, 0.45, 0.034]);
});

test('should parse hsla notation colors', () => {
  expect(parseColor('hsl(666, 0%, 153%)')).toEqual([255, 255, 255, 306, 0, 1, 1]);
  expect(parseColor('hsl(0.1turn 60% 15%)')).toEqual([61, 43, 15, 36, 0.6, 0.15, 1]);
  expect(parseColor('hsla(400grad,40%,1%)')).toEqual([4, 2, 2, 0, 0.4, 0.01, 1]);
  expect(parseColor('hsla(0 0% 0%)')).toEqual([0, 0, 0, 0, 0, 0, 1]);
  expect(parseColor('hsl(15,50%,35%,.45)')).toEqual([134, 67, 45, 15, 0.5, 0.35, 0.45]);
  expect(parseColor('hsl(15 50% 35% / 45%)')).toEqual([134, 67, 45, 15, 0.5, 0.35, 0.45]);
  expect(parseColor('HSLA(  3.14rad  ,  0%  ,  3%  )')).toEqual([8, 8, 8, 180, 0, 0.03, 1]);
  expect(parseColor('hSLA(.23e3grAD, +346E-1%, -2%, .34e1)')).toEqual([0, 0, 0, 207, 0.35, 0, 1]);
});

test('should parse colors as RGBA array', () => {
  expect(parseColor([255, 255, 255])).toEqual([255, 255, 255, 0, 0, 1, 1]);
  expect(parseColor([255, 255, 255, 0.35])).toEqual([255, 255, 255, 0, 0, 1, 0.35]);
  expect(parseColor([265, -255, 255, 0.333333333337])).toEqual([255, 0, 255, 300, 1, 0.5, 0.3333]);
});

test('should parse colors as object', () => {
  expect(parseColor({ red: 255, green: 255, blue: 255 })).toEqual([255, 255, 255, 0, 0, 1, 1]);
  expect(parseColor({
    red: 255,
    green: 255,
    blue: 255,
    alpha: 0.35,
  })).toEqual([255, 255, 255, 0, 0, 1, 0.35]);
  expect(parseColor({
    red: 265,
    green: -255,
    blue: 255,
    alpha: 0.333333333337,
  })).toEqual([255, 0, 255, 300, 1, 0.5, 0.3333]);
  expect(parseColor({ hue: 355, saturation: 0.8, lightness: 0.5 }))
    .toEqual([230, 25, 42, 355, 0.8, 0.5, 1]);
  expect(parseColor({ hue: -15, saturation: -0.8, lightness: 5e-1 }))
    .toEqual([128, 128, 128, 345, 0, 0.5, 1]);
  expect(parseColor({ red: '100%', green: '50%', blue: '25%' }))
    .toEqual([255, 128, 64, 20, 1, 0.63, 1]);
});

test('should return empty array if color cannot be parsed', () => {
  expect(parseColor('#ff0099f')).toEqual([]);
  expect(parseColor('pale green')).toEqual([]);
  expect(parseColor('rbg(255,0,153)')).toEqual([]);
  expect(parseColor('hsla(.5turns,40%,1%)')).toEqual([]);
  expect(parseColor('hsla(.5turn, .4, 1%)')).toEqual([]);
  expect(parseColor([255, 255])).toEqual([]);
  expect(parseColor([])).toEqual([]);
  expect(parseColor('')).toEqual([]);
});

test('should interpret "transparent" keyword', () => {
  expect(parseColor('transparent')).toEqual([0, 0, 0, 0, 0, 0, 0]);
});
