import { useState, useEffect } from 'react';

export default function useCountDown(initial) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  return count;
}
