# Color

Greatly missed Color type for JavaScript. Doesn’t rely on browsers to parse color strings and therefore could be used in any environment. Parses color from all supported formats, including RGB and HSL functional notation, #-hexadecimal string, named color with additional formats like RGB array or Color object.

## Usage

In the terminal:
```

% npm install @lost-types/color

```

Then in the module:
```js

// JavaScript modules
import Color from '@lost-types/color';

// CommonJS
const Color = require('@lost-types/color');

const red = new Color('red');

```

## Motivation

Consider this example, you've assigned the color of the HTML element with `hsl()` notation, let's say `hsl(314, 86%, 49%)`. After that there is absolutely no way to get this value back and you will receive something like `rgb(232, 17, 182)` if you try. **“But I needed hue?!!”** And in general, it’s rather strange that we have Date Picker and Date type, but Color Picker doesn’t have Color type.

Apart from browser we don't have native color parsing solutions on other environments, this Color class doesn't rely on browswer and can parse color in any environment. See parsing options below.

```js

const color = new Color('rgb(232, 17, 182)');
color.hue; // 314
color.toHslString(); // hsl(314, 86%, 49%) Hooray!

```


## API

### Constructor

Creates a new Color instance.

| **Parameter** | **Type** | **Default value** | **Notes**                                       |
|---------------|----------|-------------------|-------------------------------------------------|
| `color`       | `any`    |                   | Color in any supported format, or as rgba array |

```js

new Color('#ff0');

```

### Parsing options

#### String in RGB function notation

```js

// Current standard whitespace notation using absolute values
new Color('rgb(126 13 76 / 0.34)');

// Whitespace notation using relative values
new Color('rgb(84% 5% 43% / 34%)');

// Whitespace notation using mixed values (NOTE: Doesn't supported by browsers)
new Color('rgb(126 13% 76%)');

// Comma separated notation
new Color('rgba(126, 13, 76, 0.34)');
new Color('rgb(126, 13, 76, 0.34)');
new Color('rgba(126, 13, 76)');
new Color('rgb(26%, 13%, 76%, 34%)');
new Color('rgba(126, 13%, 76, 34%)');

```

#### String in #RRGGBB hexadecimal notation

```js

new Color('#ff45ad');
new Color('#ff45ad3e');
new Color('#f4a');
new Color('#f4a3');

```

#### String in HSL function notation

```js

// Current standard whitespace notation
new Color('hsl(126deg 13% 76% / 0.34)');
new Color('hsl(126 5% 43% / 34%)');
new Color('hsl(0.5turn 13% 76%)');
new Color('hsl(2.6rad 100% 50%)');

// Comma separated notation
new Color('hsl(126deg, 13%, 76%, 0.34)');
new Color('hsl(126, 5%, 43%, 34%)');
new Color('hsl(0.5turn, 13%, 76%)');
new Color('hsl(2.6rad, 100%, 50%)');

```

#### Standard named colors and transparent keyword

```js

new Color('red');
new Color('Yellow');
new Color('SaLmOn');
new Color('transparent');

```

#### RGB(A) Array

```js

new Color([255, 243, 5]);
new Color([255, 243, 5, 0.15]);
new Color(['34%', '43%', '100%']);

```

#### Color descriptor object

```js

new Color({
  red: 14,
  green: 25,
  blue: 145,
});

new Color({
  red: '14',
  green: '25%',
  blue: 145,
  alpha: '12%',
});

new Color({
  hue: '14grad',
  saturation: '25%',
  lightness: 0.45,
  alpha: 0.1,
});

```

### Properties

#### `Color.name`

