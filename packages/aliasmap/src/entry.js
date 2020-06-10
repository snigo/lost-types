class Entry {
  constructor(key, value, ...aliases) {
    this.key = key;
    this.value = value;
    this.aliases = new Set(aliases.filter((a) => a !== key || a !== value));
  }

  values() {
    if (this.key === undefined && this.value === undefined && !this.aliases.size) return [];
    return [this.key, this.value, ...this.aliases];
  }
}
export default Entry;
