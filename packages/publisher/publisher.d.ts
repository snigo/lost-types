declare namespace Publisher {
  interface SubjectDescriptor<K = string | Symbol, V = any> {
    [key: K]: (value: V) => void;
  }

  class Publisher<K = string | Symbol, V = any> {
    constructor();
    subscribe(subject: SubjectDescriptor): Subscription<K>;
    unsubscribe(subjectId: number, key: K): void;
    setState(key: K, value: V);
  }

  class Subscription<K = string | Symbol> {
    constructor(subjectId: number, publisher: Publisher);
    unsubscribe(key: K): void;
  }

  class Subject<K = string | Symbol, V = any> {
    constructor(descriptor: SubjectDescriptor<K, V>);
    get done(): boolean;
    next(key: K, value: V): void;
    complete(): void;
    delete(key: K): void;
  }
}