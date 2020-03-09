import { useEffect } from 'react';

export function useOutClick(ref, handler) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handler, ref]);
}
