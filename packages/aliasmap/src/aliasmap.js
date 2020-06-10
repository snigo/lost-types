import Entry from './entry';

const __scope = new WeakMap();

const DEFAULT_DESCRIPTOR = {
  strict: true,
  immutable: true,
};

const _presumeExists = function(item) {
  const entry = Map.prototype.get.call(this, item);
  if (!entry) return undefined;

  if (item === entry.key || item === entry.value) {
    return this.delete(item);
  }
  return this.deleteAlias(entry.key, item);
};

const _updateEntryCount = function(num) {
  const state = __scope.get(this);
  state.entryCount += num;
};

const _testNullParam = function(...args) {
  if (args.some((a) => a == null)) {
    if (!this.getOwnDescriptor().strict) return false;
    throw TypeError('AliasMap entry cannot be null or undefined');
  }
  return true;
};

const _testImmutableParam = function(...args) {
  if (this.getOwnDescriptor().immutable && args.some((a) => this.has(a))) {
    if (!this.getOwnDescriptor().strict) return false;
    throw TypeError('Cannot reassign immutable entry. Delete entry first or set immutable property to false: .setOwnDescriptor({ immutable: false }).');
  }

  return true;
};

const _testStrictDuplicateAlias = function(key, value, ...aliases) {
  if (aliases.some((a) => a === key || a === value) && this.getOwnDescriptor().strict) {
    throw TypeError('Key or value cannot be alias for itself');
  }
};

class AliasMap extends Map {
  constructor(descriptor = DEFAULT_DESCRIPTOR) {
    super();
    const state = {
      entryCount: 0,
      ...DEFAULT_DESCRIPTOR,
    };

    Object.entries(descriptor).forEach(([rule, value]) => {
      state[rule] = value;
    });

    __scope.set(this, state);
  }

  get entryCount() {
    return __scope.get(this).entryCount;
  }

  get [Symbol.toStringTag]() {
    return 'AliasMap';
  }

  getOwnDescriptor() {
    const { strict, immutable } = __scope.get(this);
    return {
      strict,
      immutable,
    };
  }

  getEntry(item) {
    return super.get(item);
  }

  get(item) {
    const _entry = this.getEntry(item);
    if (!_entry) return undefined;
    return _entry.value === item ? _entry.key : _entry.value;
  }

  getPrimaryKey(item) {
    const _item = this.getEntry(item);
    return _item ? _item.key : _item;
  }

  getAliases(item) {
    const _item = this.getEntry(item);
    if (!_item || !('aliases' in _item)) return undefined;
    return [..._item.aliases];
  }

  getValue(item) {
    const _item = this.getEntry(item);
    return _item ? _item.value : _item;
  }

  hasAlias(item, alias) {
    const _entry = this.getEntry(item);
    return _entry ? _entry.aliases.has(alias) : false;
  }

  delete(item) {
    const entry = this.getEntry(item);
    if (!entry) return false;

    super.delete(entry.key);
    super.delete(entry.value);
    entry.aliases.forEach((alias) => {
      super.delete(alias);
    });

    _updateEntryCount.call(this, -1);

    return true;
  }

  deleteAlias(item, alias) {
    const _entry = this.getEntry(item);
    if (!_entry) return false;
    return _entry.aliases.has(alias) && super.delete(alias) && _entry.aliases.delete(alias);
  }

  set(key, value, ...aliases) {
    if (!_testNullParam.call(this, key, value, ...aliases)) return false;

    const _currentEntry = this.getEntry(key);
    if (_currentEntry && _currentEntry.key === key && _currentEntry.value === value) {
      return this.setAlias(key, ...aliases);
    }

    if (!_testImmutableParam.call(this, key, value, ...aliases)) return false;

    _testStrictDuplicateAlias.call(this, key, value, ...aliases);

    if (_currentEntry && _currentEntry.key === key) {
      aliases = [..._currentEntry.aliases, ...aliases];
    }

    const entry = new Entry(key, value, ...aliases);

    entry.values().forEach((e) => {
      _presumeExists.call(this, e);
      super.set(e, entry);
    });

    _updateEntryCount.call(this, 1);

    return this;
  }

  setAlias(item, ...aliases) {
    if (!_testNullParam.call(this, ...aliases)) return false;

    if (!_testImmutableParam.call(this, ...aliases)) return false;


    const entry = this.getEntry(item);
    if (!entry || !aliases.length) return false;

    _testStrictDuplicateAlias.call(this, entry.key, entry.value, ...aliases);

    aliases.forEach((a) => {
      if (!entry.aliases.has(a)) {
        _presumeExists.call(this, a);
        entry.aliases.add(a);
        super.set(a, entry);
      }
    });
    return [...entry.aliases];
  }

  setOwnDescriptor(descriptor) {
    const ownDescriptor = this.getOwnDescriptor();
    if ('strict' in descriptor && typeof descriptor.strict === 'boolean') {
      ownDescriptor.strict = descriptor.strict;
    }

    if ('immutable' in descriptor && typeof descriptor.immutable === 'boolean') {
      ownDescriptor.immutable = descriptor.immutable;
    }

    const state = { ...__scope.get(this), ...ownDescriptor };
    __scope.set(this, state);
    return ownDescriptor;
  }

  clear() {
    _updateEntryCount.call(this, -this.entryCount);
    return super.clear();
  }

  entries() {
    return [...new Set([...super.values()])];
  }

  keys() {
    return this.entries().map((e) => e.key);
  }

  values() {
    return this.entries().map((e) => e.value);
  }

  forEach(fn, ctx) {
    return this.entries().forEach(fn, ctx);
  }
}

export default AliasMap;
