import * as React from 'react';
import {Button, TextInput, View} from 'react-native';
import useAutoFocusInputs from '../src/use-auto-focus-inputs';

function WithRef(): JSX.Element {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const firstNameInputRef = React.useRef<TextInput>(null);

  const getAutoFocusableInputProps = useAutoFocusInputs();

  return (
    <View style={{flex: 1}}>
      <TextInput
        {...getAutoFocusableInputProps({
          ref: firstNameInputRef,
          placeholder: 'first name',
          value: firstName,
          onChangeText: setFirstName,
          style: {width: '100%'},
        })}
      />
      <TextInput
        {...getAutoFocusableInputProps({
          placeholder: 'last name',
          value: lastName,
          onChangeText: setLastName,
          style: {width: '100%'},
        })}
      />
      <TextInput
        {...getAutoFocusableInputProps({
          placeholder: 'email',
          value: email,
          onChangeText: setEmail,
          style: {width: '100%'},
        })}
      />
      <Button
        onPress={() => firstNameInputRef.current?.focus()}
        title="Focus first input"
      />
    </View>
  );
}

export default WithRef;
