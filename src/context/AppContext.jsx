// src/context/AppContext.jsx

import React, { useState, useEffect, createContext, useContext } from 'react';
import { db, auth } from '../firebase/config.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { usePersistentState } from '../hooks/usePersistentState.jsx';
import { getExerciseByName } from '../data/exerciseDatabase.js';
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
  isPremium: false,
};

const saveToFirestore = async (uid, data) => {
  if (!uid) return;
  try {
    const {
      isModalOpen, modalContent, showConfetti,
      isWorkoutEditorOpen, editingInfo, workoutToScheduleId,
      isInfoModalOpen, infoModalContent,
      ...saveableData
    } = data;
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, saveableData);
  } catch (error) {
    console.error("Error saving to Firestore:", error);
  }
};

const loadFromFirestore = async (uid) => {
  if (!uid) return null;
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

const AppStateProviderComponent = ({ children }) => {
  const [appState, setAppState, clearLocalState] = usePersistentState('blockfitState_v2_multi', initialAppState);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { clearTimer } = useContext(TimerContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const cloudData = await loadFromFirestore(user.uid);
        if (cloudData) {
          setAppState(prev => ({ ...prev, ...cloudData }));
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []); 

  useEffect(() => {
    if (authLoading || !currentUser) return;
    const handler = setTimeout(() => {
      saveToFirestore(currentUser.uid, appState);
    }, 1500);
    return () => clearTimeout(handler);
  }, [appState, currentUser, authLoading]);

  // MODIFIED: signUp no longer creates Firebase user - just validates email/password
  const signUp = async (email, password) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    
    // Validate password strength
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }
    
    // Don't create Firebase user yet - just return success
    return { email, password };
  };

  // NEW: Create Firebase user only after successful payment
  const createUserAfterPayment = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Migrate local data to cloud and set premium status
      const dataToSave = { ...appState, isPremium: true };
      await saveToFirestore(user.uid, dataToSave);
      
      console.log('User created and premium status set after payment');
      return userCredential;
    } catch (error) {
      console.error('Error creating user after payment:', error);
      throw error;
    }
  };

  const logIn = (email, password) => {
    if (appState.totalWorkoutsCompleted > 0 || appState.programs.length > 0) {
        const wantsToOverwrite = window.confirm(
            "You have unsynced local data. Logging in will replace this local data with your saved cloud data. Are you sure you want to continue?"
        );
        if (!wantsToOverwrite) {
            throw new Error("Login cancelled by user.");
        }
    }
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const logOut = async () => {
    await signOut(auth);
    clearTimer();
    setAppState(initialAppState);
  };

  const updateUserPremiumStatus = async (uid, status) => {
    if (!uid) return;
    try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, { isPremium: status });
        updateAppState({ isPremium: status });
        console.log(`User ${uid} premium status updated to ${status}`);
    } catch (error) {
        console.error("Error updating premium status:", error);
    }
  };

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
    setAppState(prev => ({...prev, oneRepMaxes: {...prev.oneRepMaxes, [exerciseId]: numericWeight, }}));
  };
  
  const createProgram = (name) => {
    const newProgram = { id: generateUniqueId(), name: name, description: "A collection of your custom workouts.", workouts: [], isTemplate: false };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
    return newProgram.id;
  };
  
  const copyProgram = (programToCopy) => {
    const newProgram = { ...JSON.parse(JSON.stringify(programToCopy)), id: generateUniqueId(), name: `${programToCopy.name} (Copy)`, isTemplate: false };
    setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
    alert(`"${programToCopy.name}" was copied to your programs.`);
  };
  
  const deleteProgram = (programId) => {
    setAppState(prev => ({ ...prev, programs: prev.programs.filter(p => p.id !== programId) }));
  };
  
  const updateProgram = (programId, updates) => {
    setAppState(prev => ({ ...prev, programs: prev.programs.map(p => p.id === programId ? { ...p, ...updates } : p) }));
  };
  
  const saveCustomWorkout = (programId, workoutToSave) => {
    setAppState(prev => {
        const updatedPrograms = prev.programs.map(program => {
            if (program.id === programId) {
                const newProgram = { ...program };
                const workoutIndex = newProgram.workouts.findIndex(w => w.id === workoutToSave.id);
                if (workoutIndex > -1) { newProgram.workouts[workoutIndex] = workoutToSave; } else { newProgram.workouts.push(workoutToSave); }
                return newProgram;
            }
            return program;
        });
        return { ...prev, programs: updatedPrograms };
    });
  };
  
  // FIXED: This function now works correctly again
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
            if (program.id === programId) { return { ...program, workouts: program.workouts.filter(w => w.id !== workoutId) }; }
            return program;
        });
        return { ...prev, programs: updatedPrograms };
    });
  };
  
  const openWorkoutEditor = (programId, workoutId) => { updateAppState({ isWorkoutEditorOpen: true, editingInfo: { programId, workoutId } }); };
  const closeWorkoutEditor = () => { updateAppState({ isWorkoutEditorOpen: false, editingInfo: null }); };
  
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
      const daySchedule = currentSchedule[dateString] ? currentSchedule[dateString] : [];
      const newEntry = { workoutId: workout.id, scheduleId: generateUniqueId() };
      currentSchedule[dateString] = [...daySchedule, newEntry];
      
      workoutIndex++;
      if (workoutIndex < workoutsToSchedule.length) {
        scheduleDate.setDate(scheduleDate.getDate() + 1);
        scheduleDate = findNextAvailableDate(scheduleDate);
      }
    }
    
    updateAppState({ workoutSchedule: currentSchedule });
  };
  
  const resetAllData = () => {
    if (window.confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      clearLocalState();
      setAppState(initialAppState);
    }
  };
  
  const scheduleWorkoutForDate = (date, workoutId) => {
    const dateString = date.toISOString().split('T')[0];
    const scheduleId = generateUniqueId();
    const newEntry = { workoutId, scheduleId };
    
    setAppState(prev => {
      const newSchedule = { ...prev.workoutSchedule };
      if (!newSchedule[dateString]) {
        newSchedule[dateString] = [];
      }
      newSchedule[dateString] = [...newSchedule[dateString], newEntry];
      return { ...prev, workoutSchedule: newSchedule, workoutToScheduleId: null };
    });
  };
  
  const navigateToDate = (dateString, scheduleId = null) => {
    updateAppState({ viewingDate: dateString, viewingScheduleId: scheduleId });
  };
  
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
  
  const getScheduledDates = () => {
    return Object.keys(appState.workoutSchedule).filter(date => 
      appState.workoutSchedule[date] && appState.workoutSchedule[date].length > 0
    ).sort();
  };
  
  const selectWorkoutToSchedule = (workoutId) => {
    updateAppState({ workoutToScheduleId: workoutId });
  };
  
  const clearWorkoutToSchedule = () => {
    updateAppState({ workoutToScheduleId: null });
  };
  
  const hasExerciseDetails = (exerciseName) => {
    return !!getExerciseByName(exerciseName);
  };
  
  const getPreviousExercisePerformance = (exerciseId, currentDate) => {
    const sortedDates = Object.keys(appState.workoutSchedule).sort((a, b) => new Date(b) - new Date(a)); 
    const currentViewDate = new Date(currentDate);
    
    for (const date of sortedDates) {
      const loopDate = new Date(date);
      if (loopDate < currentViewDate) { 
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
    return null;
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
        
        if (blockType === 'Conditioning: AMRAP' && blockData.score) {
          if (!bestPerformance || blockData.score > bestPerformance.score) {
            bestPerformance = blockData;
          }
        } else if ((blockType === 'Conditioning: RFT' || blockType === 'Conditioning: Chipper') && blockData.time) {
          const currentTime = parseTimeToSeconds(blockData.time);
          const bestTime = bestPerformance ? parseTimeToSeconds(bestPerformance.time) : Infinity;
          if (currentTime < bestTime) {
            bestPerformance = blockData;
          }
        }
      }
    }
    return bestPerformance;
  };
  
  const removeWorkoutFromSchedule = (dateString, scheduleId) => {
    setAppState(prev => {
      const newSchedule = { ...prev.workoutSchedule };
      if (newSchedule[dateString]) {
        newSchedule[dateString] = newSchedule[dateString].filter(item => item.scheduleId !== scheduleId);
        if (newSchedule[dateString].length === 0) {
          delete newSchedule[dateString];
        }
      }
      return { ...prev, workoutSchedule: newSchedule };
    });
  };
  
  const openExerciseModal = (exerciseName) => {
    const exerciseData = getExerciseByName(exerciseName);
    if (exerciseData) {
      updateAppState({ isModalOpen: true, modalContent: exerciseData });
    }
  };
  
  const closeModal = () => {
    updateAppState({ isModalOpen: false, modalContent: null });
  };
  
  const addWeightEntry = (newWeight) => {
    const today = new Date().toLocaleDateString();
    const entry = { date: today, weight: newWeight };
    const updated = [...appState.weightHistory, entry].sort((a,b) => new Date(a.date) - new Date(b.date));
    const start = appState.startingWeight || newWeight;
    updateAppState({ startingWeight: start, currentWeight: newWeight, weightHistory: updated });
  };
  
  const addPhotoEntry = (photoUrl) => {
    const today = new Date().toLocaleDateString();
    const photo = { date: today, url: photoUrl };
    const updated = [...appState.photos, photo].sort((a,b) => new Date(a.date) - new Date(b.date));
    updateAppState({ photos: updated });
  };
  
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

  const contextValue = {
    currentUser,
    authLoading,
    signUp,
    createUserAfterPayment,
    logIn,
    logOut,
    appState,
    allWorkouts,
    updateAppState,
    createProgram,
    copyProgram,
    deleteProgram,
    updateProgram,
    saveCustomWorkout,
    deleteCustomWorkout,
    openWorkoutEditor,
    loadProgramTemplate,
    closeWorkoutEditor,
    openExerciseModal,
    closeModal,
    addWeightEntry,
    addPhotoEntry,
    completeWorkout,
    resetAllData,
    scheduleWorkoutForDate,
    navigateToDate,
    navigateToPrevScheduled,
    navigateToNextScheduled,
    getScheduledDates,
    selectWorkoutToSchedule,
    clearWorkoutToSchedule,
    autoScheduleProgram,
    updateOneRepMax,
    toggleUnitSystem,
    hasExerciseDetails,
    getPreviousExercisePerformance,
    getPreviousBlockPerformance,
    removeWorkoutFromSchedule,
    openInfoModal,
    closeInfoModal,
    updateUserPremiumStatus,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
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