const Range = require('../lib/range');

test('correctly creates instance of Range class', () => {
  const centRange = new Range(1, 100);

  expect(centRange).toBeInstanceOf(Range);
  expect(centRange.from).toBe(1);
  expect(centRange.to).toBe(100);
  expect(centRange.step).toBe(1);
  expect(typeof centRange.clamp).toBe('function');
  expect(typeof centRange.forEach).toBe('function');
  expect(typeof centRange.forEachReverse).toBe('function');
  expect(typeof centRange.getFraction).toBe('function');
  expect(typeof centRange.fromFraction).toBe('function');
  expect(typeof centRange.toArray).toBe('function');
  expect(typeof centRange.mod).toBe('function');
  expect(typeof centRange.slice).toBe('function');
  expect(typeof Range.from).toBe('function');
});

test('length and step properties', () => {
  const rangeWithDefaultStep = new Range(9);
  expect(rangeWithDefaultStep.step).toBe(1);
  expect(rangeWithDefaultStep.length).toBe(10);

  const rangeWithCustomStep = new Range(0, 9, 0.5);
  expect(rangeWithCustomStep.step).toBe(0.5);
  expect(rangeWithCustomStep.length).toBe(19);
});

test('min, max and center properties', () => {
  const range = new Range(3, -7);
  expect(range.min).toBe(-7);
  expect(range.max).toBe(3);
  expect(range.center).toBe(-2);

  const emptyRange = new Range();
  expect(emptyRange.min).toBeUndefined();
  expect(emptyRange.max).toBeUndefined();
  expect(emptyRange.center).toBeUndefined();
});

test('conversion to the array and back', () => {
  const range = new Range(5);
  expect([...range]).toEqual([0, 1, 2, 3, 4, 5]);
  expect(range.toArray()).toEqual([0, 1, 2, 3, 4, 5]);

  const arr = [7, 6, 5, 42, 16, 9];
  const rangeFromArray = Range.from(arr);
  expect(rangeFromArray.from).toBe(5);
  expect(rangeFromArray.to).toBe(42);

  expect(Range.from([]).length).toBe(0);
  expect([...Range.from('0')]).toEqual([0]);

  const rangeWithCustomStep = new Range(0, 0.5, 0.1);
  expect([...rangeWithCustomStep]).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5]);
  expect(rangeWithCustomStep.toArray()).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5]);
});

test('clamp method', () => {
  const range = new Range(9);

  expect(range.clamp(-1)).toBe(0);
  expect(range.clamp(10)).toBe(9);
  expect(range.clamp(4)).toBe(4);
  expect(range.clamp()).toBeNaN();
  expect(range.clamp('+3.45e-1')).toBe(0.345);
});

test('forEach and forEachReverse methods', () => {
  const array = [];
  const reversedArray = [];
  const range = new Range(-1, 1);
  range.forEach((number, index) => {
    array.push(number);
    array.push(index);
  }, 0.5);
  range.forEachReverse((number, index) => {
    reversedArray.push(number);
    reversedArray.push(index);
  }, 0.5);

  expect(array).toEqual([-1, 0, -0.5, 1, 0, 2, 0.5, 3, 1, 4]);
  expect(reversedArray).toEqual([1, 0, 0.5, 1, 0, 2, -0.5, 3, -1, 4]);
});

test('getFraction and fromFraction methods', () => {
  const range = new Range(-100, 100);

  expect(range.getFraction(0)).toBe(0.5);
  expect(range.fromFraction(0.5)).toBe(0);
  expect(range.getFraction(50)).toBe(0.75);
  expect(range.fromFraction(0.75)).toBe(50);
  expect(range.getFraction(200)).toBe(1.5);
  expect(range.fromFraction(1.5)).toBe(200);
  expect(range.fromFraction(-0.5)).toBe(-200);
  expect(range.getFraction()).toBeNaN();
  expect(range.fromFraction()).toBeNaN();
  expect(range.getFraction(Infinity)).toBe(Infinity);
  expect(range.fromFraction(Infinity)).toBe(Infinity);
});

test('mod method', () => {
  const circle = new Range(0, 359);

  expect(circle.mod(-45)).toBe(315);
  expect(circle.mod(45)).toBe(45);
  expect(circle.mod(450)).toBe(90);
  expect(circle.mod(Infinity)).toBeNaN();
  expect(circle.mod()).toBeNaN();
});

test('slice method', () => {
  const circle = new Range(0, 359);

  expect(circle.slice(2)).toEqual([0, 180]);
  expect(circle.slice(4)).toEqual([0, 90, 180, 270]);
  expect(circle.slice(60).length).toBe(60);
  expect(() => circle.slice(Infinity)).toThrow();
  expect(() => circle.slice(-1)).toThrow();
  expect(circle.slice(0)).toEqual([]);
  expect(circle.slice()).toEqual([]);
});
