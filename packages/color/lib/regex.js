/**
 * @fileoverview Collection of regular expressions to validate and extract
 * necessary groups from color string
 */

/**
 * Interger, decimal and scintific number notation
 */
const INT_VALUE_RE = /[+-]?\d+/;
const DECIMAL_VALUE_RE = /[+-]?\d*\.\d+/;
const SCI_VALUE_RE = new RegExp(`(?:${INT_VALUE_RE.source}|${DECIMAL_VALUE_RE.source})e${INT_VALUE_RE.source}`, 'i');

/**
 * Number and percentage types as described on MDN
 * <number> : https://developer.mozilla.org/en-US/docs/Web/CSS/number
 * <percentage> : https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
 */
const NUMBER_RE = new RegExp(`(?:${INT_VALUE_RE.source}|${DECIMAL_VALUE_RE.source}|${SCI_VALUE_RE.source})`);
const PERCENTAGE_RE = new RegExp(`${NUMBER_RE.source}%`);

/**
 * RGBA Value and RGBA string with comma and white space notations
 * NOTE: This notation allows mixing integers and numbers,
 * so rgb(34, 45%, 56) will be valid
 *
 * Example of comma separated notation: rgba(0, 0, 255, .45)
 * Example of whitespace separated notation: rgba(0 0 255 / .45)
 */
const RGBA_VALUE_RE = new RegExp(`(${NUMBER_RE.source}|${PERCENTAGE_RE.source})`);
const RGBA_COMMA_RE = new RegExp(`rgba?\\(\\s*${RGBA_VALUE_RE.source}\\s*,\\s*${RGBA_VALUE_RE.source}\\s*,\\s*${RGBA_VALUE_RE.source}\\s*(?:,\\s*${RGBA_VALUE_RE.source}\\s*)?\\)`);
const RGBA_WSPACE_RE = new RegExp(`rgba?\\(\\s*${RGBA_VALUE_RE.source}\\s+${RGBA_VALUE_RE.source}\\s+${RGBA_VALUE_RE.source}(?:\\s+\\/\\s+${RGBA_VALUE_RE.source})?\\s*\\)`);

/**
 * Accepted <angle> units, as per https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
const ANGLE_UNIT = /(?:deg|g?rad|turn)/i;

/**
 * Hue Value and HSLA string with comma and white space notations
 *
 * Example of comma separated notation: hsla(60deg, 100%, 50%, .45)
 * Example of whitespace separated notation: hsla(60deg 100% 50% / .45)
 */
const HUE_VALUE = new RegExp(`(${NUMBER_RE.source}${ANGLE_UNIT.source}?)`);
const HSLA_COMMA_RE = new RegExp(`hsla?\\(\\s*${HUE_VALUE.source}\\s*,\\s*(${PERCENTAGE_RE.source})\\s*,\\s*(${PERCENTAGE_RE.source})\\s*(?:,\\s*${RGBA_VALUE_RE.source}\\s*)?\\)`);
const HSLA_WSPACE_RE = new RegExp(`hsla?\\(\\s*${HUE_VALUE.source}\\s+(${PERCENTAGE_RE.source})\\s+(${PERCENTAGE_RE.source})(?:\\s+\\/\\s+${RGBA_VALUE_RE.source})?\\s*\\)`);

/**
 * Exportable regural expressions for strings in #-hexadecimal, RGBA and HSLA functional notations
 * Each regular expression properly extracts R, G, B, A or H, S, L, A groups
 */
const HEX_RE = /^#(?:([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?|([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?)$/i;
const RGBA_RE = new RegExp(`(?:${RGBA_COMMA_RE.source}|${RGBA_WSPACE_RE.source})`, 'i');
const HSLA_RE = new RegExp(`(?:${HSLA_COMMA_RE.source}|${HSLA_WSPACE_RE.source})`, 'i');

module.exports = {
  HEX_RE,
  RGBA_RE,
  HSLA_RE,
};
