module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', 'plugin:mocha/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['mocha'],
  rules: {
    'mocha/no-mocha-arrows': 0,
    'mocha/max-top-level-suites': ['warn', { limit: 2 }],
  },
};