Returns color name if color is one of CSS-supported [named colors](https://www.w3.org/TR/css-color-4/#named-colors). If color is semi-transparent (has alpha value less than 1) color name is concatenated with `*`.

```js

const crimson = new Color([220, 20 ,60]);
crimson.name; // "crimson"

const transparent = new Color('transparent');
transparent.toRgbString(); // "rgba(0, 0, 0, 0)"
// NOTE: Asterix added
transparent.name; // "black*"

```

***

#### `Color.red`
#### `Color.green`
#### `Color.blue`

Return red, green and blue values of the color identifying a point in the sRGB color space. Output is a number in [0...255] range:

```js

// Color input is case-insensitive
const white = new Color('WhItE');
white.red; // 255
white.green; // 255
white.blue; // 255

const royalblue = new Color('#4169E1');
royalblue.red; // 65
royalblue.green; // 105
royalblue.blue; // 225

```

***

#### `Color.hue`
#### `Color.hrad`
#### `Color.hgrad`
#### `Color.hturn`

Returns the hue angle of the color on the color wheel in degrees (`hue`), radians (`hrad`), gradients (`hgrad`) and turns or cycles (`hturn`). 0 degrees is referred to red color.

```js

const darkgreen = new Color('hsl(120deg 100% 25%)');
darkgreen.hue; // 120
darkmagenta.hrad; // 2.0944
darkmagenta.hgrad; // 133.3333
darkmagenta.hturn; // 0.3333

const darkmagenta = new Color('hsla(-0.125turn, 65%, 35%)');
darkmagenta.hue; // 315
darkmagenta.hrad; // 5.4978
darkmagenta.hgrad; // 350
darkmagenta.hturn; // 0.875


```

***


#### `Color.saturation`

Returns the color saturation value of HSL representation **as number**. Number in [0...1] range, where 0 is completely desaturated color and 1 - fully saturated color.

```js

const gold = new Color('#fc9');
gold.saturation; // 1
gold.toHslString(); // "hsl(30, 100%, 80%)"

const slateGray = new Color('slategray');
slateGray.saturation; // 0.13


```

***

#### `Color.lightness`

Returns the color lightness value of HSL representation **as number**. Number in [0...1] range, where 0 is completely dark color (black) and 1 - fully light color (white).

```js

const deepSkyBlue = new Color('rgb(0 191 255)');
deepSkyBlue.lightness; // 0.5
deepSkyBlue.toHslString(); // "hsl(195, 100%, 50%)"

const black = new Color('#2a2e2f');
black.lightness; // 0.17


```

***

#### `Color.whiteness`

Returns the color whiteness value of HWB representation **as number**. Number in [0...1] range, where 0 is a tone of the color (50% lightness) and 1 is completely white.

```js

const blue = new Color('rgb(74 144 226)');
blue.whiteness; // 0.29
blue.toHwbString(); // hbw(212deg 29% 11%)

```

***

#### `Color.intensity`

Returns the color intensity value of HSI representation **as number**, also known as component average. Number in [0...1] range.

```js

const amber = new Color('#FFBF00');
amber.intensity; // 0.5833

```

***

#### `Color.alpha`

Returns the value of the alpha-channel of the color. Number in [0...1] range, where 0 is completely transparent and 1 - has full opacity.

```js

const blue = new Color('#23f');
blue.alpha; // 1

const semiTransparent = new Color('#23f4');
semiTransparent.alpha; // 0.2667

const transparent = new Color('transparent');
transparent.alpha; // 0

```

***

#### `Color.luminance`

Returns relative luminance of the color of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white. Number in [0...1] range. Relative luminance is used for calculating color contrast.

```js

const royalblue = new Color('#4169e1');
royalblue.luminance; // 0.1666

const violet = new Color('violet');
violet.luminance; // 0.4032

// Calculate contrast ratio
(violet.luminance + 0.05) / (royalblue.luminance + 0.05); // 2.092336103416436
violet.contrast(royalblue); // 2.09

```

***

#### `Color.hueGroup`
#### `Color.hueGroupOffset`

Returns index of the color group of the color's hue on color wheel. Color groups:
| **hueGroup index** | **Group name**  | **Hue range** |
|--------------------|-----------------|---------------|
| 0                  | Red-Violet      | 315 ... 344   |
| 1                  | Red             | 345 ... 14    |
| 2                  | Orange          | 15 ... 44     |
| 3                  | Yellow          | 45 ... 74     |
| 4                  | Yellow-Green    | 75 ... 104    |
| 5                  | Green           | 105 ... 134   |
| 6                  | Green-Cyan      | 135 ... 164   |
| 7                  | Cyan            | 165 ... 194   |
| 8                  | Blue-Cyan       | 195 ... 224   |
| 9                  | Blue            | 225 ... 254   |
| 10                 | Blue-Violet     | 255 ... 284   |
| 11                 | Violet          | 285 ... 314   |

Property `Color.hueGroupOffset` returns hue offset within color's group. Number in [0...29] range.

```js

const fire = new Color('#fd4523');
fire.hue; // 9
fire.hueGroup; // 0
fire.hueGroupOffset; // 24

const coolNavy = new Color('rgb(60, 20, 220)');
coolNavy.hue; // 252
coolNavy.hueGroup; // 8
coolNavy.hueGroupOffset; // 27

```

Even though color warmth is hugely subjective, you can can presume color groups 0 - 5 as warm colors and 6 - 11 as cool, that's actually the main reason why group indexation shifted back.

**NOTE:** The central color of each group will have `Color.hueGroupOffset` equal to 15, not 0.

### Static properties

#### `Color.D50`
#### `Color.D65`

Returns CIEXYZ array of reference white points D50 and D65 respectively.

```js

Color.D50; // [0.96422, 1, 0.82521]
Color.D65; // [0.9505, 1, 1.089]

```

### Static methods

#### `Color.transferGamma()`

The sRGB transfer function ("gamma"), transfers rgb XYZ gamma (2.4) to linear sRGB gamma (1.0). Necessary for color conversions between CIEXYZ and sRGB.

| **Parameter** | **Type**   | **Default value** | **Notes**                                      |
|---------------|------------|-------------------|------------------------------------------------|
| `linrgb`      | `number[]` |                   | Array or rgb values in gamma 2.4               |


***

#### `Color.xyz()`

Returns new Color instance based on XYZ values and optionally alpha.

| **Parameter** | **Type**   | **Default value** | **Notes**                                      |
|---------------|------------|-------------------|------------------------------------------------|
| `xyza`        | `number[]` |                   | Array or XYZ values and optional alpha value   |

**Important note:** CIE XYZ color space is greater than sRGB, therefore conversion to RGB might be incorrect (when color is outside RGB gamut). You should only rely on this conversion if you definitely know the color is a part of sRGB color space.

```js

const xyz = Color.xyz([])


### Methods

#### `Color.prototype.toRgbString()`
#### `Color.prototype.toHexString()`
#### `Color.prototype.toHslString()`

Returns string representation of the color in either RGB, #-hexadecimal or HSL format. 

```js

const pink = new Color('pink');
pink.alpha; // 1
pink.toHexString(); // "#ffc0cb"
pink.toRgbString(); // "rgb(255, 192, 203)"
pink.toHslString(); // "hsl(350, 100%, 88%)"

const mint = new Color('#56FF7876');
mint.alpha; // 0.4627
mint.toHexString(); // "#56ff7876"
mint.toRgbString(); // "rgba(86, 255, 120, 0.4627)"
mint.toHslString(); // "hsla(132, 100%, 67%, 0.4627)"

```
