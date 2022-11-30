module.exports = {
  collectCoverageFrom: [
    '**/src/*.{ts,tsx}',
    '!**/**/*.test.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
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
