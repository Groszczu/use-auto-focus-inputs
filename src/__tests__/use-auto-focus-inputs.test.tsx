import {fireEvent, render} from '@testing-library/react-native';
import * as React from 'react';
import {TextInput, View} from 'react-native';
import useAutoFocusInputs from '../';

let input1Ref: React.RefObject<TextInput>;
let input2Ref: React.RefObject<TextInput>;
let input3Ref: React.RefObject<TextInput>;

function TestForm() {
  const getAutoFocusableInputProps = useAutoFocusInputs();
  input1Ref = React.useRef<TextInput>(null);
  input2Ref = React.useRef<TextInput>(null);
  input3Ref = React.useRef<TextInput>(null);

  return (
    <View>
      <TextInput
        {...getAutoFocusableInputProps({
          ref: input1Ref,
          placeholder: 'input1',
        })}
      />
      <TextInput
        {...getAutoFocusableInputProps({
          ref: input2Ref,
          placeholder: 'input2',
        })}
      />
      <TextInput
        {...getAutoFocusableInputProps({
          ref: input3Ref,
          placeholder: 'input3',
        })}
      />
    </View>
  );
}

test('should focus next input when editing submitted', async () => {
  const result = render(<TestForm />);

  const input1 = result.getByPlaceholderText('input1');
  const input2 = result.getByPlaceholderText('input2');
  const input3 = result.getByPlaceholderText('input3');

  if (
    !input1Ref.current?.focus ||
    !input2Ref.current?.focus ||
    !input3Ref.current?.focus
  ) {
    throw new Error('refs are uninitialized');
  }

  input1Ref.current.focus = jest.fn();
  input2Ref.current.focus = jest.fn();
  input3Ref.current.focus = jest.fn();

  expect(input1Ref.current.focus).toHaveBeenCalledTimes(0);
  expect(input2Ref.current.focus).toHaveBeenCalledTimes(0);
  expect(input3Ref.current.focus).toHaveBeenCalledTimes(0);

  fireEvent(input1, 'onSubmitEditing');
  expect(input2Ref.current.focus).toHaveBeenCalledTimes(1);

  fireEvent(input2, 'onSubmitEditing');
  expect(input3Ref.current.focus).toHaveBeenCalledTimes(1);

  fireEvent(input3, 'onSubmitEditing');
});
