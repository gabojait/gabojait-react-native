import { useEffect, useRef, useState } from 'react';

export default function (cb: () => void, interval: number) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    setTimer(setInterval(cbRef.current, interval));
    return () => {
      clearInterval(timer);
    };
  }, []);
  return { timer };
}
