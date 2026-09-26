// src/context/actions/useAuthActions.js

import { useCallback, useMemo } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { db, auth } from '../../firebase/config.js';
import { loadFromFirestore } from '../appState/firestoreSync.js';
import { initialAppState } from '../appState/initialState.js';

export const useAuthActions = ({ appState, setAppState, updateAppState, currentUser, clearTimer, clearLocalState }) => {
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

  const resetAllData = useCallback(() => {
    clearLocalState();
    setAppState(initialAppState);
  }, [clearLocalState, setAppState]);

  return useMemo(() => ({
    signUp, logIn, logOut, refreshSubscriptionData, updateUserPremiumStatus, resetAllData,
  }), [
    signUp, logIn, logOut, refreshSubscriptionData, updateUserPremiumStatus, resetAllData,
  ]);
};