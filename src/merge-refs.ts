import * as React from 'react';

type MutableRef<T extends React.ReactNode> =
  | React.MutableRefObject<T | null>
  | React.RefCallback<T>;

function mergeRefs<T extends React.ReactNode>(
  ...refs: (MutableRef<T> | null | undefined)[]
): React.Ref<T> {
  const filteredRefs = refs.filter(Boolean) as MutableRef<T>[];
  if (!filteredRefs.length) {
    return null;
  }
  if (filteredRefs.length === 1) {
    return filteredRefs[0];
  }
  return (instance) => {
    filteredRefs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else {
        ref.current = instance;
      }
    });
  };
}

export default mergeRefs;
