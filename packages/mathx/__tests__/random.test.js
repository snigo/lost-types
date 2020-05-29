const random = require('../lib/random');

test('random function should generate random number within a range', () => {
  const randomInt = random([80, 100], 0);

  expect(randomInt >= 80 && randomInt <= 100).toBe(true);
  expect(randomInt % 1 === 0).toBe(true);

  const randomDecimal = random([0, 10], 2);
  const randomArray = [...Array(10)].map(() => random([0, 10], 2));

  expect(randomDecimal >= 0 && randomDecimal <= 10).toBe(true);
  expect(randomArray.some((n) => n % 1 !== 0)).toBe(true);
  expect(new Set(randomArray).size !== 1).toBe(true);
});

test('default values', () => {
  const randomNumber = random();
  expect(randomNumber >= 0 && randomNumber <= 1).toBe(true);
});
