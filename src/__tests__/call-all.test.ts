import callAll from '../call-all';

function getNMockFunctions(numberOfMockFunctions = 1) {
  return Array.from({length: numberOfMockFunctions}).map(() => jest.fn());
}

function getRandomNumberFromRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

test('should call all truthy functions once', () => {
  const mocks = getNMockFunctions(getRandomNumberFromRange(1, 15));
  callAll(...mocks)();

  mocks.forEach((mock) => {
    expect(mock).toBeCalledTimes(1);
  });
});

test('should call all truthy functions with same arguments', () => {
  const mocks = getNMockFunctions(getRandomNumberFromRange(1, 15));
  const args = [1, 2];
  callAll(...mocks)(...args);

  mocks.forEach((mock) => {
    expect(mock).toBeCalledWith(...args);
  });
});

test('should ignore undefined or null', () => {
  const mocks = getNMockFunctions(getRandomNumberFromRange(1, 15));
  callAll(...[...mocks, undefined, null])();
});
