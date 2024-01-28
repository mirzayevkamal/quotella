import { useEffect, useRef, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const handler = useRef(null);

  useEffect(() => {
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler.current);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
