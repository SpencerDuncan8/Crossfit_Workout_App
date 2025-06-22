// src/hooks/usePersistentState.jsx

import { useState, useEffect } from 'react';

// This custom hook manages loading from and saving to localStorage.
export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error(`Error reading from localStorage key “${key}”:`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing to localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  // A new function to clear state both in memory and storage.
  const clearState = () => {
    try {
      localStorage.removeItem(key);
      // Also clear the old key, just in case.
      localStorage.removeItem('crossfitChallengeState'); 
    } catch (error) {
      console.error(`Error clearing localStorage key “${key}”:`, error);
    }
    setState(initialValue);
  };

  return [state, setState, clearState];
}