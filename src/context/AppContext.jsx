// src/context/AppContext.jsx

import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { usePersistentState } from '../hooks/usePersistentState.jsx';
import { TimerProvider, TimerContext } from './TimerContext.jsx';
import { initialAppState } from './appState/initialState.js';
import { saveToFirestore, loadFromFirestore } from './appState/firestoreSync.js';
import { useUIActions } from './actions/useUIActions.js';
import { useAuthActions } from './actions/useAuthActions.js';
import { useProgramActions } from './actions/useProgramActions.js';
import { useScheduleActions } from './actions/useScheduleActions.js';
import { useProgressActions } from './actions/useProgressActions.js';
import { useFriendActions } from './actions/useFriendActions.js';
import { useExerciseActions } from './actions/useExerciseActions.js';

export const AppStateContext = createContext();
export const ThemeContext = createContext();

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

  const uiActions = useUIActions({ updateAppState, setAppState, customExercises: appState.customExercises });
  const authActions = useAuthActions({ appState, setAppState, updateAppState, currentUser, clearTimer, clearLocalState });
  const programActions = useProgramActions({ appState, setAppState, currentUser, openPremiumModal: uiActions.openPremiumModal });
  const scheduleActions = useScheduleActions({ appState, setAppState, updateAppState });
  const progressActions = useProgressActions({ setAppState });
  const friendActions = useFriendActions({ appState, currentUser, updateAppState });
  const exerciseActions = useExerciseActions({ setAppState });

  const contextValue = useMemo(() => ({
    currentUser, authLoading, appState, updateAppState,
    ...uiActions,
    ...authActions,
    ...programActions,
    ...scheduleActions,
    ...progressActions,
    ...friendActions,
    ...exerciseActions,
  }), [
    currentUser, authLoading, appState, updateAppState,
    uiActions, authActions, programActions, scheduleActions, progressActions, friendActions, exerciseActions,
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