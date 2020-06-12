export const RGB_XYZ_MATRIX = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041],
];

export const XYZ_RGB_MATRIX = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.969266, 1.8760108, 0.041556],
  [0.0556434, -0.2040259, 1.0572252],
];

export function applyMatrix(xyz, matrix) {
  return xyz.map((_, i, _xyz) => _xyz.reduce((p, v, j) => p + v * matrix[i][j], 0));
}
