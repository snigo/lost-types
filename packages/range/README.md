# Range

## Usage

In the terminal:
```

% npm install @lost-types/range

```

Then in the module:
```js
// JavaScript modules
import Range from '@lost-types/range';

// CommonJS
const Range = require('@lost-types/range');

const range = new Range(-1, 1, 0.01);

```

## Motivation

Range class is somewhat influenced by the function of the same name from Python. The important difference is that both start and end arguments **are inclusive**!
```js

const range = new Range(1, 2);
range.toArray(); // [1, 2]

```
There is no particular reason behind it, I just wanted to humanize behavior.

Why do we need Range type? If you think deeply enough you will realize that we use ranges all the time. All the types and libraries from @lost-types series are exclusively created for my personal usage, Range in particular I've created as a helper type for another type in @lost-types series - Color, here are some usage examples:
```js

const hueRange = new Range(359);
const percentRange = new Range(0, 1, 0.0001);

// Ensure hue value is always  in [0 ... 359] range
// (This is default browser behavior)
const hue = -45;
hueRange.mod(hue); // 315

// Ensure percentage value is clamped in [0 ... 1] range
const percentage = 1.25;
percentRange.clamp(percentage); // 1

```

Another useful case is just to generate array of numbers with provided step:
```js

[...new Range(9)]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[...new Range(3, -1)]; // [3, 2, 1, 0, -1]
[...new Range(1, -1, 0.25)]; // [1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1]

```
More examples below in the API section.

## API

### Constructor

Creates a new Range instance.
Parameters:
| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `rangeStart`  | `number` |         0         | Defaults to zero if only one argument provided |
| `rangeEnd`    | `number` |                   | rangeEnd is inclusive in the range             |
| `step`        | `number` |         1         | Cannot be less or equal than 0                 |

```js

new Range(-1, 1, 0.01); // Range{ from: -1, to: 1, step: 0.01 }
new Range(-1, 1); // Range{ from: -1, to: 1, step: 1 }
new Range(100); // Range{ from: 0, to: 100, step: 1 }
new Range(); // Range{}

```

### Properties

#### `Range.length`

Returns total number of numbers in the range, if range will be converted to the array
```js

const range = new Range(0, 100, 0.01);
range.length; // 10001

const array = [...range];
array.length; // 10001

```
It is useful to check the length prior to converting range into array:
```js

const range = new Range(Infinity);
range.length; // Infinity

[...range]; // Throws error: Cannot iterate through infinite range

```

***

#### `Range.from`
#### `Range.to`
#### `Range.step`

Return initial values used to create the range:
```js

const range = new Range(0, 100, 0.01);
range.from; // 0
range.to; // 100
range.step; // 0.01

```

***

#### `Range.max`
#### `Range.min`
#### `Range.center`

Return the number from the range with the greatest value, the least value and the center of the range
```js

const range = new Range(5, -5);
range.min; // -5
range.max; // 5
range.center; // 0

```

Note: All properties of the Range instance are read-only

### Methods

#### `Range.from()`

Static method on Range to generate range from array or any other iterable type. Returns a new Range instance.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `iterable`    | `any`    |                   | Any iterable type, like Array, Set, String...  |

```js

const arr = [7, 6, 5, 42, 16, 9];
Range.from(arr); // Range{ from: 5, to: 42, step: 1 }

const str = '420';
// By no way I encourage you to do this! :)
Range.from(str); // Range{ from: 0, to: 4, step: 1 }

Range.from([]); // Range{}

```

***

#### `Range.prototype.clamp()`

