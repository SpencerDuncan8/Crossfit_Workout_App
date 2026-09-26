// src/context/actions/useExerciseActions.js

import { useCallback, useMemo } from 'react';
import { generateUniqueId } from '../../utils/idUtils.js';

const sanitizeList = (list) => (Array.isArray(list) ? list.map(s => (s || '').trim()).filter(Boolean) : []);

const sanitizeModifications = (mods) => {
  if (!mods) return null;
  const easier = (mods.easier || '').trim();
  const harder = (mods.harder || '').trim();
  return (easier || harder) ? { easier, harder } : null;
};

export const useExerciseActions = ({ setAppState }) => {
  const addCustomExercise = useCallback((data = {}) => {
    const trimmedName = (data.name || '').trim();
    if (!trimmedName) return null;

    const newExercise = {
      id: `custom-${generateUniqueId()}`,
      name: trimmedName,
      category: data.category || 'Other',
      primaryMuscles: Array.isArray(data.primaryMuscles) ? data.primaryMuscles : [],
      equipment: Array.isArray(data.equipment) ? data.equipment : [],
      setup: sanitizeList(data.setup),
      execution: sanitizeList(data.execution),
      commonMistakes: sanitizeList(data.commonMistakes),
      modifications: sanitizeModifications(data.modifications),
      isCustom: true,
    };

    setAppState(prev => ({
      ...prev,
      customExercises: [...(prev.customExercises || []), newExercise],
    }));

    return newExercise;
  }, [setAppState]);

  const updateCustomExercise = useCallback((exerciseId, updates) => {
    const sanitizedUpdates = { ...updates };
    if ('setup' in sanitizedUpdates) sanitizedUpdates.setup = sanitizeList(sanitizedUpdates.setup);
    if ('execution' in sanitizedUpdates) sanitizedUpdates.execution = sanitizeList(sanitizedUpdates.execution);
    if ('commonMistakes' in sanitizedUpdates) sanitizedUpdates.commonMistakes = sanitizeList(sanitizedUpdates.commonMistakes);
    if ('modifications' in sanitizedUpdates) sanitizedUpdates.modifications = sanitizeModifications(sanitizedUpdates.modifications);

    setAppState(prev => ({
      ...prev,
      customExercises: (prev.customExercises || []).map(ex =>
        ex.id === exerciseId ? { ...ex, ...sanitizedUpdates } : ex
      ),
    }));
  }, [setAppState]);

  const deleteCustomExercise = useCallback((exerciseId) => {
    setAppState(prev => ({
      ...prev,
      customExercises: (prev.customExercises || []).filter(ex => ex.id !== exerciseId),
    }));
  }, [setAppState]);

  // Clones any exercise (built-in or custom) into the user's own custom list,
  // so they can freely edit a copy without mutating the shared built-in data.
  const duplicateExerciseAsCustom = useCallback((sourceExercise) => {
    if (!sourceExercise) return null;
    return addCustomExercise({
      name: sourceExercise.name,
      category: sourceExercise.category,
      primaryMuscles: sourceExercise.primaryMuscles,
      equipment: sourceExercise.equipment,
      setup: sourceExercise.setup,
      execution: sourceExercise.execution,
      commonMistakes: sourceExercise.commonMistakes,
      modifications: sourceExercise.modifications,
    });
  }, [addCustomExercise]);

  return useMemo(() => ({
    addCustomExercise, updateCustomExercise, deleteCustomExercise, duplicateExerciseAsCustom,
  }), [
    addCustomExercise, updateCustomExercise, deleteCustomExercise, duplicateExerciseAsCustom,
  ]);
};