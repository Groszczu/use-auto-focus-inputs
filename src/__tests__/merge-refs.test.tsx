import * as React from 'react';
import {TextInput} from 'react-native';
import {render} from '@testing-library/react-native';
import mergeRefs from '../merge-refs';

const inputTestId = 'input';

const expectRefToInitialized = (
  ref: React.Ref<unknown>,
  expectedNodeTestId: string,
) => {
  if (typeof ref !== 'function') {
    return expect(ref?.current).toMatchObject({
      props: {testID: expectedNodeTestId},
    });
  }

  expect(ref).toBeCalledTimes(1);
  expect(ref).toBeCalledWith(
    expect.objectContaining({
      props: expect.objectContaining({testID: expectedNodeTestId}),
    }),
  );
};

test('should merge refs if more then one ref was provided', () => {
  const ref1 = React.createRef<TextInput | null>();
  const ref2 = React.createRef<TextInput | null>();
  const ref3 = jest.fn();

  const mergedRef = mergeRefs(ref1, ref2, ref3);
  expect(typeof mergeRefs).toBe('function');

  render(<TextInput ref={mergedRef} testID={inputTestId} />);

  expectRefToInitialized(ref1, inputTestId);
  expectRefToInitialized(ref2, inputTestId);
  expectRefToInitialized(ref3, inputTestId);
});

test('should return single ref if only one input ref is truthy', () => {
  const ref = React.createRef<TextInput | null>();

  const mergedRef = mergeRefs(ref, null, undefined);
  expect(typeof mergedRef).not.toBe('function');

  render(<TextInput ref={mergedRef} testID={inputTestId} />);

  expectRefToInitialized(ref, inputTestId);
});

test('should return null if all input refs are falsy', () => {
  const mergedRef = mergeRefs(null, undefined);
  expect(mergedRef).toBeNull();
});
