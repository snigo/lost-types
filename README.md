# Snigo's lost types

Collection of super duper useful high abstrastion types crafted with care and love by [@snigo](https://snigo.dev).

## Color

```
npm install @lost-types/color
```

Color parser and converter that doesn’t rely on browsers to parse color strings and therefore could be used in any JavaScript environment.

```js

const color = new Color('#ff0');
/* 
Color{
  red: 255,
  green: 255,
  blue: 0,
  hue: 60,
  saturation: 1,
  lightness: 0.5,
  alpha: 1,
  brightness: 0.9278,
  hueGroup: 2,
  hueGroupOffset: 15,
  name: 'yellow'
}
*/

color.toHslString(); // hsl(60, 100%, 50%)

```

More details and documentation: https://github.com/snigo/lost-types/tree/master/packages/color

***

## Range

```
npm install @lost-types/range
```

Influenced by the function of the same name from Python, extremely useful data structure greatly missing in JavaScript:

```js

const range = new Range(255);
range.getFraction(17, 4); // 0.0667
// Value 17 represents 6.67% of the [0 ... 255] range

range.clamp(-10); // 0

range.mod(438); // 182

const step = 60;
range.forEach((number) => {
  console.log(number);
}, step);

// [0, 60, 120, 180, 240]

```

More details and documentation: https://github.com/snigo/lost-types/tree/master/packages/range

***

## Publisher

```
npm install @lost-types/publisher
```

Provides essential pub-sub capabilities for its instances:

```js

// Implement "Hello world" of reactive programming:
class Counter extends Publisher {
  constructor() {
    super();
    this.count = 0;
  }

  increment() {
    this.set('count', this.count + 1);
  }
}

const myCounter = new Counter();

// If you ever tried rxjs, this will be familiar:
const subscription = myCounter.subscribe({
  count: (value) => {
    console.log(`The count is: ${value}`);
  }
});

myCounter.increment(); // Logs: "The count is: 1"
myCounter.increment(); // Logs: "The count is: 2"

subscription.unsubscribe('count');

myCounter.increment(); // Logs nothing

console.log(myCounter.count); // 3

```

More details and documentation: https://github.com/snigo/lost-types/tree/master/packages/publisher

***

## Colorista

```
npm install @lost-types/colorista
```

Helper functions to work with [Color](https://github.com/snigo/lost-types/tree/master/packages/color):

```js

Colorista.mix('pink', 'blue', 0.3).toHexString(); // #4d3aef

const lowContrastRandom = Colorista.randomByContrast(1.8, 'black', [0.5, 1]);
lowContrastRandom.saturation; // 0.79
Colorista.contrast(lowContrastRandom, 'black'); // 1.79

```

More details and documentation: https://github.com/snigo/lost-types/tree/master/packages/colorista

***

## AliasMap

```
npm install @lost-types/alias-map
```

Bi-directional map with support of aliases. Might be a good solution for indexing unique data and aimed for bidirectional constant time retrieval of map entries:

```js

const marvelUniverse = new AliasMap();
const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';

marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

// Get value by key
marvelUniverse.get('Iron Man'); // "https://en.wikipedia.org/wiki/Iron_Man"

// Get Value by alias
marvelUniverse.get('Tony Stark'); // "https://en.wikipedia.org/wiki/Iron_Man"

// Get primary key by value
marvelUniverse.get(ironManUrl); // "Iron Man"

```

More details and documentation: https://github.com/snigo/lost-types/tree/master/packages/aliasmap

***

## MathX

```
npm install @lost-types/mathx
```

Collection of useful math functions missing in standard Math object:

```js

MathX.getPrecision(-1.2e-11); // 12
MathX.modulo(-2, 5); // 3
MathX.random([0, 10000], -2); // 2200
MathX.round(23567, -2); // 23600
MathX.toNumber('13.359%', 4); // 0.1336

```

More details and documentation: https://github.com/snigo/lost-types/tree/master/packages/mathx