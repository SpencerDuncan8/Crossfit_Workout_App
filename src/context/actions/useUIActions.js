// src/context/actions/useUIActions.js

import { useCallback, useMemo } from 'react';
import { findExercise } from '../../data/exerciseDatabase.js';

export const useUIActions = ({ updateAppState, setAppState, customExercises }) => {
  const openInfoModal = useCallback((content) => {
    updateAppState({ isInfoModalOpen: true, infoModalContent: content });
  }, [updateAppState]);

  const closeInfoModal = useCallback(() => {
    updateAppState({ isInfoModalOpen: false, infoModalContent: null });
  }, [updateAppState]);

  const openPremiumModal = useCallback(() => {
    updateAppState({ isPremiumModalOpen: true });
  }, [updateAppState]);

  const closePremiumModal = useCallback(() => {
    updateAppState({ isPremiumModalOpen: false });
  }, [updateAppState]);

  const toggleUnitSystem = useCallback(() => {
    setAppState(prev => ({ ...prev, unitSystem: prev.unitSystem === 'imperial' ? 'metric' : 'imperial' }));
  }, [setAppState]);

  const openWorkoutEditor = useCallback((programId, workoutId = null) => {
    updateAppState({ isWorkoutEditorOpen: true, editingInfo: { programId, workoutId } });
  }, [updateAppState]);

  const closeWorkoutEditor = useCallback(() => {
    updateAppState({ isWorkoutEditorOpen: false, editingInfo: null });
  }, [updateAppState]);

  const openExerciseModal = useCallback((exerciseId) => {
    const exerciseData = findExercise(exerciseId, customExercises);
    if (exerciseData) updateAppState({ isModalOpen: true, modalContent: exerciseData });
  }, [updateAppState, customExercises]);

  const closeModal = useCallback(() => {
    updateAppState({ isModalOpen: false, modalContent: null });
  }, [updateAppState]);

  const hasExerciseDetails = useCallback((exerciseId) => !!findExercise(exerciseId, customExercises), [customExercises]);

  return useMemo(() => ({
    openInfoModal, closeInfoModal, openPremiumModal, closePremiumModal,
    toggleUnitSystem, openWorkoutEditor, closeWorkoutEditor,
    openExerciseModal, closeModal, hasExerciseDetails,
  }), [
    openInfoModal, closeInfoModal, openPremiumModal, closePremiumModal,
    toggleUnitSystem, openWorkoutEditor, closeWorkoutEditor,
    openExerciseModal, closeModal, hasExerciseDetails,
  ]);
};