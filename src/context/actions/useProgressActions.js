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

  const addPhotoEntry = useCallback((photoUrl) => {
    const today = new Date().toLocaleDateString();
    const photo = { date: today, url: photoUrl };
    setAppState(prev => {
      const updated = [...prev.photos, photo].sort((a, b) => new Date(a.date) - new Date(b.date));
      return { ...prev, photos: updated };
    });
  }, [setAppState]);

  const updateOneRepMax = useCallback((exerciseId, weight) => {
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) return;
    setAppState(prev => ({ ...prev, oneRepMaxes: { ...prev.oneRepMaxes, [exerciseId]: numericWeight } }));
  }, [setAppState]);

  return useMemo(() => ({
    addWeightEntry, addPhotoEntry, updateOneRepMax,
  }), [
    addWeightEntry, addPhotoEntry, updateOneRepMax,
  ]);
};