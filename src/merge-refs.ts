import * as React from 'react';

function mergeRefs<T extends React.ReactNode>(
  ...refs: (
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined
  )[]
): React.Ref<T> {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) {
    return null;
  }
  if (filteredRefs.length === 1) {
    return filteredRefs[0] ?? null;
  }
  return (instance) => {
    filteredRefs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    });
  };
}

export default mergeRefs;
