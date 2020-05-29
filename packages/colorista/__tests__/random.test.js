const Range = require('../../range/lib/range');
const Color = require('../../color/lib/color');
const { contrast } = require('../lib/contrast');
const { randomRgbColor, randomHslColor, randomByContrast } = require('../lib/random');

test('randomRgbColor gererates random color', () => {
  const totallyRandom = randomRgbColor();
  const rgbRange = new Range(255);

  expect(totallyRandom).toBeInstanceOf(Color);
  expect(rgbRange.has(totallyRandom.red)).toBe(true);
  expect(rgbRange.has(totallyRandom.green)).toBe(true);
  expect(rgbRange.has(totallyRandom.blue)).toBe(true);

  const rangedAndFixed = randomRgbColor([5, 35], 0);
  const redRange = new Range(5, 35);

  expect(redRange.has(rangedAndFixed.red)).toBe(true);
  expect(rangedAndFixed.green).toBe(0);
  expect(rgbRange.has(rangedAndFixed.blue)).toBe(true);
});

test('randomHslColor gererates random color', () => {
  const totallyRandom = randomHslColor();
  const hueRange = new Range(359);
  const percentRange = new Range(1);

  expect(totallyRandom).toBeInstanceOf(Color);
  expect(hueRange.has(totallyRandom.hue)).toBe(true);
  expect(percentRange.has(totallyRandom.saturation)).toBe(true);
  expect(percentRange.has(totallyRandom.lightness)).toBe(true);

  const rangedAndFixed = randomHslColor([0, 359], [0.75, 0.95], 0.5);
  const saturationRange = new Range(0.75, 0.95);

  expect(hueRange.has(rangedAndFixed.hue)).toBe(true);
  expect(saturationRange.has(rangedAndFixed.saturation)).toBe(true);
  expect(rangedAndFixed.lightness).toBe(0.5);
});

test('randomByContrast function should generate random color', () => {
  const randomColor = randomByContrast(4.5, 'white', [0.6, 1]);
  const saturationRange = new Range(0.6, 1);

  expect(randomColor).toBeInstanceOf(Color);
  expect(saturationRange.has(randomColor.saturation)).toBe(true);
  expect(contrast(randomColor, 'white')).toBeCloseTo(4.5, 0);
});
