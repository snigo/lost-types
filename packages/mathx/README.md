# MathX

Extended Math object for JavaScript. Collection of useful math functions that I personally need almost on every occasion and that are lacking in the standard [Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). The goal is not to gather every possible missing math function out there, but rather keep it lightweight and only add stupidly obvious functions to this collection.

## Usage

In the terminal:
```

% npm install @lost-types/mathx

```

Then in the module:
```js

// JavaScript modules
import MathX from '@lost-types/mathx';

// CommonJS
const MathX = require('@lost-types/mathx');

const num = MathX.toNumber('33%'); // 0.33

```

## Story behind MathX

There is always a time in every developer's life when he or she starts noticing some small functions that are being reused in almost every project. Sounds familiar? The only reasonable step from there is to make it a package and reuse them in a centralized manner. Also why not keep it open-source so people can benefit from it as well, and this is exactly what MathX is.

The threshold for the function to enter the collection - I have to use it at least in 3 projects, right now there are not many functions yet and this is work in progress, but I guarantee that they are 100% useful!

## Functions

***

#### `MathX.approx()`

Checks if the first argument approximately equals to the second argument within delta, the third argument. Tries best to account for precision errors. Returns a boolean.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `a`           | `number` |                   |                                                |
| `b`           | `number` |                   |                                                |
| `delta`       | `number` | 0                 | Optional, defaults to 0                        |

```js

MathX.approx(0.34, 0.45, 0.1); // false
MathX.approx(0.34, 0.44, 0.1); // true
// While 0.3 === 0.2 + 0.1 -> false
MathX.approx(0.3, 0.2, 0.1); // true

```

***

#### `MathX.getPrecision()`

Calculates precision of the provided number, including negative precision, aka number of trailing zeros of the integer

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `number`      | `number` |                   |                                                |

```js

MathX.getPrecision(0.45); // 2
MathX.getPrecision('12.300'); // 1
MathX.getPrecision(-1.2e-11); // 12
MathX.getPrecision(0.45); // 2
MathX.getPrecision(0.45); // 2
MathX.getPrecision(0.45); // 2
MathX.getPrecision(12000000); // -6
MathX.getPrecision(1.45e+100); // -98
MathX.getPrecision(Infinity); // 0

```

***

#### `MathX.modulo()`

Calculates modulo in the correct way including negative numbers. Fixes so called JavaScript modulo bug: https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm

| **Parameter** | **Type**  | **Default value** | **Notes**      |
|---------------|-----------|-------------------|----------------|
| `a`           |`number`   |                   |                |
| `b`           |`number`   |                   |                |

```js

MathX.modulo(-2, 5); // 3
MathX.modulo(2, -5); // -3
MathX.modulo(21, 4); // 1

```

***

#### `MathX.random()`

This one is super obvious and I know that many libraries have it, but still. Generates random number within given range with certain precision. Negative precision will work as well. Returns generated number.

| **Parameter** | **Type**  | **Default value** | **Notes**                                        |
|---------------|-----------|-------------------|--------------------------------------------------|
| `range`       |`number[]` |                   | Array in [min, max] format                       |
| `precision`   |`number`   | 12                | Optional                                         |

```js

MathX.random([-5, 5], 4); // -4.7824
MathX.random([0, 10000], -2); // 2200
MathX.random([0, 100], 0); // 71
MathX.random(); // 0.897057820671

```

***

#### `MathX.round()`

Another popular one. Similarly to [_.round()](https://lodash.com/docs/4.17.15#round), rounds number to certain precision. Negative precision will work as well. Digests strings if needed. Returns a rounded number.

| **Parameter** | **Type**  | **Default value** | **Notes**                                        |
|---------------|-----------|-------------------|--------------------------------------------------|
| `number`      |`number`   |                   |                                                  |
| `precision`   |`number`   | 12                | Optional                                         |

```js

MathX.round('0.45876453', 4); // 0.4588
MathX.round(0.1 + 0.2); // 0.3
MathX.round(23567, -3); // 24000
MathX.round(23567, -2); // 23600
MathX.round(23567, -1); // 23570
MathX.round(23567, -5); // 0

```

**Note unusual behavior:** while many would expect default precision to be 0, `MathX.round()` uses default precision of 12

***

#### `MathX.toNumber()`

Converts string or number to a certain precision. Understands percentage and **do not** coerces any other types into number.

| **Parameter** | **Type**  | **Default value** | **Notes**                                        |
|---------------|-----------|-------------------|--------------------------------------------------|
| `number`      |`number`   |                   |                                                  |
| `precision`   |`number`   | 12                | Optional                                         |

```js

MathX.toNumber('3.45e2'); // 345
MathX.toNumber(0.1 + 0.2); // 0.3
MathX.toNumber('13.359%', 4); // 0.1336
// Be careful with following:
MathX.toNumber(true); // NaN
MathX.toNumber(null); // NaN
MathX.toNumber(); // NaN
MathX.toNumber([1]); // NaN

```
