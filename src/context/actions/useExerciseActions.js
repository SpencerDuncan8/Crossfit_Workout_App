// src/context/actions/useExerciseActions.js

import { useCallback, useMemo } from 'react';
import { generateUniqueId } from '../../utils/idUtils.js';

export const useExerciseActions = ({ setAppState }) => {
  const addCustomExercise = useCallback(({ name, category, primaryMuscles = [], equipment = 'Other', instructions = '' }) => {
    const trimmedName = (name || '').trim();
    if (!trimmedName) return null;

    const newExercise = {
      id: `custom-${generateUniqueId()}`,
      name: trimmedName,
      category: category || 'Other',
      primaryMuscles,
      equipment,
      instructions,
      isCustom: true,
    };

    setAppState(prev => ({
      ...prev,
      customExercises: [...(prev.customExercises || []), newExercise],
    }));

    return newExercise;
  }, [setAppState]);

  const updateCustomExercise = useCallback((exerciseId, updates) => {
    setAppState(prev => ({
      ...prev,
      customExercises: (prev.customExercises || []).map(ex =>
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      ),
    }));
  }, [setAppState]);

  const deleteCustomExercise = useCallback((exerciseId) => {
    setAppState(prev => ({
      ...prev,
      customExercises: (prev.customExercises || []).filter(ex => ex.id !== exerciseId),
    }));
  }, [setAppState]);

  return useMemo(() => ({
    addCustomExercise, updateCustomExercise, deleteCustomExercise,
  }), [
    addCustomExercise, updateCustomExercise, deleteCustomExercise,
  ]);
};