// src/context/AppContext.jsx

import React, { useState, useEffect, createContext } from 'react';
import { getExerciseByName } from '../data/exerciseDatabase.js';

export const ThemeContext = createContext();
export const AppStateContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => { document.body.className = darkMode ? 'dark-theme' : 'light-theme'; }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);
  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    currentDay: 1, currentWeek: 1, startingWeight: 0, currentWeight: 0,
    workoutsCompleted: [], currentStreak: 0, weightHistory: [], photos: [],
    totalLbsLifted: 0, totalReps: 0, totalSets: 0,
    timer: { isActive: false, type: null, key: 0, duration: 0, time: 0, tabata: { totalRounds: 0, currentRound: 0, isWorkPhase: true, }, emom: { totalMinutes: 0, currentMinute: 0, } },
    isModalOpen: false, modalContent: null,
    showConfetti: false,
  });

  const updateAppState = (updates) => setAppState(prev => ({ ...prev, ...updates }));

  const startTimer = ({ type, duration = 0, tabataRounds = 8 }) => {
    setAppState(prev => {
      let newTimerState = { isActive: true, type: type, key: prev.timer.key + 1, duration: duration, time: 0, tabata: { totalRounds: 0, currentRound: 0, isWorkPhase: true }, emom: { totalMinutes: 0, currentMinute: 0 } };
      if (type === 'countdown') newTimerState.time = duration;
      if (type === 'emom') { newTimerState.time = 60; newTimerState.emom = { totalMinutes: duration / 60, currentMinute: 1 }; }
      if (type === 'tabata') { newTimerState.time = 20; newTimerState.tabata = { totalRounds: tabataRounds, currentRound: 1, isWorkPhase: true }; }
      return { ...prev, timer: newTimerState };
    });
  };

  const stopTimer = () => setAppState(prev => ({ ...prev, timer: { ...prev.timer, isActive: false } }));

  useEffect(() => {
    if (!appState.timer.isActive) return;
    const interval = setInterval(() => {
      setAppState(prev => {
        const timer = { ...prev.timer };
        if (!timer.isActive) { clearInterval(interval); return prev; }
        switch (timer.type) {
          case 'countdown': timer.time -= 1; if (timer.time < 0) { timer.isActive = false; timer.time = 0; } break;
          case 'stopwatch': timer.time += 1; break;
          case 'emom': timer.time -= 1; if (timer.time < 0) { timer.emom.currentMinute += 1; if (timer.emom.currentMinute > timer.emom.totalMinutes) { timer.isActive = false; } else { timer.time = 59; } } break;
          case 'tabata': timer.time -= 1; if (timer.time < 0) { const nextIsWork = !timer.tabata.isWorkPhase; if (nextIsWork) { timer.tabata.currentRound += 1; if (timer.tabata.currentRound > timer.tabata.totalRounds) { timer.isActive = false; } else { timer.tabata.isWorkPhase = true; timer.time = 20; } } else { timer.tabata.isWorkPhase = false; timer.time = 10; } } break;
          default: break;
        }
        return { ...prev, timer };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [appState.timer.isActive, appState.timer.key]);

  const openExerciseModal = (exerciseId) => { const details = getExerciseByName(exerciseId); if(details) setAppState(p => ({...p, isModalOpen: true, modalContent: details}))};
  const closeModal = () => setAppState(prev => ({ ...prev, isModalOpen: false, }));
  const addWeightEntry = (newWeight) => { setAppState(p => { const first = p.weightHistory.length === 0; const start = first ? newWeight : p.startingWeight; const entry = {day: p.currentDay, weight: newWeight}; const hist = p.weightHistory.filter(e => e.day !== p.currentDay); const updated = [...hist, entry].sort((a,b) => a.day - b.day); return {...p, startingWeight: start, currentWeight: newWeight, weightHistory: updated};})};
  const addPhotoEntry = (photoUrl) => { setAppState(p => { const photo = {day: p.currentDay, url: photoUrl}; const updated = [...p.photos, photo].sort((a,b)=>a.day-b.day); return {...p, photos: updated};})};

  const completeWorkout = (stats) => {
    setAppState(prev => ({
      ...prev,
      totalSets: prev.totalSets + stats.sets,
      totalReps: prev.totalReps + stats.reps,
      totalLbsLifted: prev.totalLbsLifted + stats.weight,
      workoutsCompleted: [...prev.workoutsCompleted, prev.currentDay],
      currentStreak: prev.currentStreak + 1,
      currentDay: prev.currentDay + 1,
      currentWeek: Math.ceil((prev.currentDay + 1) / 7),
      showConfetti: true,
    }));
    setTimeout(() => {
      setAppState(prev => ({ ...prev, showConfetti: false }));
    }, 5000);
  };

  return (
    <AppStateContext.Provider value={{ 
      appState, updateAppState, startTimer, stopTimer,
      openExerciseModal, closeModal, addWeightEntry, addPhotoEntry,
      completeWorkout
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const AppProviders = ({ children }) => {
  return ( <ThemeProvider><AppStateProvider>{children}</AppStateProvider></ThemeProvider> );
};