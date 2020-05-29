module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'jest',
  ],
  rules: {
    'no-underscore-dangle': 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'no-shadow': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
  },
};
