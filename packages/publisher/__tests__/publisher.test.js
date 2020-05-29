const Publisher = require('../lib/publisher');
const Subscription = require('../lib/subscription');

test('Publisher class', () => {
  class Counter extends Publisher {
    constructor() {
      super();
      this.count = 0;
    }

    increment() {
      this.setState('count', this.count + 1);
    }
  }

  const myCounter = new Counter();

  expect(myCounter).toBeInstanceOf(Publisher);
  expect(typeof myCounter.subscribe).toBe('function');
  expect(typeof myCounter.unsubscribe).toBe('function');
  expect(typeof myCounter.setState).toBe('function');

  let sideEffectCount = 0;

  const subscription = myCounter.subscribe({
    count: (value) => {
      sideEffectCount = value;
    },
  });

  expect(subscription).toBeInstanceOf(Subscription);
  expect(subscription.publisher === myCounter).toBe(true);
  expect(typeof subscription.unsubscribe).toBe('function');

  myCounter.increment();

  expect(sideEffectCount).toBe(1);
  expect(myCounter.count).toBe(1);

  myCounter.count = 2;

  expect(sideEffectCount).toBe(1);
  expect(myCounter.count).toBe(2);

  myCounter.increment();

  expect(sideEffectCount).toBe(3);
  expect(myCounter.count).toBe(3);

  subscription.unsubscribe('count');
  myCounter.increment();

  expect(sideEffectCount).toBe(3);
  expect(myCounter.count).toBe(4);
});
