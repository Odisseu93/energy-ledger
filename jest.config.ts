import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/__tests__/setup.ts'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/__tests__/**',
    '!src/server.ts',
    // Infrastructure implementations that require real external services
    // (PostgreSQL, Gemini API) are covered at the integration/E2E level only.
    '!src/infrastructure/database/repositories/**',
    '!src/infrastructure/llm/gemini.adapter.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
    },
  },
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
};

export default config;
