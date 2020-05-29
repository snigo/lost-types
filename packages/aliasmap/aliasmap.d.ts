declare namespace AliasMap {
  class Entry<K = any, V = any, A = any> {
    key: K;
    value: V;
    aliases: Set<A>;
    values(): [K, V, ...A];
  }

  interface AliasMapDescriptor {
    strict: boolean;
    immutable: boolean;
  }

  type CallbackFunction = (entry: Entry, index: number, entries: Entry[]) => void;

  class AliasMap<K = any, V = any, A = any> {
    constructor(descriptor?: AliasMapDescriptor);
    get size(): number;
    get entryCount(): number;
    get(item: K | V | A): K | V | undefined;
    getOwnDescriptor(): AliasMapDescriptor;
    getEntry(item: K | V | A): Entry | undefined;
    getPrimaryKey(item: K | V | A): K | undefined;
    getValue(item: K | V | A): V | undefined;
    getAliases(item: K | V | A): A[] | undefined;
    has(item: K | V | A): boolean;
    hasAlias(item: K | V | A, alias: A): boolean;
    set(key: K, value: V, ...aliases?: A[]): AliasMap;
    setAlias(item: K | V | A, ...aliases: A[]): A[];
    setOwnDescriptor(descriptor: AliasMapDescriptor): AliasMapDescriptor;
    clear(): void;
    delete(item: K | V | A): boolean;
    deleteAlias(item: K | V | A, alias: A): boolean;
    entries(): Entry[];
    keys(): K[];
    values(): V[];
    forEach(fn: CallbackFunction, thisArg: any);
  }
}