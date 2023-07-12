module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    // Prettier conflicts
    'arrowParens': ['error', 'avoid'],
    'bracketSpacing': 'off',
    'comma-dangle': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-spacing': 'off',
    'quote-props': ['error', 'as-needed'],
    'trailingComma': ['error', { 'all': true, 'esSpecCompliant': true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
