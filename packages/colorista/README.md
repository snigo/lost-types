# Colorista

Helper functions to work with [Color](https://github.com/snigo/color).

## Usage

In the terminal:
```

% npm install @lost-types/colorista

```

Then in the module:
```js

// JavaScript modules
import Colorista from '@lost-types/colorista';

// CommonJS
const Colorista = require('@lost-types/colorista');

const backgroundColor = Colorista.mix('gray', 'white', 0.5);
const primaryColor = Colorista.findByContrast(294, 0.8, backgroundColor, 4.5);

```

## Motivation

Motivation is fairly simple, I’ve created a Color type and rather than keep methods directly on the class, decided to extract them into a separate tree-shakable library called Colorista. The main purpose at the moment revolves around the contrast, I wanted to be able to find colors with specific hue values that have certain contrast relative to the base color, as well as the ability to generate random colors with certain contrast value:

```js

const targetContrast = 4.5;
const randomColor = Colorista.randomByContrast(targetContrast, '#fafefd');

randomColor.toHexString(); // #b45c41
Colorista.contrast(randomColor, '#fafefd'); // 4.54

```

## API

### Methods

#### `Colorista.contrast()`

Calcurates absolute contrast factor of 1 between two colors. Returns number in [1...21] range, **regardless of the order** of arguments. Output will be rounded to 2 decimal point digits.

| **Parameter** | **Type**   | **Default value** | **Notes**                                      |
|---------------|------------|-------------------|------------------------------------------------|
| `color`       | `AnyColor` |                   | Color to be compared                           |
| `base`        | `AnyColor` |                   | Base color to be compared against              |

NOTE: `AnyColor` here means string in rgb, hsl, #-hex notation or named color, RGB(A) array or Color instance.

```js

Colorista.contrast('white', 'hsl(0, 0%, 0%)'); // 21
Colorista.contrast('black', 'rgb(255, 255, 255)'); // 21

Colorista.contrast('blue', 'salmon'); // 3.43
```

***

#### `Colorista.cooler()`

Returns cooler version of the provided color with given intensity and optional filter color. Does not modify input color. Returns Color instance.

| **Parameter** | **Type**   | **Default value**        | **Notes**                            |
|---------------|------------|--------------------------|--------------------------------------|
| `color`       | `AnyColor` |                          | Any color to transform               |
| `intensity`   | `number`   | 0.2                      | Intensity (opacity) of the filter    |
| `filter`      | `AnyColor` | RGBArray<[67, 162, 237]> | Optional cool filter                 |

```js

const coolOrange = cooler('orange');
const coolerOrange = cooler('orange', 0.35);
const coolestOrange = cooler('orange', 0.45, 'blue');

coolOrange.toHexString(); // #fba505
coolerOrange.toRgbString(); // rgb(249, 165, 7)
coolestOrange.toHslString(); // hsl(38, 90%, 50%)

```

***

#### `Colorista.getHueByOffset()`

Returns hue value by provided hue group and hue group offset. Number in [0...359] range, representing hue angle on the color wheel, where 0 is red. More information about hue groups here: https://github.com/snigo/color#colorhuegroup

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `hueGroup`       | `number`   |                   | Desired hue group                           |
| `hueGroupOffset` | `number`   | 0                 | Hue offset within provided hue group        |

```js

Colorista.getHueByOffset(10, 5); // 300
Colorista.getHueByOffset(1, 15); // 0
Colorista.getHueByOffset(9, 0); // 225

```

***

#### `Colorista.getTone()`

Returns Color instance representing the tone of the color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `color`          | `AnyColor` |                   | Any color                                   |

```js

Colorista.getTone('hsl(34, 80%, 12%)').toHslString(); // hsl(34, 80%, 50%)
Colorista.getTone('lightblue').toHslString(); // hsl(195, 53%, 50%)
Colorista.getTone('rgb(0% 0% 0%)').name; // gray

```

***

#### `Colorista.findByContrast()`

Tries best to find and return Color instance with provided hue and saturation and given contrast ratio relative to given base color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `hue`            | `number`   |                   | Hue value of the output color               |
| `saturation`     | `number`   |                   | Saturation value of the output color        |
| `baseColor`      | `AnyColor` |                   | Base / Background color                     |
| `targetContrast` | `number`   |                   | Contrast between output and base colors     |

```js

const hue = 294;
const saturation = 0.85;
const myColor = Colorista.findByContrast(hue, saturation, 'white', 6);

myColor.toHslString(); // hsl(294, 85%, 39%)
Colorista.contrast(myColor, 'white'); // 6.17

```

NOTE: Due to the fact there is no formula to achive the result in mathematical way, at least to my knowledge, method uses binary search (aka divide and conquer) to match the closest color. Matching criteria is 0.05 delta and if it's not met algorithm outputs the last color it tries, even if semi-last was actually closer. For example, considering the code above, contrast between `white` and `hsl(294, 85%, 40%)` is 5.94 which is closer to 6, but still out of matching criteria.


***

#### `Colorista.hueShift()`

Shifts the hue of the with provided angle and returns new instance of Color woth shifted hue.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `color`          | `AnyColor` |                   | Source color                                |
| `angle`          | `number`   |                   | Angle the hue to be shifted by              |

```js

const shifted = Colorista.hueShift('yellow', 90);
shifted.toHslString(); // hsl(150, 100%, 50%)

Colorista.hueShift('hsl(0, 45%, 50%)', -100).hue; // 260

```


***

#### `Colorista.invert()`

Inverts color. Returns new instance of Color representing inverted color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                   |
|------------------|------------|-------------------|---------------------------------------------|
| `color`          | `AnyColor` |                   | Source color                                |

```js

Colorista.invert('white').toHexString(); // #000000

const invertedPink = Colorista.invert('pink');
invertedPink.toRgbString(); // rgb(0, 63, 52)

Colorista.invert(invertedPink).name; // pink

```

***

#### `Colorista.mix()`

Mixes two colors with optional alpha value. Returns new mixed Color.

| **Parameter**    | **Type**   | **Default value** | **Notes**                                                   |
|------------------|------------|-------------------|-------------------------------------------------------------|
| `color`          | `AnyColor` |                   | Source color to be mixed                                    |
| `base`           | `AnyColor` |                   | Source color to be mixed                                    |
| `alpha`          | `number`   |                   | Optional alpha value for the color, number in [0...1] range |

```js

Colorista.mix('pink', 'blue', 0.3).toHexString(); // #4d3aef
Colorista.mix('white', 'black', 0.5).name; // gray
Colorista.mix([56, 255, 123, 0.5], { hue: 223, saturation: 0.8, lightness: 0.45 }).toRgbString(); // rgb(40, 165, 165)

```

***

#### `Colorista.offsetHue()`

Returns new color within the same hue group but with the new provided hue group offset

| **Parameter**    | **Type**   | **Default value** | **Notes**                                       |
|------------------|------------|-------------------|-------------------------------------------------|
| `color`          | `AnyColor` |                   | Source color                                    |
| `offsetValue`    | `number`   |                   | Hue group offset, number in [0...29] range      |

```js

const themeHueGroupOffset = 4;
const green = new Color('#0f0');
green.hueGroupOffset; // 15

const themedGreen = Colorista.offsetHue('#0f0', themeHueGroupOffset);
themedGreen.toHslString(); // hsl(109, 100%, 50%)
themedGreen.hueGroupOffset; // 4

```

***

#### `Colorista.opposite()`

Return opposite color on the color wheel keeping saturation and lightness values

| **Parameter**    | **Type**   | **Default value** | **Notes**                                       |
|------------------|------------|-------------------|-------------------------------------------------|
| `color`          | `AnyColor` |                   | Source color                                    |

```js

const redish = new Color('hsl(345, 80%, 45%)');
redish.hue; // 345

Colorista.opposite(redish).toHslString(); // hsl(165, 80%, 45%)

```

***

#### `Colorista.randomByContrast()`

Generates random color with target contrast to the provided base color and with saturation within given range

| **Parameter**    | **Type**            | **Default value** | **Notes**                                          |
|------------------|---------------------|-------------------|----------------------------------------------------|
| `targetContrast` | `number`            | 4.5               | Target contrast to be aimed to                     |
| `base`           | `AnyColor`          | [255, 255, 255]   | Base color the target contrast to be check on      |
| `saturationRange`| `number | number[]` | [0, 1]            | Saturation range, if number provided - fixed value |

```js

const defaultRandom = Colorista.randomByContrast();
Colorista.contrast(defaultRandom, 'white'); // 4.54

const lowContrastRandom = Colorista.randomByContrast(1.8, 'black', [0.5, 1]);
lowContrastRandom.saturation; // 0.79
Colorista.contrast(lowContrastRandom, 'black'); // 1.79

const fixedSaturationRandom = Colorista.randomByContrast(7, 'pink', 0.8);
fixedSaturationRandom.saturation; // 0.8
Colorista.contrast(fixedSaturationRandom, 'pink'); // 6.62

```

**Note**: due to rounding to whole number of red, green and blue values, `randomByContrast()` will give closest possible color with given contrast target value to base color.

***

#### `Colorista.randomHslColor()`

Generates random color with provided hue, saturation and lightness ranges

| **Parameter**    | **Type**            | **Default value** | **Notes**                                          |
|------------------|---------------------|-------------------|----------------------------------------------------|
| `hueRange`       | `number | number[]` | [0, 359]          | Hue range, if number provided - fixed value        |
| `saturationRange`| `number | number[]` | [0, 1]            | Saturation range, if number provided - fixed value |
| `lightnessRange` | `number | number[]` | [0, 1]            | Lightness range, if number provided - fixed value  |

```js

const totallyRandom = Colorista.randomHslColor();
totallyRandom.toHslString(); // hsl(233, 25%, 54%)

const fixedSaturationRandomBlue = Colorista.randomHslColor([210, 270], 0.8, [0.4, 0.65]);
fixedSaturationRandomBlue.toHslString(); // hsl(262, 80%, 53%)

```

***

#### `Colorista.randomRgbColor()`

Generates random color with provided red, green and blue ranges.

| **Parameter**    | **Type**            | **Default value** | **Notes**                                           |
|------------------|---------------------|-------------------|-----------------------------------------------------|
| `redRange`       | `number | number[]` | [0, 255]          | Red color range, if number provided - fixed value   |
| `greenRange`     | `number | number[]` | [0, 255]          | Green color range, if number provided - fixed value |
| `blueRange`      | `number | number[]` | [0, 255]          | Blue color range, if number provided - fixed value  |

```js

const totallyRandom = Colorista.randomRgbColor();
totallyRandom.toRgbString(); // rgb(159, 74, 79)

const fixedRedRandom = Colorista.randomRgbColor(0, [0, 255], [0, 12]);
fixedRedRandom.toRgbString(); // rgb(0, 108, 6);

```

***

#### `Colorista.warmer()`

Returns warmer version of the provided color with given factor and filter.

| **Parameter** | **Type**   | **Default value**         | **Notes**                            |
|---------------|------------|---------------------------|--------------------------------------|
| `color`       | `AnyColor` |                           | Any color to transform               |
| `intensity`   | `number`   | 0.2                       | Intensity (opacity) of the filter    |
| `filter`      | `AnyColor` | RGBArray<[247, 166, 115]> | Optional warm filter                 |

```js

const coolSalmon = cooler('salmon');
const coolerSalmon = cooler('salmon', 0.35);
const coolestSalmon = cooler('salmon', 0.45, 'blue');

coolSalmon.toHexString(); // #f68174
coolerSalmon.toRgbString(); // rgb(245, 129, 118)
coolestSalmon.toHslString(); // hsl(1, 77%, 70%)

```