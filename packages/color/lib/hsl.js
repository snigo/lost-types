const { extractGroups } = require('./utils');
const { _parseHslaArray } = require('./array');

const HSLA_COMMA_RE = /^hsla?\(\s*([^\s,]+)\s*,\s*([^\s,]+)\s*,\s*([^\s,]+)\s*(?:,\s*([^\s,]+)\s*)?\)$/i;
const HSLA_WHITE_RE = /^hsla?\(\s*(\S+)\s+(\S+)\s+(\S+)\s*(?:\s+\/\s+(\S+)\s*)?\)$/i;

function parseHsla(hslaString) {
  if (typeof hslaString !== 'string') return [];
  const re = hslaString.includes(',') ? HSLA_COMMA_RE : HSLA_WHITE_RE;
  const hsla = extractGroups(hslaString, re);
  return _parseHslaArray(hsla);
}

module.exports = parseHsla;
