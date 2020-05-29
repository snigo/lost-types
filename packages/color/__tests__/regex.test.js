const { HEX_RE, RGBA_RE, HSLA_RE } = require('../lib/regex');

test('HEX_RE should verify color in hexadecimal format and correctly extract R G B A values', () => {
  // color should start with -#
  expect(HEX_RE.test('fff')).toBe(false);
  expect(HEX_RE.test('#f8a')).toBe(true);

  // color should only be in #-hexadecimal format
  expect(HEX_RE.test('hsl(0, 0%, 0%)')).toBe(false);
  expect(HEX_RE.test('#ffadbg')).toBe(false);

  // #-hexadecimal format with alpha value #RRGGBBAA
  expect(HEX_RE.test('#f8f6f4a1d')).toBe(false);
  expect(HEX_RE.test('#f8f6f4a1')).toBe(true);
  expect(HEX_RE.test('#f8f6f4a')).toBe(false);

  // #-hexadecimal format without alpha value #RRGGBB
  expect(HEX_RE.test('#f8f6f4')).toBe(true);
  expect(HEX_RE.test('#f8f6f')).toBe(false);

  // Single digit #-hexadecimal format with alpha value #RGBA
  expect(HEX_RE.test('#f8f6')).toBe(true);

  // Single digit #-hexadecimal format without alpha value #RGB
  expect(HEX_RE.test('#f8f')).toBe(true);
  expect(HEX_RE.test('#f8')).toBe(false);
  expect(HEX_RE.test('#')).toBe(false);

  // Empty arguments
  expect(HEX_RE.test('')).toBe(false);
  expect(HEX_RE.test()).toBe(false);

  // Should correctly extract RGBA groups
  expect(HEX_RE.exec('#f8f6f4a1')).toContain('a1');
  expect(HEX_RE.exec('#f8f6f4a1').filter(Boolean).slice(1)).toEqual(['f8', 'f6', 'f4', 'a1']);
  expect(HEX_RE.exec('#ccc').filter(Boolean).slice(1)).toEqual(['c', 'c', 'c']);
  expect(HEX_RE.exec('#ccc1').filter(Boolean).slice(1)).toEqual(['c', 'c', 'c', '1']);
  expect(HEX_RE.exec('#ccc11d').filter(Boolean).slice(1)).toEqual(['cc', 'c1', '1d']);
});

test('RGBA_RE should verify color in RGBA functional format and correctly extract R G B A values', () => {
  // color should only be in rgba functional format
  expect(RGBA_RE.test('#fff')).toBe(false);
  expect(RGBA_RE.test('rgb(0, 0, 0)')).toBe(true);
  expect(RGBA_RE.test('hsl(0, 0%, 0%)')).toBe(false);
  expect(RGBA_RE.test('red')).toBe(false);

  // should allow extra white spaces
  expect(RGBA_RE.test('rgb( 34, 12, 64, 0.6 )')).toBe(true);

  // rgba without alpha value is allowed
  expect(RGBA_RE.test('rgba(34, 12, 64)')).toBe(true);

  // whitespace delimeters allowed
  expect(RGBA_RE.test('rgb(34 12 64)')).toBe(true);

  // Alpha value in percentage format, no whitespaces
  expect(RGBA_RE.test('rgba(34,12,64,60%)')).toBe(true);

  // Whitespace notation with alpha value
  expect(RGBA_RE.test('rgb(34 12 64 / 60%)')).toBe(true);

  // Checks for typos or illegal whitespaces
  expect(RGBA_RE.test('rbg(0, 0, 0)')).toBe(false);
  expect(RGBA_RE.test('rgb (255, 255, 255)')).toBe(false);

  // Allows values exceeding 8-bit
  expect(RGBA_RE.test('rgb(256, 255, 255)')).toBe(true);

  // Allows percentage values for R G B
  expect(RGBA_RE.test('rgba(45%, 65%, 10%)')).toBe(true);
  expect(RGBA_RE.test('rgba(45% 65% 10% / .34)')).toBe(true);

  // Allows scientific number notation, case insensitivity and negation signs
  expect(RGBA_RE.test('rgba(.23e3, +346e-1, -255, .34e1)')).toBe(true);
  expect(RGBA_RE.test('rGbA(.23e3, +346e-1, -255, .34e1)')).toBe(true);
  expect(RGBA_RE.test('Rgba(.23E3, +346E-1, -255, .34E1)')).toBe(true);

  // Empty arguments
  expect(RGBA_RE.test('')).toBe(false);
  expect(RGBA_RE.test()).toBe(false);

  // Should correctly extract RGBA groups
  expect(RGBA_RE.exec('rgba(.23e3, +346e-1, -255, .34e1)').filter(Boolean).slice(1)).toEqual(['.23e3', '+346e-1', '-255', '.34e1']);
  expect(RGBA_RE.exec('rgb(34 12 64)').filter(Boolean).slice(1)).toEqual(['34', '12', '64']);
  expect(RGBA_RE.exec('rgba(34, 12, 64, 60%)').filter(Boolean).slice(1)).toEqual(['34', '12', '64', '60%']);
});

test('HSLA_RE should verify color in HSLA functional format and correctly extract R G B A values', () => {
  // checks correct format
  expect(HSLA_RE.test('#fff')).toBe(false);
  expect(HSLA_RE.test('hsl(0, 0%, 0%)')).toBe(true);
  expect(HSLA_RE.test('rgb(0, 0%, 0%)')).toBe(false);
  expect(HSLA_RE.test('red')).toBe(false);

  // Allows different angle units, scientific number notation, case insensitivity and negation signs
  expect(HSLA_RE.test('hsl( 34grad, 12%, 64%, 0.6 )')).toBe(true);
  expect(HSLA_RE.test('HSLA(34deg, 12%, 64%)')).toBe(true);
  expect(HSLA_RE.test('hsl(.34turn 12% 64%)')).toBe(true);
  expect(HSLA_RE.test('HSLA(34rad, 12%, 64%, 60%)')).toBe(true);
  expect(HSLA_RE.test('HSLA(.23e3grAD, +346E-1%, -2%, .34e1)')).toBe(true);

  // Allows whitespace notation
  expect(HSLA_RE.test('hsl(34 12% 64% / 60%)')).toBe(true);

  // Checks for typos or illegal whitespaces
  expect(HSLA_RE.test('hls(0, 0%, 0%)')).toBe(false);
  expect(HSLA_RE.test('hsl (255, 10%, 55%)')).toBe(false);

  // Allows values exceeding 8-bit
  expect(HSLA_RE.test('hsl(1452, 1265%, 23543%)')).toBe(true);

  // Empty arguments
  expect(HSLA_RE.test('')).toBe(false);
  expect(HSLA_RE.test()).toBe(false);

  // Correctly extracts HSLA groups
  expect(HSLA_RE.exec('HSLA(.23e3grAD, +346E-1%, -2%, .34e1)').filter(Boolean).slice(1)).toEqual(['.23e3grAD', '+346E-1%', '-2%', '.34e1']);
  expect(HSLA_RE.exec('hsl(.34turn 12% 64%)').filter(Boolean).slice(1)).toEqual(['.34turn', '12%', '64%']);
  expect(HSLA_RE.exec('hsla(34, 12%, 64%, 60%)').filter(Boolean).slice(1)).toEqual(['34', '12%', '64%', '60%']);
});
