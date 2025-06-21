// src/hooks/useWindowSize.jsx

import { useState, useEffect } from 'react';

// THE FIX IS HERE: Added the 'export' keyword before the function
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Call at the beginning to set initial size
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}