// src/context/AppContext.jsx

import React, { useState, useEffect, createContext, useContext } from 'react';
import { db, auth } from '../firebase/config.js';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
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
  isPremiumModalOpen: false,
  stripeCustomerId: null,
  subscriptionId: null,
  subscriptionStatus: null,
  subscriptionPriceId: null,
  subscriptionCurrentPeriodEnd: null,
  subscriptionCancelAtPeriodEnd: false,
  subscriptionEndDate: null,
};

const saveToFirestore = async (uid, data) => {
  if (!uid) return;
  try {
    const {
      isModalOpen, modalContent, showConfetti,
      isWorkoutEditorOpen, editingInfo, workoutToScheduleId,
      isInfoModalOpen, infoModalContent, isPremiumModalOpen, // NEW: Exclude from saving
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

  const signUp = async (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }
    
    return { email, password };
  };

  const refreshSubscriptionData = async () => {
    if (!currentUser) return;

    try {
      console.log('Refreshing subscription data from Firebase...');
      const cloudData = await loadFromFirestore(currentUser.uid);

      if (cloudData) {
        // Only update subscription-related fields to avoid overwriting local changes
        const periodEnd = cloudData.subscriptionCurrentPeriodEnd 
            ? cloudData.subscriptionCurrentPeriodEnd.toDate() 
            : null;
        
        setAppState(prev => ({
          ...prev,
          isPremium: cloudData.isPremium || false,
          stripeCustomerId: cloudData.stripeCustomerId || null,
          subscriptionId: cloudData.subscriptionId || null,
          subscriptionStatus: cloudData.subscriptionStatus || null,
          subscriptionPriceId: cloudData.subscriptionPriceId || null,
          subscriptionCurrentPeriodEnd: periodEnd,
          subscriptionCancelAtPeriodEnd: cloudData.subscriptionCancelAtPeriodEnd || false,
          subscriptionEndDate: cloudData.subscriptionEndDate || null,
        }));
        console.log('Subscription data refreshed:', {
          isPremium: cloudData.isPremium,
          subscriptionStatus: cloudData.subscriptionStatus,
          subscriptionCancelAtPeriodEnd: cloudData.subscriptionCancelAtPeriodEnd,
          subscriptionCurrentPeriodEnd: periodEnd
        });
      }
    } catch (error) {
      console.error('Error refreshing subscription data:', error);
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

  // NEW: Premium modal functions
  const openPremiumModal = () => {
    updateAppState({ isPremiumModalOpen: true });
  };

  const closePremiumModal = () => {
    updateAppState({ isPremiumModalOpen: false });
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
    // NEW: Check program limit for free users
    const userPrograms = appState.programs.filter(p => !p.isTemplate);
    const isPremium = appState.isPremium || currentUser?.isPremium;
    
    if (!isPremium && userPrograms.length >= 3) {
      openPremiumModal();
      return null; // Don't create the program
    }

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
  
  const loadProgramTemplate = (template) => {
  const existingProgram = appState.programs.find(p => p.id === template.id);
  if (existingProgram) {
    alert(`"${template.name}" is already in your library.`);
    return;
  }
  
  // NEW: Check program limit for free users before loading template
  const userPrograms = appState.programs.filter(p => !p.isTemplate);
  const isPremium = appState.isPremium || currentUser?.isPremium;
  
  if (!isPremium && userPrograms.length >= 3) {
    openPremiumModal();
    return; // Don't load the template
  }
  
  const newProgram = { ...template, isTemplate: false };
  setAppState(prev => ({ ...prev, programs: [...prev.programs, newProgram] }));
};
  
  const saveCustomWorkout = (programId, workout) => {
    setAppState(prev => ({
      ...prev,
      programs: prev.programs.map(program => {
        if (program.id === programId) {
          const existingWorkoutIndex = program.workouts.findIndex(w => w.id === workout.id);
          if (existingWorkoutIndex !== -1) {
            const updatedWorkouts = [...program.workouts];
            updatedWorkouts[existingWorkoutIndex] = workout;
            return { ...program, workouts: updatedWorkouts };
          } else {
            return { ...program, workouts: [...program.workouts, workout] };
          }
        }
        return program;
      })
    }));
  };
  
  const deleteCustomWorkout = (workoutId, programId) => {
    setAppState(prev => ({
      ...prev,
      programs: prev.programs.map(program => 
        program.id === programId 
          ? { ...program, workouts: program.workouts.filter(w => w.id !== workoutId) }
          : program
      )
    }));
  };

const copyCustomWorkout = (programId, workoutId) => {
    setAppState(prev => {
        const programs = JSON.parse(JSON.stringify(prev.programs)); // Deep copy to avoid mutation issues
        const programIndex = programs.findIndex(p => p.id === programId);
        
        if (programIndex === -1) {
            console.error("Program not found for copying workout.");
            return prev; // Return original state if program not found
        }

        const workoutToCopy = programs[programIndex].workouts.find(w => w.id === workoutId);
        if (!workoutToCopy) {
            console.error("Workout not found for copying.");
            return prev; // Return original state if workout not found
        }

        // Create a deep copy of the workout and give it a new identity
        const newWorkout = JSON.parse(JSON.stringify(workoutToCopy));
        newWorkout.id = generateUniqueId();
        newWorkout.name = `${workoutToCopy.name} (Copy)`;

        // IMPORTANT: Regenerate IDs for all nested blocks, exercises, and sets
        newWorkout.blocks.forEach(block => {
            block.id = generateUniqueId();
            if (block.exercises) {
                block.exercises.forEach(exercise => {
                    exercise.id = generateUniqueId();
                    if (exercise.sets) {
                        exercise.sets.forEach(set => {
                            set.id = generateUniqueId();
                        });
                    }
                });
            }
            if (block.minutes) {
                block.minutes.forEach(minute => {
                    minute.id = generateUniqueId();
                });
            }
        });

        // Insert the new workout right after the original one
        const originalWorkoutIndex = programs[programIndex].workouts.findIndex(w => w.id === workoutId);
        programs[programIndex].workouts.splice(originalWorkoutIndex + 1, 0, newWorkout);

        return { ...prev, programs };
    });
};

  // FIXED: Correct parameter order (programId first, workoutId second)
  const openWorkoutEditor = (programId, workoutId = null) => {
    updateAppState({ 
      isWorkoutEditorOpen: true, 
      editingInfo: { programId, workoutId } 
    });
  };

  const closeWorkoutEditor = () => {
    updateAppState({ 
      isWorkoutEditorOpen: false, 
      editingInfo: null 
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

  // RESTORED: Original addWeightEntry function
  const addWeightEntry = (newWeight) => {
    const today = new Date().toLocaleDateString();
    const entry = { date: today, weight: newWeight };
    const updated = [...appState.weightHistory, entry].sort((a,b) => new Date(a.date) - new Date(b.date));
    const start = appState.startingWeight || newWeight;
    updateAppState({ startingWeight: start, currentWeight: newWeight, weightHistory: updated });
  };

  // RESTORED: Original addPhotoEntry function
  const addPhotoEntry = (photoUrl) => {
    const today = new Date().toLocaleDateString();
    const photo = { date: today, url: photoUrl };
    const updated = [...appState.photos, photo].sort((a,b) => new Date(a.date) - new Date(b.date));
    updateAppState({ photos: updated });
  };

  const hasExerciseDetails = (exerciseName) => {
    return !!getExerciseByName(exerciseName);
  };

  const getPreviousExercisePerformance = (exerciseName, date) => {
    return null;
  };

  const getPreviousBlockPerformance = (blockId, date) => {
    return null;
  };

  // RESTORED: Original completeWorkout function
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

  const autoScheduleProgram = (workouts, daysPerWeek = 3) => {
    const workoutsToSchedule = workouts.slice();
    const currentSchedule = { ...appState.workoutSchedule };
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const findNextAvailableDate = (startDate) => {
      let date = new Date(startDate);
      for (let i = 0; i < 365; i++) {
        const dateString = date.toISOString().split('T')[0];
        const daySchedule = currentSchedule[dateString] || [];
        
        if (daysPerWeek < 7) {
          const dayOfWeek = date.getDay();
          const shouldSkip = (daysPerWeek === 3 && [0, 2, 4, 6].includes(dayOfWeek)) || 
                           (daysPerWeek === 4 && [0, 3, 6].includes(dayOfWeek)) || 
                           (daysPerWeek === 5 && [0, 6].includes(dayOfWeek)) || 
                           (daysPerWeek === 6 && dayOfWeek === 0);
          if (shouldSkip || daySchedule.length >= (daysPerWeek >= 5 ? 2 : 1)) {
            date.setDate(date.getDate() + 1);
            continue;
          }
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

  const contextValue = {
    currentUser,
    authLoading,
    signUp,
    logIn,
    logOut,
    appState,
    allWorkouts,
    updateAppState,
    refreshSubscriptionData,
    createProgram,
    copyProgram,
    deleteProgram,
    updateProgram,
    saveCustomWorkout,
    deleteCustomWorkout,
    copyCustomWorkout,
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
    openPremiumModal, // NEW: Added to context
    closePremiumModal, // NEW: Added to context
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