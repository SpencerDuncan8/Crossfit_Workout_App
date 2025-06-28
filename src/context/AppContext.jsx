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
  workoutSchedule: {}, 
  viewingDate: new Date().toISOString().split('T')[0],
  viewingScheduleId: null, 
  oneRepMaxes: {},
  unitSystem: 'imperial',
  isModalOpen: false, modalContent: null, showConfetti: false,
  isWorkoutEditorOpen: false, editingInfo: null, 
  workoutToScheduleId: null,
  isInfoModalOpen: false, 
  infoModalContent: null,
};

const AppStateProviderComponent = ({ children }) => {
  const [appState, setAppState, clearAppState] = usePersistentState('blockfitState_v2_multi', initialAppState);
  const { clearTimer } = useContext(TimerContext);

  const updateAppState = (updates) => setAppState(prev => ({ ...prev, ...updates }));

  const openInfoModal = (content) => {
    updateAppState({ isInfoModalOpen: true, infoModalContent: content });
  };
  const closeInfoModal = () => {
    updateAppState({ isInfoModalOpen: false, infoModalContent: null });
  };

  const toggleUnitSystem = () => {
    setAppState(prev => ({
      ...prev,
      unitSystem: prev.unitSystem === 'imperial' ? 'metric' : 'imperial'
    }));
  };

  const allWorkouts = appState.programs.flatMap(p => p.workouts);

  const updateOneRepMax = (exerciseId, weight) => {
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) return;

    setAppState(prev => ({
      ...prev,
      oneRepMaxes: {
        ...prev.oneRepMaxes,
        [exerciseId]: numericWeight,
      }
    }));
  };

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

    const findNextAvailableDate = (startDate) => {
      let date = new Date(startDate);
      while (true) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { 
          date.setDate(date.getDate() + (dayOfWeek === 6 ? 2 : 1));
          continue;
        }
        return date; 
      }
    };

    let scheduleDate = findNextAvailableDate(currentDate);
    let workoutIndex = 0;

    for (const workout of workoutsToSchedule) {
      const dateString = scheduleDate.toISOString().split('T')[0];

      const daySchedule = currentSchedule[dateString] ? [...currentSchedule[dateString]] : [];
      daySchedule.push({
        scheduleId: generateUniqueId(),
        workoutId: workout.id,
        completedData: null,
      });
      currentSchedule[dateString] = daySchedule;

      workoutIndex++;
      if (workoutIndex % daysPerWeek === 0) {
        scheduleDate.setDate(scheduleDate.getDate() + (8 - scheduleDate.getDay()));
      } else {
        scheduleDate.setDate(scheduleDate.getDate() + 1);
        const dayOfWeek = scheduleDate.getDay();
        if (dayOfWeek === 6) scheduleDate.setDate(scheduleDate.getDate() + 2); 
        if (dayOfWeek === 0) scheduleDate.setDate(scheduleDate.getDate() + 1); 
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
    const newScheduleEntry = {
      scheduleId: generateUniqueId(),
      workoutId,
      completedData: null,
    };

    setAppState(prev => {
      const daySchedule = prev.workoutSchedule[dateString] ? [...prev.workoutSchedule[dateString]] : [];
      daySchedule.push(newScheduleEntry);
      return {
        ...prev,
        workoutSchedule: { ...prev.workoutSchedule, [dateString]: daySchedule },
        workoutToScheduleId: null 
      };
    });
  };

  const removeWorkoutFromSchedule = (date, scheduleId) => {
    const dateString = date.toISOString().split('T')[0];
    setAppState(prev => {
      const daySchedule = (prev.workoutSchedule[dateString] || []).filter(item => item.scheduleId !== scheduleId);
      const newSchedule = { ...prev.workoutSchedule };
      if (daySchedule.length > 0) {
        newSchedule[dateString] = daySchedule;
      } else {
        delete newSchedule[dateString]; 
      }
      return { ...prev, workoutSchedule: newSchedule };
    });
  };

  const navigateToDate = (dateString, scheduleId = null) => {
    updateAppState({ viewingDate: dateString, viewingScheduleId: scheduleId });
  };

  const getScheduledDates = () => Object.keys(appState.workoutSchedule)
    .filter(date => appState.workoutSchedule[date].length > 0) // Only include dates with workouts
    .sort((a,b) => new Date(a) - new Date(b));

  const navigateToPrevScheduled = () => {
    const dates = getScheduledDates();
    const currentIndex = dates.indexOf(appState.viewingDate);
    if (currentIndex > 0) {
      const prevDateString = dates[currentIndex - 1];
      const prevDaySchedule = appState.workoutSchedule[prevDateString];
      if (prevDaySchedule && prevDaySchedule.length > 0) {
        navigateToDate(prevDateString, prevDaySchedule[0].scheduleId);
      }
    }
  };

  const navigateToNextScheduled = () => {
    const dates = getScheduledDates();
    const currentIndex = dates.indexOf(appState.viewingDate);
    if (currentIndex > -1 && currentIndex < dates.length - 1) {
      const nextDateString = dates[currentIndex + 1];
      const nextDaySchedule = appState.workoutSchedule[nextDateString];
      if (nextDaySchedule && nextDaySchedule.length > 0) {
        navigateToDate(nextDateString, nextDaySchedule[0].scheduleId);
      }
    }
  };

  const getPreviousExercisePerformance = (exerciseId, currentDate) => {
    const sortedDates = Object.keys(appState.workoutSchedule).sort((a, b) => new Date(b) - new Date(a));
    const currentViewDate = new Date(currentDate);

    for (const date of sortedDates) {
      const loopDate = new Date(date);
      if (loopDate < currentViewDate) { // Only look at past dates
        const daySchedule = appState.workoutSchedule[date];
        for (const entry of daySchedule) {
          if (entry.completedData?.detailedProgress) {
            for (const progressKey in entry.completedData.detailedProgress) {
              if (progressKey.endsWith(`-${exerciseId}`)) {
                return entry.completedData.detailedProgress[progressKey];
              }
            }
          }
        }
      }
    }
    return null; // No previous performance found
  };

  const getPreviousBlockPerformance = (blockId, blockType, currentDate) => {
    const sortedDates = Object.keys(appState.workoutSchedule).sort((a, b) => new Date(b) - new Date(a));
    const currentViewDate = new Date(currentDate);
    let bestPerformance = null;

    const parseTimeToSeconds = (time) => {
      if (typeof time === 'number') return time;
      if (typeof time !== 'string' || !time.includes(':')) return Infinity;
      const parts = time.split(':');
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    };

    for (const date of sortedDates) {
      if (new Date(date) >= currentViewDate) continue;

      const daySchedule = appState.workoutSchedule[date];
      for (const entry of daySchedule) {
        const blockData = entry.completedData?.blockTimes?.[blockId];
        if (!blockData) continue;

        if (blockType === 'Conditioning: Tabata' && blockData.score && blockData.rounds) {
          return { score: blockData.score, rounds: blockData.rounds, type: 'TABATA' };
        }

        if (blockType === 'Conditioning: AMRAP' && blockData.score) {
          return { score: blockData.score, type: 'AMRAP' };
        }

        if (blockType === 'Conditioning: Chipper' && blockData.recordedTime) {
          const currentTimeInSeconds = parseTimeToSeconds(blockData.recordedTime);
          if (!bestPerformance || currentTimeInSeconds < bestPerformance.timeInSeconds) {
            bestPerformance = { time: blockData.recordedTime, timeInSeconds: currentTimeInSeconds, type: 'TIME' };
          }
        }

        if (blockType === 'Conditioning: RFT' && blockData.laps?.length > 0) {
          const totalTimeInSeconds = blockData.laps[blockData.laps.length - 1];
          if (!bestPerformance || totalTimeInSeconds < bestPerformance.timeInSeconds) {
             const minutes = Math.floor(totalTimeInSeconds / 60);
             const seconds = totalTimeInSeconds % 60;
             bestPerformance = { time: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`, timeInSeconds: totalTimeInSeconds, type: 'TIME' };
          }
        }
      }
    }
    return bestPerformance;
  };


  const hasExerciseDetails = (exerciseId) => {
    if (!exerciseId) return false;
    return !!getExerciseByName(exerciseId);
  };

  const openExerciseModal = (exerciseId) => { const details = getExerciseByName(exerciseId); if(details) updateAppState({isModalOpen: true, modalContent: details})};
  const closeModal = () => updateAppState({ isModalOpen: false });
  const addWeightEntry = (newWeight) => { const today = new Date().toLocaleDateString(); const entry = { date: today, weight: newWeight }; const hist = appState.weightHistory.filter(e => e.date !== today); const updated = [...hist, entry].sort((a,b) => new Date(a.date) - new Date(b.date)); const start = appState.startingWeight === 0 ? newWeight : appState.startingWeight; updateAppState({ startingWeight: start, currentWeight: newWeight, weightHistory: updated }); };
  const addPhotoEntry = (photoUrl) => { const today = new Date().toLocaleDateString(); const photo = { date: today, url: photoUrl }; const updated = [...appState.photos, photo].sort((a,b) => new Date(a.date) - new Date(b.date)); updateAppState({ photos: updated }); };

  const completeWorkout = (dateString, scheduleId, stats) => {
    setAppState(prev => {
      const newSchedule = { ...prev.workoutSchedule };
      const daySchedule = (newSchedule[dateString] || []).map(item => {
        if (item.scheduleId === scheduleId) {
          return { ...item, completedData: stats };
        }
        return item;
      });
      newSchedule[dateString] = daySchedule;

      return {
        ...prev,
        workoutSchedule: newSchedule,
        totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1,
        totalSets: prev.totalSets + (stats.sets || 0),
        totalReps: prev.totalReps + (stats.reps || 0),
        totalLbsLifted: prev.totalLbsLifted + (stats.weight || 0),
        showConfetti: true,
      };
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
      autoScheduleProgram,
      updateOneRepMax,
      toggleUnitSystem,
      hasExerciseDetails,
      getPreviousExercisePerformance,
      getPreviousBlockPerformance,
      removeWorkoutFromSchedule, 
      openInfoModal,
      closeInfoModal,
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