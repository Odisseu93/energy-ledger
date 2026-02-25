import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Node.js global variables (avoids dependency on the `globals` package). */
const nodeGlobals = {
  process: 'readonly',
  Buffer: 'readonly',
  console: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  module: 'readonly',
  require: 'readonly',
  exports: 'writable',
  setTimeout: 'readonly',
  setInterval: 'readonly',
  clearTimeout: 'readonly',
  clearInterval: 'readonly',
  setImmediate: 'readonly',
  clearImmediate: 'readonly',
  global: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  Promise: 'readonly',
  Error: 'readonly',
};

const jestGlobals = {
  describe: 'readonly',
  it: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  jest: 'readonly',
};

const sharedParserOptions = {
  parser: tsParser,
  parserOptions: {
        project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};

const sharedPlugins = {
  '@typescript-eslint': tsPlugin,
  prettier: prettierPlugin,
};

const sharedRules = {
  ...tsPlugin.configs.recommended.rules,
  'prettier/prettier': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-floating-promises': 'error',
};

export default [
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  js.configs.recommended,

  // Production source files
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/__tests__/**/*.ts'],
    languageOptions: {
      ...sharedParserOptions,
      globals: nodeGlobals,
    },
    plugins: sharedPlugins,
    rules: {
      ...sharedRules,
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'no-console': 'warn',
    },
  },

  // Test files
  {
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/__tests__/**/*.ts'],
    languageOptions: {
      ...sharedParserOptions,
      globals: { ...nodeGlobals, ...jestGlobals },
    },
    plugins: sharedPlugins,
    rules: {
      ...sharedRules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
    },
  },

  prettierConfig,
];
