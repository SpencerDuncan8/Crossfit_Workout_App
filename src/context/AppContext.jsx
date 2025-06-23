// src/context/AppContext.jsx

import React, { useState, useEffect, createContext, useContext } from 'react';
import { getExerciseByName } from '../data/exerciseDatabase.js';
import { usePersistentState } from '../hooks/usePersistentState.jsx';
import { TimerProvider, TimerContext } from './TimerContext.jsx';

export const AppStateContext = createContext();
export const ThemeContext = createContext(); // Make sure ThemeContext is exported

const initialAppState = {
  startingWeight: 0, currentWeight: 0, totalWorkoutsCompleted: 0,
  weightHistory: [], photos: [], totalLbsLifted: 0, totalReps: 0, totalSets: 0,
  customWorkouts: [], workoutSchedule: {}, viewingDate: new Date().toISOString().split('T')[0],
  isModalOpen: false, modalContent: null, showConfetti: false,
  isWorkoutEditorOpen: false, editingWorkoutId: null,
  workoutToScheduleId: null, // Renamed from workoutToAssignId
};

const AppStateProviderComponent = ({ children }) => {
  const [appState, setAppState, clearAppState] = usePersistentState('crossfitTrackerState_v2', initialAppState);
  const { clearTimer } = useContext(TimerContext);

  const updateAppState = (updates) => setAppState(prev => ({ ...prev, ...updates }));

  const resetAllData = () => {
    if (window.confirm("Are you sure you want to reset all progress and workouts? This action cannot be undone.")) {
      clearAppState();
      clearTimer();
      window.location.reload();
    }
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
  const saveCustomWorkout = (workout) => { setAppState(prev => { const i = prev.customWorkouts.findIndex(w => w.id === workout.id); let u; if (i > -1) { u = [...prev.customWorkouts]; u[i] = workout; } else { u = [...prev.customWorkouts, workout]; } return { ...prev, customWorkouts: u }; }); };
  const deleteCustomWorkout = (workoutId) => updateAppState({ customWorkouts: appState.customWorkouts.filter(w => w.id !== workoutId) });
  const openWorkoutEditor = (workoutId) => updateAppState({ isWorkoutEditorOpen: true, editingWorkoutId: workoutId });
  const closeWorkoutEditor = () => updateAppState({ isWorkoutEditorOpen: false, editingWorkoutId: null });
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
      appState, updateAppState,
      openExerciseModal, closeModal, addWeightEntry, addPhotoEntry,
      completeWorkout, resetAllData,
      saveCustomWorkout, deleteCustomWorkout, openWorkoutEditor, closeWorkoutEditor,
      scheduleWorkoutForDate, navigateToDate, navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates,
      selectWorkoutToSchedule, clearWorkoutToSchedule
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

// -> THIS WAS THE MISSING PIECE
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