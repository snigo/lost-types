import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  /**
   *
   *
   * AliasMap
   *
   *
   */
  {
    input: 'packages/aliasmap/src/aliasmap.js',
    output: {
      file: 'packages/aliasmap/min/aliasmap.js',
      name: 'AliasMap',
      format: 'iife',
    },
    plugins: [
      terser({
        keep_classnames: true,
      }),
    ],
  },
  {
    input: 'packages/aliasmap/src/aliasmap.js',
    output: {
      file: 'packages/aliasmap/lib/aliasmap.js',
      format: 'cjs',
    },
    plugins: [
      terser({
        keep_classnames: true,
      }),
    ],
  },
  {
    input: 'packages/aliasmap/src/aliasmap.js',
    output: {
      file: 'packages/aliasmap/module/aliasmap.js',
      format: 'es',
    },
    plugins: [
      terser({
        keep_classnames: true,
      }),
    ],
  },
  /**
   *
   *
   * Color
   *
   *
   */
  {
    input: 'packages/color/src/color.js',
    output: {
      file: 'packages/color/min/color.js',
      format: 'iife',
      name: 'Color',
      globals: {
        '@lost-types/mathx': 'MathX',
        '@lost-types/range': 'Range',
        '@lost-types/alias-map': 'AliasMap',
      },
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      terser({
        keep_classnames: true,
      }),
    ],
  },
  {
    input: 'packages/color/src/color.js',
    output: {
      file: 'packages/color/module/color.js',
      format: 'es',
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      terser({
        keep_classnames: true,
      }),
    ],
  },
  {
    input: 'packages/color/src/color.js',
    output: {
      file: 'packages/color/lib/color.js',
      format: 'cjs',
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      terser({
        keep_classnames: true,
      }),
    ],
    external: ['@lost-types/mathx', '@lost-types/range', '@lost-types/alias-map'],
  },
  // {
  //   input: 'packages/colorista/lib/colorista.js',
  //   output: {
  //     file: 'packages/colorista/build/colorista.js',
  //     format: 'iife',
  //   },
  //   plugins: [
  //     resolve({ browser: true }),
  //     commonjs(),
  //     compiler(),
  //   ],
  // },
  // {
  //   input: 'packages/mathx/lib/mathx.js',
  //   output: {
  //     file: 'packages/mathx/build/mathx.js',
  //     format: 'iife',
  //   },
  //   plugins: [
  //     resolve({ browser: true }),
  //     commonjs(),
  //     compiler(),
  //   ],
  // },
  // {
  //   input: 'packages/publisher/lib/publisher.js',
  //   output: {
  //     file: 'packages/publisher/build/publisher.js',
  //     format: 'iife',
  //   },
  //   plugins: [
  //     resolve({ browser: true }),
  //     commonjs(),
  //     compiler(),
  //   ],
  // },
  // {
  //   input: 'packages/range/lib/range.js',
  //   output: {
  //     file: 'packages/range/build/range.js',
  //     format: 'iife',
  //   },
  //   plugins: [
  //     resolve({ browser: true }),
  //     commonjs(),
  //     compiler(),
  //   ],
  // },
];
