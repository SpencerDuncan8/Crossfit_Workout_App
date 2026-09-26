// src/context/appState/firestoreSync.js

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config.js';

export const saveToFirestore = async (uid, data) => {
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

export const loadFromFirestore = async (uid) => {
  if (!uid) return null;
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};