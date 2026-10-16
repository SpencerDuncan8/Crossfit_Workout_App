// src/hooks/usePersistentState.jsx

import { useState, useEffect } from 'react';
import { reportSaveStatus } from '../utils/saveStatus.js';

// This custom hook manages loading from and saving to localStorage.
// Pass { reportStatus: true } for the main app data so a failed save (for example
// when the device's storage is full) is shown to the user instead of failing silently.
export function usePersistentState(key, initialValue, options = {}) {
  const reportStatus = options.reportStatus === true;

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
      if (reportStatus) reportSaveStatus('local', null);
    } catch (error) {
      console.error(`Error writing to localStorage key “${key}”:`, error);
      if (reportStatus) reportSaveStatus('local', { kind: 'storage-full' });
    }
  }, [key, state, reportStatus]);

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