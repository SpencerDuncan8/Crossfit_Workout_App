// src/context/AppContext.jsx

import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
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
  totalCardioMinutes: 0,
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
  // --- NEW FIELD FOR SOCIAL FEATURES ---
  username: null, 
  friends: [],
friendRequestsSent: [],
friendRequestsReceived: [],
};

const saveToFirestore = async (uid, data) => {
  if (!uid) return;
  try {
    const {
      isModalOpen, modalContent, showConfetti,
      isWorkoutEditorOpen, editingInfo, workoutToScheduleId,
      isInfoModalOpen, infoModalContent, isPremiumModalOpen,
      ...saveableData
    } = data;
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, saveableData, { merge: true }); // Use merge to be safe
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
          // Convert Firestore Timestamps back to JS Dates
          const convertedData = { ...cloudData };
          if (convertedData.subscriptionCurrentPeriodEnd && convertedData.subscriptionCurrentPeriodEnd.toDate) {
            convertedData.subscriptionCurrentPeriodEnd = convertedData.subscriptionCurrentPeriodEnd.toDate();
          }
          setAppState(prev => ({ ...prev, ...convertedData }));
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [setAppState]); // setAppState dependency is stable

  useEffect(() => {
    if (authLoading || !currentUser) return;
    const handler = setTimeout(() => {
      saveToFirestore(currentUser.uid, appState);
    }, 1500);
    return () => clearTimeout(handler);
  }, [appState, currentUser, authLoading]);

  const updateAppState = useCallback((updates) => {
    setAppState(prev => ({ ...prev, ...updates }));
  }, [setAppState]);

  const signUp = useCallback(async (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('Invalid email format');
    if (password.length < 6) throw new Error('Password should be at least 6 characters');
    return { email, password };
  }, []);

  const refreshSubscriptionData = useCallback(async () => {
    if (!currentUser) return;
    try {
      const cloudData = await loadFromFirestore(currentUser.uid);
      if (cloudData) {
        const periodEnd = cloudData.subscriptionCurrentPeriodEnd?.toDate ? cloudData.subscriptionCurrentPeriodEnd.toDate() : null;
        updateAppState({
          isPremium: cloudData.isPremium || false,
          stripeCustomerId: cloudData.stripeCustomerId || null,
          subscriptionId: cloudData.subscriptionId || null,
          subscriptionStatus: cloudData.subscriptionStatus || null,
          subscriptionCurrentPeriodEnd: periodEnd,
          subscriptionCancelAtPeriodEnd: cloudData.subscriptionCancelAtPeriodEnd || false,
        });
      }
    } catch (error) {
      console.error('Error refreshing subscription data:', error);
    }
  }, [currentUser, updateAppState]);
  
  const logIn = useCallback((email, password) => {
    if (appState.totalWorkoutsCompleted > 0 || appState.programs.length > 0) {
        const wantsToOverwrite = window.confirm(
            "You have unsynced local data. Logging in will replace this local data with your saved cloud data. Are you sure you want to continue?"
        );
        if (!wantsToOverwrite) throw new Error("Login cancelled by user.");
    }
    return signInWithEmailAndPassword(auth, email, password);
  }, [appState.totalWorkoutsCompleted, appState.programs.length]);
  
  const logOut = useCallback(async () => {
    await signOut(auth);
    clearTimer();
    setAppState(initialAppState);
  }, [clearTimer, setAppState]);

  const updateUserPremiumStatus = useCallback(async (uid, status) => {
    if (!uid) return;
    try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, { isPremium: status });
        updateAppState({ isPremium: status });
    } catch (error) {
        console.error("Error updating premium status:", error);
    }
  }, [updateAppState]);

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
  
  const allWorkouts = useMemo(() => appState.programs.flatMap(p => p.workouts), [appState.programs]);
  
  const updateOneRepMax = useCallback((exerciseId, weight) => {
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) return;
    setAppState(prev => ({...prev, oneRepMaxes: {...prev.oneRepMaxes, [exerciseId]: numericWeight, }}));
  }, [setAppState]);
  
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
    setAppState(prev => ({ ...prev, programs: prev.programs.filter(p => p.id !== programId) }));
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
      setAppState(prev => ({...prev, programs}));
  }, [appState.programs, setAppState]);

  const openWorkoutEditor = useCallback((programId, workoutId = null) => {
    updateAppState({ isWorkoutEditorOpen: true, editingInfo: { programId, workoutId } });
  }, [updateAppState]);

  const closeWorkoutEditor = useCallback(() => {
    updateAppState({ isWorkoutEditorOpen: false, editingInfo: null });
  }, [updateAppState]);

  const openExerciseModal = useCallback((exerciseId) => {
    const exerciseData = getExerciseByName(exerciseId);
    if (exerciseData) updateAppState({ isModalOpen: true, modalContent: exerciseData });
  }, [updateAppState]);

  const closeModal = useCallback(() => {
    updateAppState({ isModalOpen: false, modalContent: null });
  }, [updateAppState]);

  const addWeightEntry = useCallback((newWeight) => {
    const today = new Date().toLocaleDateString();
    const entry = { date: today, weight: newWeight };
    setAppState(prev => {
        const updated = [...prev.weightHistory, entry].sort((a,b) => new Date(a.date) - new Date(b.date));
        const start = prev.startingWeight || newWeight;
        return { ...prev, startingWeight: start, currentWeight: newWeight, weightHistory: updated };
    });
  }, [setAppState]);

  const addPhotoEntry = useCallback((photoUrl) => {
    const today = new Date().toLocaleDateString();
    const photo = { date: today, url: photoUrl };
    setAppState(prev => {
        const updated = [...prev.photos, photo].sort((a,b) => new Date(a.date) - new Date(b.date));
        return { ...prev, photos: updated };
    });
  }, [setAppState]);

  const hasExerciseDetails = useCallback((exerciseId) => !!getExerciseByName(exerciseId), []);

    const getPreviousExercisePerformance = useCallback((exerciseId, currentDateString) => {
    if (!exerciseId) return null;

    // Search backwards through dates to find the most recent performance
    const completedWorkouts = Object.entries(appState.workoutSchedule)
      .filter(([date]) => date < currentDateString)
      .flatMap(([date, schedule]) => schedule.filter(item => item.completedData).map(item => ({...item, date})))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const completed of completedWorkouts) {
      const detailedProgress = completed.completedData?.detailedProgress;
      if (detailedProgress) {
        // Find the specific exercise progress within that completed workout
        for (const progressKey in detailedProgress) {
          if (progressKey.endsWith(`-${exerciseId}`)) {
            const exerciseProgress = detailedProgress[progressKey];
            // --- THIS IS THE FIX ---
            // If we find the exercise and it has sets, return the entire progress object for it.
            // This object contains the full array of `sets`.
            if (exerciseProgress && exerciseProgress.sets) {
              return exerciseProgress; 
            }
            // --- END OF FIX ---
          }
        }
      }
    }
    return null; // Return null if no previous performance was found
  }, [appState.workoutSchedule]);
  
  const getPreviousBlockPerformance = useCallback((blockId, blockType, currentDateString) => {
      if (!blockId) return null;

      const completedWorkouts = Object.entries(appState.workoutSchedule)
          .filter(([date, schedule]) => date < currentDateString && schedule.some(item => item.completedData))
          .flatMap(([date, schedule]) => schedule.filter(item => item.completedData))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

      for (const completed of completedWorkouts) {
          const blockTimes = completed.completedData?.blockTimes;
          if (blockTimes && blockTimes[blockId]) {
              const result = blockTimes[blockId];
              if (result.recordedTime) {
                  return { type: 'TIME', time: result.recordedTime };
              }
              if (result.score) {
                  return { type: 'SCORE', score: result.score, rounds: result.rounds };
              }
          }
      }
      return null;
  }, [appState.workoutSchedule]);
  
  const completeWorkout = useCallback((dateString, scheduleId, stats, callback) => {
    setAppState(prev => {
      // Find the definition of the workout that was just completed.
      const workoutDef = prev.programs.flatMap(p => p.workouts).find(w => {
          const daySchedule = prev.workoutSchedule[dateString] || [];
          const scheduleEntry = daySchedule.find(item => item.scheduleId === scheduleId);
          return scheduleEntry && w.id === scheduleEntry.workoutId;
      });

      // --- START OF NEW LOGIC ---
      // Calculate total cardio minutes from this specific workout.
      let cardioMinutes = 0;
      if (workoutDef) {
        const cardioBlocks = workoutDef.blocks.filter(b => b.type === 'Cardio');
        for (const block of cardioBlocks) {
          if (block.exercises) {
            for (const exercise of block.exercises) {
              cardioMinutes += parseInt(exercise.duration, 10) || 0;
            }
          }
        }
      }
      // --- END OF NEW LOGIC ---

      const newSchedule = { ...prev.workoutSchedule };
      const daySchedule = (newSchedule[dateString] || []).map(item => 
        item.scheduleId === scheduleId ? { ...item, completedData: stats } : item
      );
      newSchedule[dateString] = daySchedule;
      
      return { 
        ...prev, 
        workoutSchedule: newSchedule, 
        totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1, 
        totalSets: prev.totalSets + (stats.sets || 0), 
        totalReps: prev.totalReps + (stats.reps || 0), 
        totalLbsLifted: prev.totalLbsLifted + (stats.weight || 0),
        totalCardioMinutes: (prev.totalCardioMinutes || 0) + cardioMinutes, // <-- ADD THIS LINE
        showConfetti: true, 
      };
    });

    if (callback) {
      callback();
    }
    setTimeout(() => updateAppState({ showConfetti: false }), 5000);
  }, [setAppState, updateAppState]);

  const resetAllData = useCallback(() => {
      clearLocalState();
      setAppState(initialAppState);
  }, [clearLocalState, setAppState]);
  
  const scheduleWorkoutForDate = useCallback((date, workoutId) => {
    const dateString = date.toISOString().split('T')[0];
    const newEntry = { workoutId, scheduleId: generateUniqueId() };
    setAppState(prev => {
      const newSchedule = { ...prev.workoutSchedule };
      if (!newSchedule[dateString]) newSchedule[dateString] = [];
      newSchedule[dateString] = [...newSchedule[dateString], newEntry];
      return { ...prev, workoutSchedule: newSchedule, workoutToScheduleId: null };
    });
  }, [setAppState]);
  
  const navigateToDate = useCallback((dateString, scheduleId = null) => {
    updateAppState({ viewingDate: dateString, viewingScheduleId: scheduleId });
  }, [updateAppState]);
  
  const getScheduledDates = useCallback(() => {
    return Object.keys(appState.workoutSchedule)
      .filter(date => appState.workoutSchedule[date]?.length > 0)
      .sort();
  }, [appState.workoutSchedule]);

  const navigateToPrevScheduled = useCallback(() => {
    const dates = getScheduledDates(); 
    const currentIndex = dates.indexOf(appState.viewingDate);
    if (currentIndex > 0) { 
      const prevDateString = dates[currentIndex - 1]; 
      const prevDaySchedule = appState.workoutSchedule[prevDateString]; 
      if (prevDaySchedule?.length > 0) { 
        navigateToDate(prevDateString, prevDaySchedule[0].scheduleId); 
      } 
    }
  }, [getScheduledDates, appState.viewingDate, appState.workoutSchedule, navigateToDate]);
  
  const navigateToNextScheduled = useCallback(() => {
    const dates = getScheduledDates(); 
    const currentIndex = dates.indexOf(appState.viewingDate);
    if (currentIndex > -1 && currentIndex < dates.length - 1) { 
      const nextDateString = dates[currentIndex + 1]; 
      const nextDaySchedule = appState.workoutSchedule[nextDateString]; 
      if (nextDaySchedule?.length > 0) { 
        navigateToDate(nextDateString, nextDaySchedule[0].scheduleId); 
      } 
    }
  }, [getScheduledDates, appState.viewingDate, appState.workoutSchedule, navigateToDate]);
  
  const selectWorkoutToSchedule = useCallback((workoutId) => {
    updateAppState({ workoutToScheduleId: workoutId });
  }, [updateAppState]);
  
  const clearWorkoutToSchedule = useCallback(() => {
    updateAppState({ workoutToScheduleId: null });
  }, [updateAppState]);

  const removeWorkoutFromSchedule = useCallback((date, scheduleId) => {
    const dateString = date.toISOString().split('T')[0];
    setAppState(prev => {
      const daySchedule = (prev.workoutSchedule[dateString] || []).filter(item => item.scheduleId !== scheduleId);
      const newSchedule = { ...prev.workoutSchedule };
      if (daySchedule.length > 0) newSchedule[dateString] = daySchedule; 
      else delete newSchedule[dateString]; 
      return { ...prev, workoutSchedule: newSchedule };
    });
  }, [setAppState]);

  const autoScheduleProgram = useCallback((workouts, selectedDays) => {
    if (!selectedDays || selectedDays.length === 0) return;
    setAppState(prev => {
        const newSchedule = { ...prev.workoutSchedule };
        let scheduleDate = new Date();
        scheduleDate.setHours(0, 0, 0, 0);
        for (const workout of workouts) {
            while (true) {
                const dayOfWeek = scheduleDate.getDay();
                const dateString = scheduleDate.toISOString().split('T')[0];
                const dayIsOccupied = newSchedule[dateString]?.length > 0;
                if (selectedDays.includes(dayOfWeek) && !dayIsOccupied) {
                    newSchedule[dateString] = [{ workoutId: workout.id, scheduleId: generateUniqueId() }];
                    break;
                }
                scheduleDate.setDate(scheduleDate.getDate() + 1);
            }
            scheduleDate.setDate(scheduleDate.getDate() + 1);
        }
        return { ...prev, workoutSchedule: newSchedule };
    });
  }, [setAppState]);

 const sendFriendRequest = useCallback(async (receiverUid) => {
     if (!currentUser) throw new Error("Not logged in.");

     const response = await fetch('/api/sendFriendRequest', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ senderUid: currentUser.uid, receiverUid }),
     });

     const data = await response.json();
     if (!response.ok) {
         throw new Error(data.error || 'Failed to send friend request.');
     }

     // Optimistically update local state for instant feedback
     updateAppState({
         friendRequestsSent: [...(appState.friendRequestsSent || []), receiverUid]
     });
     
     return data; // Return success data
 }, [currentUser, appState.friendRequestsSent, updateAppState]);

  const handleFriendRequest = useCallback(async (requesterUid, action) => {
     if (!currentUser) throw new Error("Not logged in.");

     const response = await fetch('/api/handleFriendRequest', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ currentUserUid: currentUser.uid, requesterUid, action }),
     });

     const data = await response.json();
     if (!response.ok) {
         throw new Error(data.error || `Failed to ${action} request.`);
     }

     // Optimistically update local state
     const updatedRequests = (appState.friendRequestsReceived || []).filter(uid => uid !== requesterUid);
     if (action === 'accept') {
         const updatedFriends = [...(appState.friends || []), requesterUid];
         updateAppState({
             friendRequestsReceived: updatedRequests,
             friends: updatedFriends,
         });
     } else { // decline
         updateAppState({
             friendRequestsReceived: updatedRequests,
         });
     }

     return data;
}, [currentUser, appState.friendRequestsReceived, appState.friends, updateAppState]);
  
  const contextValue = useMemo(() => ({
    currentUser, authLoading, signUp, logIn, logOut, appState, allWorkouts,
    updateAppState, refreshSubscriptionData, createProgram, copyProgram,
    deleteProgram, updateProgram, saveCustomWorkout, deleteCustomWorkout,
    copyCustomWorkout, openWorkoutEditor, loadProgramTemplate, closeWorkoutEditor,
    openExerciseModal, closeModal, addWeightEntry, addPhotoEntry,
    completeWorkout, resetAllData, scheduleWorkoutForDate, navigateToDate,
    navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates,
    selectWorkoutToSchedule, clearWorkoutToSchedule, autoScheduleProgram,
    updateOneRepMax, toggleUnitSystem, hasExerciseDetails,
    getPreviousExercisePerformance, getPreviousBlockPerformance,
    removeWorkoutFromSchedule, openInfoModal, closeInfoModal,
    openPremiumModal, closePremiumModal, updateUserPremiumStatus,
    sendFriendRequest,
    handleFriendRequest,
  }), [
    currentUser, authLoading, signUp, logIn, logOut, appState, allWorkouts,
    updateAppState, refreshSubscriptionData, createProgram, copyProgram,
    deleteProgram, updateProgram, saveCustomWorkout, deleteCustomWorkout,
    copyCustomWorkout, openWorkoutEditor, loadProgramTemplate, closeWorkoutEditor,
    openExerciseModal, closeModal, addWeightEntry, addPhotoEntry,
    completeWorkout, resetAllData, scheduleWorkoutForDate, navigateToDate,
    navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates,
    selectWorkoutToSchedule, clearWorkoutToSchedule, autoScheduleProgram,
    updateOneRepMax, toggleUnitSystem, hasExerciseDetails,
    removeWorkoutFromSchedule, openInfoModal, closeInfoModal,
    openPremiumModal, closePremiumModal, updateUserPremiumStatus,
    sendFriendRequest,
handleFriendRequest,
  ]);

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