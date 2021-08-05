# use-auto-focus-inputs

## Features

- One, headless hook
- Written with Typescipt
- Integration with UI libraries
- No extra dependencies

## Install

    npm install use-auto-focus-inputs

## Quickstart

```jsx
import * as React from 'react';
import {TextInput, View} from 'react-native';
import useAutoFocusInputs from 'use-auto-focus-inputs';

function App() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const getAutoFocusableInputProps = useAutoFocusInputs();

  return (
    <View style={{flex: 1}}>
      <TextInput
        {...getAutoFocusableInputProps({
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
    </View>
  );
}
```

## Contribution

Suggestions and PR-s are welcome!
