// src/context/appState/firestoreSync.js

import {
  doc, getDoc, getDocs, setDoc, collection, writeBatch, deleteField,
} from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import { reportSaveStatus } from '../../utils/saveStatus.js';
import { createSyncEngine } from './syncCore.js';

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

// The only place that talks to Firestore. Layout and safety rules live in syncCore.js.
const io = {
  async getMain(uid) {
    const snap = await getDoc(doc(db, 'users', uid));
    return { exists: snap.exists(), data: snap.exists() ? snap.data() : null };
  },

  async getChunks(uid) {
    const snap = await getDocs(collection(db, 'users', uid, 'chunks'));
    return snap.docs.map((d) => ({ id: d.id, data: d.data() }));
  },

  async commit(uid, { setChunks, deleteChunks, main }) {
    const batch = writeBatch(db);
    setChunks.forEach((c) => batch.set(doc(db, 'users', uid, 'chunks', c.id), c.data));
    deleteChunks.forEach((id) => batch.delete(doc(db, 'users', uid, 'chunks', id)));
    if (main) batch.set(doc(db, 'users', uid), main, { merge: true }); // merge keeps billing/social fields
    await batch.commit();
  },

  async removeLegacyFields(uid, fields) {
    const patch = {};
    fields.forEach((field) => { patch[field] = deleteField(); });
    await setDoc(doc(db, 'users', uid), patch, { merge: true });
  },
};

const engine = createSyncEngine(io, {
  report: (problem) => reportSaveStatus('cloud', problem),
  classify: classifySaveError,
});

export const saveToFirestore = async (uid, data) => {
  if (!uid) return;
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
  await engine.save(uid, saveableData);
};

// Loads everything (small main document + the monthly / program documents) in the app's usual shape.
export const loadAllFromFirestore = (uid) => (uid ? engine.load(uid) : Promise.resolve(null));

// Forget what we know about the cloud (used on sign-out).
export const clearSyncSessions = () => engine.clear();

// Reads ONLY the small main document (billing / subscription info). Used to refresh subscription status.
export const loadFromFirestore = async (uid) => {
  if (!uid) return null;
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.exists() ? docSnap.data() : null;
};