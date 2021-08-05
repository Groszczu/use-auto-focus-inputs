import * as React from 'react';
import {TextInput, View} from 'react-native';
import useAutoFocusInputs from './use-auto-focus-inputs';

const input3Ref: React.MutableRefObject<TextInput | null> =
  React.createRef<TextInput | null>();

function TestForm(): JSX.Element {
  const getAutoFocusableInputProps = useAutoFocusInputs();
  const input1Ref = React.useRef<TextInput>(null);
  const input2Ref = React.useRef<TextInput>(null);

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

export default TestForm;
