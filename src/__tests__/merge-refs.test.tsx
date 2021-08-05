import * as React from 'react';
import {TextInput} from 'react-native';
import {render} from '@testing-library/react-native';
import mergeRefs from '../merge-refs';

test('should merge refs if more then one ref was provided', () => {
  const ref1 = React.createRef<TextInput | null>();
  const ref2 = React.createRef<TextInput | null>();

  const mergedRef = mergeRefs(ref1, ref2);
  expect(typeof mergeRefs).toBe('function');

  render(<TextInput ref={mergedRef} />);

  expect(ref1.current).not.toBeNull();
  expect(ref2.current).not.toBeNull();
});

test('should return single ref if only one input ref is truthy', () => {
  const ref = React.createRef<TextInput | null>();

  const mergedRef = mergeRefs(ref, null, undefined);
  expect(typeof mergedRef).not.toBe('function');

  render(<TextInput ref={mergedRef} />);

  expect(ref.current).not.toBeNull();
});
