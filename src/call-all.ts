function callAll<Args extends unknown[]>(
  ...fns: (((...args: Args) => void) | undefined | null)[]
): (...args: Args) => void {
  return (...args: Args) => {
    fns.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  };
}

export default callAll;
