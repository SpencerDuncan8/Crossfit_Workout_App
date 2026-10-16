// src/utils/saveStatus.js
//
// A tiny shared "did my data save?" tracker.
// Saving code (browser storage + cloud) reports problems here, and the
// SaveWarningBanner shows them to the user instead of failing silently.

import { useSyncExternalStore } from 'react';

// source: 'local' (this device's browser storage) or 'cloud' (Firestore)
// problem: null when saving works, or { kind: string } when it fails
let status = { local: null, cloud: null };
const listeners = new Set();

export function reportSaveStatus(source, problem) {
  const current = status[source];
  const unchanged =
    (current === null && problem === null) ||
    (current !== null && problem !== null && current.kind === problem.kind);
  if (unchanged) return;

  status = { ...status, [source]: problem };
  listeners.forEach((listener) => listener());
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => status;

export function useSaveStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}