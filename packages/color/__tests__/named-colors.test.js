const namedColors = require('../lib/named-colors');

test('correct number of colors as per W3C specification', () => {
  expect(namedColors.entryCount).toBe(139);
});

test('correct mapping for random colors', () => {
  expect(namedColors.get('azure')).toBe('#f0ffff');
  expect(namedColors.get('#000000')).toBe('black');
  expect(namedColors.get('blue')).toBe('#0000ff');
  expect(namedColors.get('#ff7f50')).toBe('coral');
  expect(namedColors.get('darkgrey')).toBe('#a9a9a9');
  expect(namedColors.get('#ff8c00')).toBe('darkorange');
  expect(namedColors.get('forestgreen')).toBe('#228b22');
  expect(namedColors.get('#fffaf0')).toBe('floralwhite');
  expect(namedColors.get('gray')).toBe('#808080');
  expect(namedColors.get('#008000')).toBe('green');
  expect(namedColors.get('indigo')).toBe('#4b0082');
  expect(namedColors.get('#fffff0')).toBe('ivory');
  expect(namedColors.get('lightgreen')).toBe('#90ee90');
  expect(namedColors.get('#d3d3d3')).toBe('lightgray');
  expect(namedColors.get('lime')).toBe('#00ff00');
  expect(namedColors.get('#b0c4de')).toBe('lightsteelblue');
  expect(namedColors.get('magenta')).toBe('#ff00ff');
  expect(namedColors.get('#0000cd')).toBe('mediumblue');
  expect(namedColors.get('mistyrose')).toBe('#ffe4e1');
  expect(namedColors.get('#000080')).toBe('navy');
  expect(namedColors.get('orange')).toBe('#ffa500');
  expect(namedColors.get('#ff4500')).toBe('orangered');
  expect(namedColors.get('pink')).toBe('#ffc0cb');
  expect(namedColors.get('#800080')).toBe('purple');
  expect(namedColors.get('royalblue')).toBe('#4169e1');
  expect(namedColors.get('#ff0000')).toBe('red');
  expect(namedColors.get('silver')).toBe('#c0c0c0');
  expect(namedColors.get('#fffafa')).toBe('snow');
  expect(namedColors.get('white')).toBe('#ffffff');
  expect(namedColors.get('#ffff00')).toBe('yellow');
});

test('correct colors aliases', () => {
  expect(namedColors.hasAlias('cyan', 'aqua')).toBe(true);
  expect(namedColors.hasAlias('magenta', 'fuchsia')).toBe(true);
  expect(namedColors.hasAlias('darkgray', 'darkgrey')).toBe(true);
  expect(namedColors.hasAlias('darkslategray', 'darkslategrey')).toBe(true);
  expect(namedColors.hasAlias('dimgray', 'dimgrey')).toBe(true);
  expect(namedColors.hasAlias('lightgray', 'lightgrey')).toBe(true);
  expect(namedColors.hasAlias('lightslategray', 'lightslategrey')).toBe(true);
  expect(namedColors.hasAlias('gray', 'grey')).toBe(true);
  expect(namedColors.hasAlias('slategray', 'slategrey')).toBe(true);
});