Similarly to [_.clamp()](https://lodash.com/docs/4.17.15#clamp), ensures the resulting number is in the range. Returns clamped number.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `number`      | `number` |                   |                                                |

```js

const range = new Range(99);
range.clamp(100); // 99
range.clamp(-42); // 0
range.clamp(15); // 15
range.clamp(); // NaN

```

***

#### `Range.prototype.has()`

Returns boolean indicating whether provided number within a range.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `number`      | `number` |                   |                                                |

```js

const range = new Range(99);
range.has(100); // false
range.has(-42); // false
range.has(15); // true
range.has(); // false

```

***

#### `Range.prototype.forEach()`

Executes provided function on every element of the range with the provided step. If no step provided initial `Range.step` will be used. Similarly to forEach in `Array`, following arguments will be passed to the callback:
  * currentValue
  * index
  * range

Will try to account for precision errors between numbers in the range. Always returns `undefined`.

| **Parameter** | **Type**  | **Default value** | **Notes**                                      |
|---------------|-----------|-------------------|------------------------------------------------|
| `fn`          |`function` |                   | To be invoked as fn(number, index, range)      |
| `step`        |`number`   | Range.step        | forEach() can be invoked with custom step      |

```js

const range = new Range(-1, 1);
range.forEach((number) => {
  console.log(number);
}, 0.5);
// -1
// -0.5
// 0
// 0.5
// 1

```

***

#### `Range.prototype.forEachReverse()`

Similarly to `Range.prototype.forEach()`, executes provided function on every element of the range with the provided step in reversed manner. If no step provided initial `Range.step` will be used. Similarly to forEach in `Array`, following arguments will be passed to the callback:
  * currentValue
  * index
  * range

Will try to account for precision errors between numbers in the range. Always returns `undefined`.

| **Parameter** | **Type**  | **Default value** | **Notes**                                        |
|---------------|-----------|-------------------|--------------------------------------------------|
| `fn`          |`function` |                   | To be invoked as fn(number, index, range)        |
| `step`        |`number`   | Range.step        | forEachReverse() can be invoked with custom step |

```js

const range = new Range(-1, 1);
range.forEachReverse((number) => {
  console.log(number);
}, 0.5);
// 1
// 0.5
// 0
// -0.5
// -1

```

***

#### `Range.prototype.getFraction()`

Returns ratio of the provided number proportional to the range.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `number`      | `number` |                   |                                                |
| `precision`   | `number` | 12                | Optional                                       |

Useful to calculate percentage value of the range.

```js

const range = new Range(255);
range.getFraction(17, 4); // 0.0667
// Value 17 represents 6.67% of the [0 ... 255] range

```

***

#### `Range.prototype.fromFraction()`

Inverse method from `Range.prototype.getFraction()`. Returns number represented by provided ratio relative to the range.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `ratio`       | `number` |                   |                                                |
| `precision`   | `number` | 12                | Optional                                       |

Useful to calculate value from the percentage.

```js

const range = new Range(255);
range.fromFraction(0.065, 0); // 17
// Value 17 represents 6.5% of the [0 ... 255] range with 0 floating point precision

```

***

#### `Range.prototype.toArray()`

Converts range to array. Throws error with range length is greater than max possible array size.

```js

const range = new Range(0.1, 0.5, 0.1);
range.toArray(); // [0.1, 0.2, 0.3, 0.4, 0.5]
// same as [...range]

const infiniteRange = new Range(0.1, 0.5, Number.MIN_VALUE);
infiniteRange.length; // Infinity
range.toArray(); // throws Error: Cannot iterate infinite size range

```

***

#### `Range.prototype.mod()`

Returns number in the range which is the result of modulo operation of the provided input number to the range.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `number`      | `number` |                   |                                                |

It's really much easier to explain on the example:

```js

const range = new Range(359);
range.mod(360); // 0
range.mod(-45); // 315
range.mod(15); // 15
range.mod(89352); // 72

```

***

#### `Range.prototype.slice()`

Slices range into the provided number of equal parts. Returns array of numbers representing starting boundaries of each such slice.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `parts`       | `number` |                   | Cannot be negative number                      |

```js

const range = new Range(359);
range.slice(6); // [0, 60, 120, 180, 240, 300]
range.slice(9); // [0, 40, 80, 120, 160, 200, 240, 280, 320]
range.slice(12); // [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

```