import { useEffect } from 'react';

const useEscape = (ref, callback) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    }
  });
};

export default useEscape;
