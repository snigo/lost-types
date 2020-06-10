const Color = require('../../color/lib/color');
const { approx } = require('../../mathx/lib/mathx');
const { contrast, findByContrast } = require('../src/contrast');

test('contrast function should calculate contrast value between color and background', () => {
  expect(contrast('white', 'black')).toBe(21);
  expect(contrast('black', 'black')).toBe(1);
  expect(contrast('pink', 'blue')).toBeCloseTo(5.59);
  expect(contrast('black', 'white')).toBe(21);
  expect(contrast('#ff0c', 'blue')).toBeCloseTo(5.01);
});

test('constrast function should throw if color is incorrect', () => {
  expect(() => contrast('fff', 'rgba(0, 0, 0)')).toThrow();
});

test('findByContrast function should find color with given hue, saturation and target contrast values', () => {
  const base = new Color([255, 255, 255]);
  const color = findByContrast(234, 0.8, base, 4.5);

  expect(color instanceof Color).toBe(true);
  expect(color.hue).toBe(234);
  expect(color.saturation).toBe(0.8);
  expect(approx(contrast(color, base), 4.5, 0.05)).toBe(true);
});
