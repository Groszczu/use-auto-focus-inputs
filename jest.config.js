const jestDefaultConfig = {
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  rootDir: '.',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
};

const native = {
  ...jestDefaultConfig,
  displayName: {
    name: 'React Native',
    color: 'magenta',
  },
  preset: 'react-native',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!(@react-native|react-native)[/\\\\])',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setupAfterEnv.ts'],
};

module.exports = {
  collectCoverageFrom: [
    '**/**/*.{ts,tsx}',
    '!**/**/*.test.{ts,tsx}',
    '!**/src/types/**',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  projects: [native],
};
