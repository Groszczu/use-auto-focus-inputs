import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
} from 'react-native';
import callAll from './call-all';
import mergeRefs from './merge-refs';

type TextInputRef =
  | React.RefObject<TextInput>
  | React.Ref<TextInput | null>
  | undefined;

function useAutoFocusInputs({initialRerender = true} = {}): <TProps>(
  props: TextInputProps & {ref: TextInputRef} & TProps,
) => TextInputProps & {ref: React.Ref<TextInput>} & TProps {
  const inputRefsRef = React.useRef<React.RefObject<TextInput>[]>([]);
  const inputIndexRef = React.useRef(-1);
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    // reset input index or rerender
    inputIndexRef.current = -1;
  });

  React.useEffect(() => {
    if (!rendered && initialRerender) {
      setRendered(true);
    }
  }, [initialRerender, rendered]);

  return React.useCallback(
    <TProps>({
      ref,
      onSubmitEditing,
      ...props
    }: TextInputProps & {
      ref: TextInputRef;
    } & TProps): TextInputProps & {ref: React.Ref<TextInput>} & TProps => {
      inputIndexRef.current += 1;
      const currentInputIndex = inputIndexRef.current;

      let inputRef = inputRefsRef.current[currentInputIndex];
      if (!inputRef) {
        inputRef = React.createRef<TextInput>();
        inputRefsRef.current.push(inputRef);
      }

      const nextInput = inputRefsRef.current[currentInputIndex + 1];
      return {
        ref: mergeRefs(ref, inputRef),
        returnKeyType: nextInput ? 'next' : 'done',
        blurOnSubmit: !nextInput,
        onSubmitEditing: callAll(
          nextInput
            ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                const nextInputRef = nextInput?.current;
                if (nextInputRef) {
                  nextInputRef.focus();
                }
              }
            : undefined,
          onSubmitEditing,
        ),
        ...props,
      } as TextInputProps & {ref: React.Ref<TextInput>} & TProps;
    },
    [],
  );
}

export default useAutoFocusInputs;
