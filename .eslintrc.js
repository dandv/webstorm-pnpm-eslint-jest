module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // Mandate testing
  env: {
    'jest/globals': true,  // describe, test, expect
  },
  plugins: [
    'jest',
  ],
  rules: {
    indent: ['error', 2],
  },
};
