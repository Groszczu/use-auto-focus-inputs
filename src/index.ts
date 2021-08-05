import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
} from 'react-native';
import callAll from './call-all';
import mergeRefs from './merge-refs';

type TextInputPropsWithOptionalRef = TextInputProps &
  React.RefAttributes<TextInput>;

type UseAutoFocusInputsReturnType = <
  TProps extends TextInputPropsWithOptionalRef,
>(
  props: TProps,
) => TProps;

function useAutoFocusInputs({
  initialRerender = true,
} = {}): UseAutoFocusInputsReturnType {
  const inputRefsRef = React.useRef<React.RefObject<TextInput>[]>([]);
  const inputIndexRef = React.useRef(-1);
  const [rerendered, setRerendered] = React.useState(false);

  React.useEffect(() => {
    // reset input index on rerender
    inputIndexRef.current = -1;
  });

  React.useEffect(() => {
    if (!rerendered && initialRerender) {
      setRerendered(true);
    }
  }, [initialRerender, rerendered]);

  return React.useCallback(
    <TProps extends TextInputPropsWithOptionalRef>({
      ref,
      onSubmitEditing,
      ...props
    }: TProps): TProps => {
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
      } as TProps;
    },
    [],
  );
}

export default useAutoFocusInputs;
