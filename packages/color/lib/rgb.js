const { extractGroups } = require('./utils');
const { parseRgbaArray } = require('./array');

const RGBA_COMMA_RE = /^rgba?\(\s*([^\s,]+)\s*,\s*([^\s,]+)\s*,\s*([^\s,]+)\s*(?:,\s*([^\s,]+)\s*)?\)$/i;
const RGBA_WHITE_RE = /^rgba?\(\s*(\S+)\s+(\S+)\s+(\S+)\s*(?:\s+\/\s+(\S+)\s*)?\)$/i;

function parseRgba(rgbaString) {
  if (typeof rgbaString !== 'string') return [];
  const re = rgbaString.includes(',') ? RGBA_COMMA_RE : RGBA_WHITE_RE;
  const rgba = extractGroups(rgbaString, re);
  return parseRgbaArray(rgba);
}

module.exports = parseRgba;
