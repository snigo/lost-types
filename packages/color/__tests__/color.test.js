const Color = require('../lib/color');

test('Should be able to be created from color string', () => {
  const colorWithAlpha = new Color('#fa45');

  expect(colorWithAlpha.red).toBe(255);
  expect(colorWithAlpha.hue).toBe(33);
  expect(colorWithAlpha.alpha).toBe(0.3333);
  expect(colorWithAlpha.toHexString()).toBe('#ffaa4455');
  expect(colorWithAlpha.toRgbString()).toBe('rgba(255, 170, 68, 0.3333)');
  expect(colorWithAlpha.toHslString()).toBe('hsla(33, 100%, 63%, 0.3333)');

  const colorNoAlpha = new Color('rgba(255,170,68)');

  expect(colorNoAlpha.red).toBe(255);
  expect(colorNoAlpha.hue).toBe(33);
  expect(colorNoAlpha.alpha).toBe(1);
  expect(colorNoAlpha.toHexString()).toBe('#ffaa44');
  expect(colorNoAlpha.toRgbString()).toBe('rgb(255, 170, 68)');
  expect(colorNoAlpha.toHslString()).toBe('hsl(33, 100%, 63%)');
});

test('Should be able to be created from RGBA array and object', () => {
  const fromArrayWithAlpha = new Color([255, 170, 68, 0.3333]);

  expect(fromArrayWithAlpha.red).toBe(255);
  expect(fromArrayWithAlpha.hue).toBe(33);
  expect(fromArrayWithAlpha.alpha).toBe(0.3333);
  expect(fromArrayWithAlpha.toHexString()).toBe('#ffaa4455');
  expect(fromArrayWithAlpha.toRgbString()).toBe('rgba(255, 170, 68, 0.3333)');
  expect(fromArrayWithAlpha.toHslString()).toBe('hsla(33, 100%, 63%, 0.3333)');

  const fromArrayNoAlpha = new Color([0, 191, 255]);

  expect(fromArrayNoAlpha.red).toBe(0);
  expect(fromArrayNoAlpha.hue).toBe(195);
  expect(fromArrayNoAlpha.name).toBe('deepskyblue');
  expect(fromArrayNoAlpha.toHexString()).toBe('#00bfff');
  expect(fromArrayNoAlpha.toRgbString()).toBe('rgb(0, 191, 255)');
  expect(fromArrayNoAlpha.toHslString()).toBe('hsl(195, 100%, 50%)');

  const colorNoAlpha = new Color({ red: 255, green: 170, blue: 68 });

  expect(colorNoAlpha.red).toBe(255);
  expect(colorNoAlpha.hue).toBe(33);
  expect(colorNoAlpha.alpha).toBe(1);
  expect(colorNoAlpha.toHexString()).toBe('#ffaa44');
  expect(colorNoAlpha.toRgbString()).toBe('rgb(255, 170, 68)');
  expect(colorNoAlpha.toHslString()).toBe('hsl(33, 100%, 63%)');
});

test('Should normalize color strings', () => {
  expect(new Color('white').toHexString()).toBe('#ffffff');
  expect(new Color('#FFC').toHexString()).toBe('#ffffcc');
  expect(new Color('RGBA(255 255 255)').toRgbString()).toBe('rgb(255, 255, 255)');
  expect(new Color('hsl(3.14rad, 80%, 50%, 10%)').toHslString()).toBe('hsla(180, 80%, 50%, 0.1)');
});

test('Should preserve hue value for desaturated colors if hue value provided', () => {
  expect(new Color('white').hue).toBe(0);
  expect(new Color('#eeeeee').hue).toBe(0);
  expect(new Color('rgba(128, 128, 128)').hue).toBe(0);
  expect(new Color('hsl(180deg, 0%, 50%)').hue).toBe(180);
});

test('Should throw error if no or incorrect color provided', () => {
  expect(() => new Color('fff')).toThrow();
  expect(() => new Color('hsla(33 100% 63% 0.3333)')).toThrow();
  expect(() => new Color([255, 0])).toThrow();
  expect(() => new Color('rgb (13, 13, 13)')).toThrow();
  expect(() => new Color('hsla(33 100% 63% 0.3333)')).toThrow();
});
