const AliasMap = require('../lib/aliasmap');

test('creating AliasMap instance', () => {
  const aliasMap = new AliasMap();

  expect(aliasMap).toBeInstanceOf(AliasMap);
  expect(Object.keys(aliasMap)).toHaveLength(0);
  expect(typeof aliasMap.get).toBe('function');
  expect(typeof aliasMap.getEntry).toBe('function');
  expect(typeof aliasMap.getPrimaryKey).toBe('function');
  expect(typeof aliasMap.getAliases).toBe('function');
  expect(typeof aliasMap.getValue).toBe('function');
  expect(typeof aliasMap.getOwnDescriptor).toBe('function');
  expect(typeof aliasMap.has).toBe('function');
  expect(typeof aliasMap.hasAlias).toBe('function');
  expect(typeof aliasMap.set).toBe('function');
  expect(typeof aliasMap.setAlias).toBe('function');
  expect(typeof aliasMap.setOwnDescriptor).toBe('function');
  expect(typeof aliasMap.delete).toBe('function');
  expect(typeof aliasMap.deleteAlias).toBe('function');
  expect(typeof aliasMap.clear).toBe('function');
  expect(typeof aliasMap.entries).toBe('function');
  expect(typeof aliasMap.keys).toBe('function');
  expect(typeof aliasMap.values).toBe('function');
  expect(typeof aliasMap.forEach).toBe('function');
  expect(typeof aliasMap[Symbol.iterator]).toBe('function');

  expect(aliasMap.size).toBe(0);
  expect(aliasMap.entryCount).toBe(0);

  expect(AliasMap).toThrow();
  expect(aliasMap.toString()).toBe('[object AliasMap]');
  expect(JSON.stringify(aliasMap)).toBe('{}');
  expect(Object.getOwnPropertyNames(aliasMap)).toHaveLength(0);
});

test('default AliasMap descriptor and setting new descriptor', () => {
  const aliasMap = new AliasMap();

  expect(aliasMap.getOwnDescriptor()).toHaveProperty('strict', true);
  expect(aliasMap.getOwnDescriptor()).toHaveProperty('immutable', true);

  aliasMap.strict = false;
  aliasMap.immutable = false;

  expect(aliasMap.getOwnDescriptor()).toHaveProperty('strict', true);
  expect(aliasMap.getOwnDescriptor()).toHaveProperty('immutable', true);

  const descriptor = aliasMap.setOwnDescriptor({ strict: false, immutable: false });

  expect(descriptor).toHaveProperty('strict', false);
  expect(descriptor).toHaveProperty('immutable', false);
  expect(aliasMap.getOwnDescriptor()).toHaveProperty('strict', false);
  expect(aliasMap.getOwnDescriptor()).toHaveProperty('immutable', false);
});

test('operations with empty map', () => {
  const aliasMap = new AliasMap();

  expect(aliasMap.get('foo')).toBeUndefined();
  expect(aliasMap.getEntry('foo')).toBeUndefined();
  expect(aliasMap.getPrimaryKey('foo')).toBeUndefined();
  expect(aliasMap.getValue('foo')).toBeUndefined();
  expect(aliasMap.getAliases('foo')).toBeUndefined();

  expect(aliasMap.has()).toBe(false);
  expect(aliasMap.has('foo')).toBe(false);
  expect(aliasMap.hasAlias()).toBe(false);
  expect(aliasMap.hasAlias('foo')).toBe(false);
  expect(aliasMap.hasAlias('foo', 'bar')).toBe(false);

  expect(aliasMap.delete()).toBe(false);
  expect(aliasMap.delete('foo')).toBe(false);
  expect(aliasMap.deleteAlias()).toBe(false);
  expect(aliasMap.deleteAlias('foo')).toBe(false);
  expect(aliasMap.deleteAlias('foo', 'bar')).toBe(false);

  expect(aliasMap.clear()).toBeUndefined();

  expect(aliasMap.keys()).toEqual([]);
  expect(aliasMap.values()).toEqual([]);
  expect(aliasMap.entries()).toEqual([]);
  expect([...aliasMap]).toEqual([]);

  let count = 0;
  aliasMap.forEach(() => {
    count += 1;
  });

  expect(count).toBe(0);
});

