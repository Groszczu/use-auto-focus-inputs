import '@testing-library/jest-native/extend-expect';

// @ts-expect-error: Just for tests
global.window = {};
// @ts-expect-error: Just for tests
global.window = global;
