// src/context/appState/firestoreSync.js

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import { reportSaveStatus } from '../../utils/saveStatus.js';

// Turns a Firestore error into a short label the warning banner understands.
export const classifySaveError = (error) => {
  const code = String(error?.code || '').toLowerCase();
  const message = String(error?.message || '').toLowerCase();

  if (
    message.includes('exceeds the maximum') ||
    message.includes('maximum allowed size') ||
    message.includes('cannot be written because its size') ||
    message.includes('too large')
  ) return 'too-large';
  if (code.includes('permission-denied')) return 'permission';
  if (code.includes('resource-exhausted')) return 'quota';
  if (code.includes('unauthenticated')) return 'signed-out';
  return 'unknown';
};

export const saveToFirestore = async (uid, data) => {
  if (!uid) return;
  try {
    const {
      isModalOpen, modalContent, showConfetti,
      isWorkoutEditorOpen, editingInfo, workoutToScheduleId,
      isInfoModalOpen, infoModalContent, isPremiumModalOpen,
      // Billing and social fields are owned by the SERVER (Stripe webhook / API endpoints).
      // The browser must never write them, or a user could grant themselves premium or friends.
      isPremium, stripeCustomerId, subscriptionId, subscriptionStatus, subscriptionPriceId,
      subscriptionCurrentPeriodEnd, subscriptionCancelAtPeriodEnd, subscriptionEndDate,
      username, friends, friendRequestsSent, friendRequestsReceived,
      ...saveableData
    } = data;
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, saveableData, { merge: true }); // Use merge to be safe
    reportSaveStatus('cloud', null); // all good (clears any earlier warning)
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    reportSaveStatus('cloud', { kind: classifySaveError(error) });
  }
};

export const loadFromFirestore = async (uid) => {
  if (!uid) return null;
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};