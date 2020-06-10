const Colorista = require('../src/colorista');

test('Colorist object has all methods', () => {
  expect(typeof Colorista.contrast).toBe('function');
  expect(typeof Colorista.cooler).toBe('function');
  expect(typeof Colorista.getHueByOffset).toBe('function');
  expect(typeof Colorista.getTone).toBe('function');
  expect(typeof Colorista.findByContrast).toBe('function');
  expect(typeof Colorista.hueShift).toBe('function');
  expect(typeof Colorista.mix).toBe('function');
  expect(typeof Colorista.offsetHue).toBe('function');
  expect(typeof Colorista.opposite).toBe('function');
  expect(typeof Colorista.randomByContrast).toBe('function');
  expect(typeof Colorista.randomHslColor).toBe('function');
  expect(typeof Colorista.randomRgbColor).toBe('function');
  expect(typeof Colorista.warmer).toBe('function');
});
