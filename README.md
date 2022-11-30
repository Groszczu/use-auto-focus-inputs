# use-auto-focus-inputs

Single react-native hook to manage auto focus of text inputs

[![GitHub stars](https://img.shields.io/github/stars/Groszczu/use-auto-focus-inputs?style=social)](https://github.com/Groszczu/use-auto-focus-inputs/)
[![GitHub CI](https://github.com/Groszczu/use-auto-focus-inputs/actions/workflows/release.yml/badge.svg)](https://github.com/Groszczu/use-auto-focus-inputs/actions?query=workflow%3A%22release%22)
![Version](https://img.shields.io/github/package-json/v/Groszczu/use-auto-focus-inputs)
[![Minizipped size](https://img.shields.io/bundlephobia/minzip/use-auto-focus-inputs)](https://bundlephobia.com/package/use-auto-focus-inputs@0.1.4)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/Groszczu/use-auto-focus-inputs/issues)

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

## Demo

<div align="center">
    <img src="https://raw.githubusercontent.com/Groszczu/use-auto-focus-inputs/main/demo/demo.gif" alt="Usage With Simple Form" width="30%" />
</div>

Check out example project on
[expo snack](https://snack.expo.dev/@groszczu/use-auto-focus-inputs).

## Contribution

Suggestions and PR-s are welcome!
