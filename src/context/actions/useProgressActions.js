// src/context/actions/useProgressActions.js

import { useCallback, useMemo } from 'react';

export const useProgressActions = ({ setAppState }) => {
  const addWeightEntry = useCallback((newWeight) => {
    const today = new Date().toLocaleDateString();
    const entry = { date: today, weight: newWeight };
    setAppState(prev => {
      const updated = [...prev.weightHistory, entry].sort((a, b) => new Date(a.date) - new Date(b.date));
      const start = prev.startingWeight || newWeight;
      return { ...prev, startingWeight: start, currentWeight: newWeight, weightHistory: updated };
    });
  }, [setAppState]);

  // The app only ever stores TWO progress photos: one "before" and one "after".
  // Setting a slot replaces whatever was there. Any photos saved by the older
  // multi-photo version are folded into the two slots and then cleared.
  const setProgressPhoto = useCallback((slot, photoUrl) => {
    if (slot !== 'before' && slot !== 'after') return;
    const photo = { date: new Date().toLocaleDateString(), url: photoUrl };
    setAppState(prev => {
      const legacy = (prev.photos || []).filter(p => p.url && p.url.startsWith('data:image'));
      const before = prev.beforePhoto || legacy[0] || null;
      const after = prev.afterPhoto || (legacy.length >= 2 ? legacy[legacy.length - 1] : null);
      return {
        ...prev,
        photos: [],
        beforePhoto: slot === 'before' ? photo : before,
        afterPhoto: slot === 'after' ? photo : after,
      };
    });
  }, [setAppState]);

  const removeProgressPhoto = useCallback((slot) => {
    if (slot !== 'before' && slot !== 'after') return;
    setAppState(prev => {
      const legacy = (prev.photos || []).filter(p => p.url && p.url.startsWith('data:image'));
      const before = prev.beforePhoto || legacy[0] || null;
      const after = prev.afterPhoto || (legacy.length >= 2 ? legacy[legacy.length - 1] : null);
      return {
        ...prev,
        photos: [],
        beforePhoto: slot === 'before' ? null : before,
        afterPhoto: slot === 'after' ? null : after,
      };
    });
  }, [setAppState]);

  const updateOneRepMax = useCallback((exerciseId, weight) => {
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) return;
    setAppState(prev => ({ ...prev, oneRepMaxes: { ...prev.oneRepMaxes, [exerciseId]: numericWeight } }));
  }, [setAppState]);

  return useMemo(() => ({
    addWeightEntry, setProgressPhoto, removeProgressPhoto, updateOneRepMax,
  }), [
    addWeightEntry, setProgressPhoto, removeProgressPhoto, updateOneRepMax,
  ]);
};