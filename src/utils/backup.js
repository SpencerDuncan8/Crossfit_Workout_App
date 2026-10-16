// src/utils/backup.js
//
// Export / import of the user's training data as a plain JSON file.
// Works for everyone (free or premium) and does not need an account or internet.

import { initialAppState } from '../context/appState/initialState.js';

export const BACKUP_FORMAT = 'blockfit-backup';
export const BACKUP_VERSION = 1;
const MAX_BACKUP_BYTES = 30 * 1024 * 1024; // 30 MB sanity limit
const LAST_BACKUP_KEY = 'blockfit_last_backup';

// Fields that are NOT part of a backup:
//  - temporary UI state
//  - billing / social fields (owned by the server, and not safe to restore from a file)
//  - "where you are right now" pointers
const EXCLUDED_KEYS = new Set([
  'isModalOpen', 'modalContent', 'showConfetti',
  'isWorkoutEditorOpen', 'editingInfo', 'workoutToScheduleId',
  'isInfoModalOpen', 'infoModalContent', 'isPremiumModalOpen',
  'isPremium', 'stripeCustomerId', 'subscriptionId', 'subscriptionStatus',
  'subscriptionPriceId', 'subscriptionCurrentPeriodEnd',
  'subscriptionCancelAtPeriodEnd', 'subscriptionEndDate',
  'username', 'friends', 'friendRequestsSent', 'friendRequestsReceived',
  'viewingDate', 'viewingScheduleId', 'pendingExerciseEditId',
]);

const BACKUP_KEYS = Object.keys(initialAppState).filter((k) => !EXCLUDED_KEYS.has(k));

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// A progress photo is stored as { url: 'data:image/jpeg;base64,...', date: '7/18/2025' } (or null).
const PHOTO_KEYS = new Set(['beforePhoto', 'afterPhoto']);
const isValidPhoto = (value) =>
  value === null ||
  (isPlainObject(value) &&
    typeof value.url === 'string' &&
    /^(data:image\/|https:\/\/)/.test(value.url) &&
    (value.date === undefined || typeof value.date === 'string'));

// Does `value` have the same general shape as the default for that field?
const matchesShape = (key, defaultValue, value) => {
  if (PHOTO_KEYS.has(key)) return isValidPhoto(value);
  if (Array.isArray(defaultValue)) return Array.isArray(value);
  if (isPlainObject(defaultValue)) return isPlainObject(value);
  return typeof value === typeof defaultValue;
};

export function buildBackup(appState) {
  const data = {};
  for (const key of BACKUP_KEYS) {
    if (appState[key] !== undefined) data[key] = appState[key];
  }
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadBackup(appState) {
  const backup = buildBackup(appState);
  const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `blockfit-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  try { localStorage.setItem(LAST_BACKUP_KEY, backup.exportedAt); } catch { /* ignore */ }
  return backup;
}

export function getLastBackupDate() {
  try {
    const value = localStorage.getItem(LAST_BACKUP_KEY);
    return value ? new Date(value) : null;
  } catch {
    return null;
  }
}

// Turns the text of a backup file into a safe set of fields to restore.
// Throws an Error with a friendly message if the file isn't a usable backup.
export function parseBackup(text) {
  if (typeof text !== 'string' || text.length === 0) {
    throw new Error('That file is empty.');
  }
  if (text.length > MAX_BACKUP_BYTES) {
    throw new Error('That file is too large to be a BlockFit backup.');
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not a valid backup (could not read it).');
  }

  if (!isPlainObject(parsed) || parsed.format !== BACKUP_FORMAT || !isPlainObject(parsed.data)) {
    throw new Error('That file does not look like a BlockFit backup.');
  }
  if (typeof parsed.version === 'number' && parsed.version > BACKUP_VERSION) {
    throw new Error('This backup was made by a newer version of BlockFit. Please update the app and try again.');
  }

  const restored = {};
  for (const key of BACKUP_KEYS) {
    if (!(key in parsed.data)) continue;
    if (matchesShape(key, initialAppState[key], parsed.data[key])) {
      restored[key] = parsed.data[key];
    }
  }

  if (Object.keys(restored).length === 0) {
    throw new Error('That backup does not contain any data BlockFit can restore.');
  }

  return { data: restored, exportedAt: parsed.exportedAt || null };
}

// Short human-readable summary shown before the user confirms a restore.
export function summarizeBackupData(data) {
  const photoCount =
    (data.beforePhoto ? 1 : 0) + (data.afterPhoto ? 1 : 0) + (Array.isArray(data.photos) ? data.photos.length : 0);
  return {
    programs: Array.isArray(data.programs) ? data.programs.length : 0,
    workoutsCompleted: typeof data.totalWorkoutsCompleted === 'number' ? data.totalWorkoutsCompleted : 0,
    weightEntries: Array.isArray(data.weightHistory) ? data.weightHistory.length : 0,
    customExercises: Array.isArray(data.customExercises) ? data.customExercises.length : 0,
    photos: photoCount,
  };
}