const Entry = require('../src/entry');

test('creating Entry instance', () => {
  const entry = new Entry('foo', 'bar', 'ironman');

  expect(entry).toBeInstanceOf(Entry);
  expect(entry).toHaveProperty('key', 'foo');
  expect(entry).toHaveProperty('value', 'bar');
  expect(entry.aliases).toBeInstanceOf(Set);
  expect(entry.aliases.size).toBe(1);
  expect(entry.aliases.has('ironman')).toBe(true);

  expect(Entry).toThrow();

  const emptyEntry = new Entry();

  expect(emptyEntry).toHaveProperty('key', undefined);
  expect(emptyEntry).toHaveProperty('value', undefined);
  expect(emptyEntry.aliases).toBeInstanceOf(Set);
  expect(emptyEntry.aliases.size).toBe(0);
});

test('getting Entry values', () => {
  const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';
  const ironMan = new Entry('Iron Man', ironManUrl, 'Anthony Edward Stark', 'Tony Stark');

  expect(ironMan.values()).toEqual([
    'Iron Man',
    'https://en.wikipedia.org/wiki/Iron_Man',
    'Anthony Edward Stark',
    'Tony Stark',
  ]);

  expect(new Entry().values()).toEqual([]);
  expect(new Entry(undefined, 'bar').values()).toEqual([undefined, 'bar']);
  expect(new Entry(undefined, undefined, 'foo').values()).toEqual([undefined, undefined, 'foo']);
});
