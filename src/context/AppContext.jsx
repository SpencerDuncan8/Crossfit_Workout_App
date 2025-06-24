// src/context/AppContext.jsx

import React, { useState, useEffect, createContext, useContext } from 'react';
import { getExerciseByName } from '../data/exerciseDatabase.js';
import { usePersistentState } from '../hooks/usePersistentState.jsx';
import { TimerProvider, TimerContext } from './TimerContext.jsx';
import { generateUniqueId } from '../utils/idUtils.js';

export const AppStateContext = createContext();
export const ThemeContext = createContext();

const initialAppState = {
  startingWeight: 0, currentWeight: 0, totalWorkoutsCompleted: 0,
  weightHistory: [], photos: [], totalLbsLifted: 0, totalReps: 0, totalSets: 0,
  programs: [], 
  workoutSchedule: {}, viewingDate: new Date().toISOString().split('T')[0],
  isModalOpen: false, modalContent: null, showConfetti: false,
  isWorkoutEditorOpen: false, editingInfo: null, 
  workoutToScheduleId: null,
};

const AppStateProviderComponent = ({ children }) => {
  const [appState, setAppState, clearAppState] = usePersistentState('crossfitTrackerState_v3', initialAppState);
  const { clearTimer } = useContext(TimerContext);

  const updateAppState = (updates) => setAppState(prev => ({ ...prev, ...updates }));
  
  const allWorkouts = appState.programs.flatMap(p => p.workouts);

  const createProgram = (name) => {
    const newProgram = {
        id: generateUniqueId(),
        name: name,
        description: "A collection of your custom workouts.",
        workouts: [],
        isTemplate: false
    };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
    return newProgram.id;
  };

  const copyProgram = (programToCopy) => {
    const newProgram = {
      ...JSON.parse(JSON.stringify(programToCopy)),
      id: generateUniqueId(),
      name: `${programToCopy.name} (Copy)`,
      isTemplate: false
    };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
    alert(`"${programToCopy.name}" was copied to your programs.`);
  };

  const deleteProgram = (programId) => {
    setAppState(prev => ({
        ...prev,
        programs: prev.programs.filter(p => p.id !== programId)
    }));
  };

  const updateProgram = (programId, updates) => {
    setAppState(prev => ({
      ...prev,
      programs: prev.programs.map(p => p.id === programId ? { ...p, ...updates } : p)
    }));
  };

  const saveCustomWorkout = (programId, workoutToSave) => {
    setAppState(prev => {
        const updatedPrograms = prev.programs.map(program => {
            if (program.id === programId) {
                const newProgram = { ...program };
                const workoutIndex = newProgram.workouts.findIndex(w => w.id === workoutToSave.id);
                if (workoutIndex > -1) {
                    newProgram.workouts[workoutIndex] = workoutToSave;
                } else {
                    newProgram.workouts.push(workoutToSave);
                }
                return newProgram;
            }
            return program;
        });
        return { ...prev, programs: updatedPrograms };
    });
  };

  const loadProgramTemplate = (template) => {
    if (appState.programs.some(p => p.id === template.id)) {
        alert(`"${template.name}" has already been added to your programs. You can copy it again to create another version.`);
        return;
    }

    const newProgram = {
        id: template.id,
        name: template.name,
        description: template.description,
        workouts: template.workouts,
        isTemplate: false,
        daysPerWeek: template.daysPerWeek,
    };
    
    const updatedPrograms = [...appState.programs, newProgram];
    updateAppState({ programs: updatedPrograms });
  };

  const deleteCustomWorkout = (programId, workoutId) => {
    setAppState(prev => {
        const updatedPrograms = prev.programs.map(program => {
            if (program.id === programId) {
                const updatedWorkouts = program.workouts.filter(w => w.id !== workoutId);
                return { ...program, workouts: updatedWorkouts };
            }
            return program;
        });
        return { ...prev, programs: updatedPrograms };
    });
  };

  const openWorkoutEditor = (programId, workoutId) => {
    updateAppState({ isWorkoutEditorOpen: true, editingInfo: { programId, workoutId } });
  };

  const closeWorkoutEditor = () => {
    updateAppState({ isWorkoutEditorOpen: false, editingInfo: null });
  };
  
  const autoScheduleProgram = (workoutsToSchedule, daysPerWeek = 5) => {
    let currentSchedule = { ...appState.workoutSchedule };
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const workout of workoutsToSchedule) {
      while (true) {
        const dayOfWeek = currentDate.getDay();

        if (dayOfWeek === 6) { 
          currentDate.setDate(currentDate.getDate() + 2);
          continue;
        }
        if (dayOfWeek === 0) { 
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        let daysScheduledThisWeek = 0;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - dayOfWeek + 1);
        for (let i = 0; i < 5; i++) {
          const checkDate = new Date(startOfWeek);
          checkDate.setDate(startOfWeek.getDate() + i);
          const dateString = checkDate.toISOString().split('T')[0];
          if (currentSchedule[dateString]) {
            daysScheduledThisWeek++;
          }
        }

        if (daysScheduledThisWeek >= daysPerWeek) {
          const daysToNextMonday = 8 - dayOfWeek;
          currentDate.setDate(currentDate.getDate() + daysToNextMonday);
          continue;
        }
        
        const dateString = currentDate.toISOString().split('T')[0];
        if (currentSchedule[dateString]) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }
        break;
      }

      const dateString = currentDate.toISOString().split('T')[0];
      currentSchedule[dateString] = { workoutId: workout.id, completedData: null };

      // --- THE FIX: This is the new logic for adding a rest day ---
      if (daysPerWeek <= 3) {
        // For low-frequency programs, add a rest day by skipping ahead 2 days.
        currentDate.setDate(currentDate.getDate() + 2);
      } else {
        // For dense programs (4-5 days), just go to the next day.
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    updateAppState({ workoutSchedule: currentSchedule });
  };
  
  const resetAllData = () => {
    clearAppState();
    clearTimer();
    window.location.reload();
  };
  
  const selectWorkoutToSchedule = (workoutId) => {
    updateAppState({ workoutToScheduleId: workoutId });
  };
  
  const clearWorkoutToSchedule = () => {
    updateAppState({ workoutToScheduleId: null });
  };
  
  const scheduleWorkoutForDate = (date, workoutId) => {
    const dateString = date.toISOString().split('T')[0];
    const currentSchedule = appState.workoutSchedule[dateString];
    if (currentSchedule && currentSchedule.workoutId === workoutId) {
        const newSchedule = { ...appState.workoutSchedule };
        delete newSchedule[dateString];
        updateAppState({ workoutSchedule: newSchedule });
    } else {
        updateAppState({ workoutSchedule: { ...appState.workoutSchedule, [dateString]: { workoutId, completedData: null } } });
    }
    clearWorkoutToSchedule();
  };

  const navigateToDate = (dateString) => updateAppState({ viewingDate: dateString });
  const getScheduledDates = () => Object.keys(appState.workoutSchedule).sort((a,b) => new Date(a) - new Date(b));
  const navigateToPrevScheduled = () => { const dates = getScheduledDates(); const i = dates.indexOf(appState.viewingDate); if (i > 0) navigateToDate(dates[i - 1]); };
  const navigateToNextScheduled = () => { const dates = getScheduledDates(); const i = dates.indexOf(appState.viewingDate); if (i > -1 && i < dates.length - 1) navigateToDate(dates[i + 1]); };
  const openExerciseModal = (exerciseId) => { const details = getExerciseByName(exerciseId); if(details) updateAppState({isModalOpen: true, modalContent: details})};
  const closeModal = () => updateAppState({ isModalOpen: false });
  const addWeightEntry = (newWeight) => { const today = new Date().toLocaleDateString(); const entry = { date: today, weight: newWeight }; const hist = appState.weightHistory.filter(e => e.date !== today); const updated = [...hist, entry].sort((a,b) => new Date(a.date) - new Date(b.date)); const start = appState.startingWeight === 0 ? newWeight : appState.startingWeight; updateAppState({ startingWeight: start, currentWeight: newWeight, weightHistory: updated }); };
  const addPhotoEntry = (photoUrl) => { const today = new Date().toLocaleDateString(); const photo = { date: today, url: photoUrl }; const updated = [...appState.photos, photo].sort((a,b) => new Date(a.date) - new Date(b.date)); updateAppState({ photos: updated }); };
  
  const completeWorkout = (dateString, stats) => {
    const newSchedule = { ...appState.workoutSchedule };
    if (newSchedule[dateString]) newSchedule[dateString].completedData = stats;
    updateAppState({
      workoutSchedule: newSchedule,
      totalWorkoutsCompleted: appState.totalWorkoutsCompleted + 1,
      totalSets: appState.totalSets + (stats.sets || 0),
      totalReps: appState.totalReps + (stats.reps || 0),
      totalLbsLifted: appState.totalLbsLifted + (stats.weight || 0),
      showConfetti: true,
    });
    setTimeout(() => updateAppState({ showConfetti: false }), 5000);
  };
  
  return (
    <AppStateContext.Provider value={{ 
      appState, allWorkouts, updateAppState,
      createProgram, copyProgram, deleteProgram, updateProgram,
      saveCustomWorkout, deleteCustomWorkout, openWorkoutEditor, loadProgramTemplate,
      closeWorkoutEditor, openExerciseModal, closeModal, addWeightEntry, addPhotoEntry, 
      completeWorkout, resetAllData, scheduleWorkoutForDate, navigateToDate, 
      navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates, 
      selectWorkoutToSchedule, clearWorkoutToSchedule,
      autoScheduleProgram
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => { document.body.className = darkMode ? 'dark-theme' : 'light-theme'; }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);
  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const AppProviders = ({ children }) => (
  <ThemeProvider>
    <TimerProvider>
      <AppStateProviderComponent>
        {children}
      </AppStateProviderComponent>
    </TimerProvider>
  </ThemeProvider>
);