test('basic crud operations', () => {
  const aliasMap = new AliasMap();
  aliasMap.set('foo', 'bar');

  expect(aliasMap.size).toBe(2);
  expect(aliasMap.entryCount).toBe(1);
  expect(aliasMap.has('foo')).toBe(true);
  expect(aliasMap.has('bar')).toBe(true);
  expect(aliasMap.getAliases('bar')).toEqual([]);

  aliasMap.set('alice', 'neighbors', 'bob');
  expect(aliasMap.size).toBe(5);
  expect(aliasMap.entryCount).toBe(2);
  expect(aliasMap.has('neighbors')).toBe(true);
  expect(aliasMap.hasAlias('alice', 'bob')).toBe(true);
  expect(aliasMap.hasAlias('bob', 'alice')).toBe(false);

  aliasMap.setAlias('bar', 'bizz');
  expect(aliasMap.size).toBe(6);
  expect(aliasMap.entryCount).toBe(2);
  expect(aliasMap.hasAlias('foo', 'bizz')).toBe(true);
  expect(aliasMap.get('foo')).toBe('bar');
  expect(aliasMap.get('bar')).toBe('foo');
  expect(aliasMap.getValue('bar')).toBe('bar');
  expect(aliasMap.get('bizz')).toBe('bar');
  expect(aliasMap.getPrimaryKey('bizz')).toBe('foo');
  expect(aliasMap.getPrimaryKey('bar')).toBe('foo');
  expect(aliasMap.getAliases('bar')).toEqual(['bizz']);

  aliasMap.delete('bob');
  expect(aliasMap.size).toBe(3);
  expect(aliasMap.entryCount).toBe(1);
  expect(aliasMap.get('alice')).toBeUndefined();
  expect(aliasMap.getPrimaryKey('neighbors')).toBeUndefined();
  expect(aliasMap.getAliases('bob')).toBeUndefined();
  expect(aliasMap.deleteAlias('bar', 'boomer')).toBe(false);

  aliasMap.deleteAlias('bar', 'bizz');
  expect(aliasMap.getAliases('foo')).toEqual([]);

  aliasMap.clear();
  expect(aliasMap.size).toBe(0);
  expect(aliasMap.entryCount).toBe(0);
});

test('Conflict handling with strict: true, immutable: true', () => {
  const aliasMap = new AliasMap();
  aliasMap.set('A', 'B', 'C');

  expect(() => aliasMap.set('B', 'E', 'F')).toThrow();
  expect(() => aliasMap.set('C', 'E', 'F')).toThrow();
  expect(() => aliasMap.set('E', 'B', 'F')).toThrow();
  expect(() => aliasMap.set('E', 'C', 'F')).toThrow();
  expect(() => aliasMap.set('F', 'E', 'B')).toThrow();
  expect(() => aliasMap.set('F', 'E', 'C')).toThrow();
  expect(() => aliasMap.set('E', 'A', 'F')).toThrow();
  expect(() => aliasMap.set('F', 'E', 'A')).toThrow();
  expect(() => aliasMap.set('A', 'C', 'B')).toThrow();
  expect(() => aliasMap.set('A', 'B', 'C')).toThrow();
  expect(() => aliasMap.set('A', 'B', 'C', 'D')).toThrow();

  aliasMap.set('A', 'B', 'D');

  expect(aliasMap.get('D')).toBe('B');
  expect(aliasMap.getAliases('C')).toEqual(['C', 'D']);
});

test('Conflict handling with strict: false, immutable: true', () => {
  const aliasMap = new AliasMap({ strict: false });
  aliasMap.set('A', 'B', 'C');

  expect(aliasMap.set('B', 'E', 'F')).toBe(false);
  expect(aliasMap.has('F')).toBe(false);
  expect(aliasMap.set('C', 'E', 'F')).toBe(false);
  expect(aliasMap.has('E')).toBe(false);
  expect(aliasMap.set('E', 'B', 'F')).toBe(false);
  expect(aliasMap.has('F')).toBe(false);
  expect(aliasMap.has('B')).toBe(true);
  expect(aliasMap.set('E', 'C', 'F')).toBe(false);
  expect(aliasMap.has('F')).toBe(false);
  expect(aliasMap.set('F', 'E', 'B')).toBe(false);
  expect(aliasMap.set('F', 'E', 'C')).toBe(false);
  expect(aliasMap.set('E', 'A', 'F')).toBe(false);
  expect(aliasMap.set('F', 'E', 'A')).toBe(false);
  expect(aliasMap.set('A', 'C', 'B')).toBe(false);
  expect(aliasMap.set('A', 'B', 'C')).toBe(false);
  expect(aliasMap.set('A', 'B', 'C', 'D')).toBe(false);
});

test('Conflict handling with immutable: false', () => {
  const aliasMap = new AliasMap({ immutable: false });
  aliasMap.set('A', 'B', 'C');

  // Overwriting "B" will destroy first entry
  aliasMap.set('B', 'E', 'F');

  expect(aliasMap.entryCount).toBe(1);
  expect(aliasMap.has('A')).toBe(false);
  expect(aliasMap.has('C')).toBe(false);
  expect(aliasMap.get('B')).toBe('E');

  // Overwriting alias "F" will strip it out of first entry without destroying entry
  aliasMap.set('A', 'C', 'F');

  expect(aliasMap.entryCount).toBe(2);
  expect(aliasMap.get('F')).toBe('C');
  expect(aliasMap.has('B')).toBe(true);
  expect(aliasMap.getAliases('B')).toEqual([]);

  // Overwriting value with the same key will preserve aliases
  // and will just update the value
  aliasMap.setAlias('B', 'X', 'Y', 'Z');
  aliasMap.set('B', 'D');

  expect(aliasMap.entryCount).toBe(2);
  expect(aliasMap.has('E')).toBe(false);
  expect(aliasMap.getAliases('D')).toEqual(['X', 'Y', 'Z']);

  // Overwriting same values will return false
  expect(aliasMap.set('B', 'D')).toBe(false);
});
