// src/context/actions/useProgramActions.js

import { useCallback, useMemo } from 'react';
import { generateUniqueId } from '../../utils/idUtils.js';

export const useProgramActions = ({ appState, setAppState, currentUser, openPremiumModal }) => {
  const allWorkouts = useMemo(() => appState.programs.flatMap(p => p.workouts), [appState.programs]);

  const createProgram = useCallback((name) => {
    const userPrograms = appState.programs.filter(p => !p.isTemplate);
    const isPremium = appState.isPremium || currentUser?.isPremium;
    if (!isPremium && userPrograms.length >= 3) {
      openPremiumModal();
      return null;
    }
    const newProgram = { id: generateUniqueId(), name, description: "A collection of your custom workouts.", workouts: [], isTemplate: false };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
    return newProgram.id;
  }, [appState.programs, appState.isPremium, currentUser, openPremiumModal, setAppState]);

  const copyProgram = useCallback((programToCopy) => {
    const newProgram = { ...JSON.parse(JSON.stringify(programToCopy)), id: generateUniqueId(), name: `${programToCopy.name} (Copy)`, isTemplate: false };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
    alert(`"${programToCopy.name}" was copied to your programs.`);
  }, [setAppState]);

  const deleteProgram = useCallback((programId) => {
    setAppState(prev => {
      const programToDelete = prev.programs.find(p => p.id === programId);
      if (!programToDelete) {
        return prev;
      }
      const workoutIdsToDelete = new Set(programToDelete.workouts.map(w => w.id));

      const newSchedule = { ...prev.workoutSchedule };
      for (const date in newSchedule) {
        // Keep an item if it's NOT from the deleted program OR if it has been completed.
        const updatedDaySchedule = newSchedule[date].filter(
          item => !workoutIdsToDelete.has(item.workoutId) || item.completedData
        );

        if (updatedDaySchedule.length > 0) {
          newSchedule[date] = updatedDaySchedule;
        } else {
          delete newSchedule[date];
        }
      }

      const newPrograms = prev.programs.filter(p => p.id !== programId);

      return {
        ...prev,
        programs: newPrograms,
        workoutSchedule: newSchedule,
      };
    });
  }, [setAppState]);

  const updateProgram = useCallback((programId, updates) => {
    setAppState(prev => ({ ...prev, programs: prev.programs.map(p => p.id === programId ? { ...p, ...updates } : p) }));
  }, [setAppState]);

  const loadProgramTemplate = useCallback((template) => {
    const isAlreadyLoaded = appState.programs.some(p => p.id === template.id);
    if (isAlreadyLoaded) {
      alert(`"${template.name}" is already in your library.`);
      return;
    }
    const userPrograms = appState.programs.filter(p => !p.isTemplate);
    const isPremium = appState.isPremium || currentUser?.isPremium;
    if (!isPremium && userPrograms.length >= 3) {
      openPremiumModal();
      return;
    }
    const newProgram = { ...template, isTemplate: false };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
  }, [appState.programs, appState.isPremium, currentUser, openPremiumModal, setAppState]);

  const saveCustomWorkout = useCallback((programId, workout) => {
    setAppState(prev => ({
      ...prev,
      programs: prev.programs.map(program => {
        if (program.id === programId) {
          const existingIdx = program.workouts.findIndex(w => w.id === workout.id);
          const newWorkouts = [...program.workouts];
          if (existingIdx !== -1) newWorkouts[existingIdx] = workout;
          else newWorkouts.push(workout);
          return { ...program, workouts: newWorkouts };
        }
        return program;
      })
    }));
  }, [setAppState]);

  const deleteCustomWorkout = useCallback((workoutId, programId) => {
    setAppState(prev => ({
      ...prev,
      programs: prev.programs.map(p => p.id === programId ? { ...p, workouts: p.workouts.filter(w => w.id !== workoutId) } : p)
    }));
  }, [setAppState]);

  const copyCustomWorkout = useCallback((programId, workoutId) => {
    const programs = structuredClone(appState.programs);
    const program = programs.find(p => p.id === programId);
    if (!program) return;
    const workoutToCopy = program.workouts.find(w => w.id === workoutId);
    if (!workoutToCopy) return;
    const newWorkout = structuredClone(workoutToCopy);
    newWorkout.id = generateUniqueId();
    newWorkout.name = `${workoutToCopy.name} (Copy)`;
    newWorkout.blocks.forEach(block => {
      block.id = generateUniqueId();
      if (block.exercises) block.exercises.forEach(ex => {
        ex.instanceId = generateUniqueId();
        if (ex.sets) ex.sets.forEach(s => s.id = generateUniqueId());
      });
      if (block.minutes) block.minutes.forEach(m => m.id = generateUniqueId());
    });
    const originalIndex = program.workouts.findIndex(w => w.id === workoutId);
    program.workouts.splice(originalIndex + 1, 0, newWorkout);
    setAppState(prev => ({ ...prev, programs }));
  }, [appState.programs, setAppState]);

  return useMemo(() => ({
    allWorkouts, createProgram, copyProgram, deleteProgram, updateProgram,
    loadProgramTemplate, saveCustomWorkout, deleteCustomWorkout, copyCustomWorkout,
  }), [
    allWorkouts, createProgram, copyProgram, deleteProgram, updateProgram,
    loadProgramTemplate, saveCustomWorkout, deleteCustomWorkout, copyCustomWorkout,
  ]);
};