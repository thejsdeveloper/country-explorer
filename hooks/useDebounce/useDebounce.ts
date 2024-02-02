import * as React from "react";

export default function useDebounce<T>(value: T, delay: number) {
  const [state, setState] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setState(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return state;
}
