// server/userData.js
//
// Reads and writes a user's programs / workout history on the server.
//
// A user's data is stored in one of two layouts (see shared/chunking.js):
//   - old layout: programs and workoutSchedule live inside the users/{uid} document
//   - new layout: they live in small documents under users/{uid}/chunks
// Accounts move to the new layout the first time they sign in with the new app, so the
// server has to understand both until everyone has moved.

import { STORAGE_VERSION, programChunkId, scheduleChunkId } from '../shared/chunking.js';

export const usesChunks = (userData) => (userData?.storageVersion || 0) >= STORAGE_VERSION;

const chunksOf = (db, uid) => db.collection('users').doc(uid).collection('chunks');

// The month an ISO date falls in, shifted by `offset` months, as "YYYY-MM".
const monthKey = (date, offset) => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + offset, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
};

// What a friend is allowed to see: this month (plus the neighbouring months, because the
// day-by-day arrows can cross a month boundary) and only the workouts those days used.
export async function readFriendView(db, uid, userData, now = new Date()) {
  if (!usesChunks(userData)) {
    return { workoutSchedule: userData.workoutSchedule || {}, programs: userData.programs || [] };
  }

  const col = chunksOf(db, uid);
  const monthDocs = await Promise.all(
    [-1, 0, 1].map((offset) => col.doc(scheduleChunkId(monthKey(now, offset))).get())
  );
  const workoutSchedule = {};
  for (const snap of monthDocs) {
    if (snap.exists && snap.data().days) Object.assign(workoutSchedule, snap.data().days);
  }

  const usedWorkoutIds = new Set();
  Object.values(workoutSchedule).forEach((day) =>
    (Array.isArray(day) ? day : []).forEach((item) => item?.workoutId && usedWorkoutIds.add(item.workoutId))
  );

  const order = Array.isArray(userData.programOrder) ? userData.programOrder : [];
  const programSnaps = await Promise.all(order.map((id) => col.doc(id).get()));
  const programs = programSnaps
    .filter((snap) => snap.exists && snap.data().program)
    .map((snap) => snap.data().program)
    .map((program) => ({ ...program, workouts: (program.workouts || []).filter((w) => usedWorkoutIds.has(w.id)) }))
    .filter((program) => program.workouts.length > 0);

  return { workoutSchedule, programs };
}

// Finds one of a user's programs by its id (or null).
export async function findProgram(db, uid, userData, programId) {
  if (!usesChunks(userData)) {
    return (userData.programs || []).find((p) => p.id === programId) || null;
  }
  const col = chunksOf(db, uid);

  const direct = await col.doc(programChunkId(programId)).get();
  if (direct.exists && direct.data().program?.id === programId) return direct.data().program;

  // Fall back to scanning (covers programs whose document id had to be made unique).
  const order = Array.isArray(userData.programOrder) ? userData.programOrder : [];
  for (const id of order) {
    const snap = await col.doc(id).get();
    if (snap.exists && snap.data().program?.id === programId) return snap.data().program;
  }
  return null;
}

// Adds a program to a user's account, in whichever layout the account uses.
export async function addProgram(db, admin, uid, userData, program) {
  const userRef = db.collection('users').doc(uid);
  if (!usesChunks(userData)) {
    await userRef.update({ programs: admin.firestore.FieldValue.arrayUnion(program) });
    return;
  }
  const chunkId = programChunkId(program.id);
  const batch = db.batch();
  batch.set(chunksOf(db, uid).doc(chunkId), { kind: 'program', program });
  batch.update(userRef, { programOrder: admin.firestore.FieldValue.arrayUnion(chunkId) });
  await batch.commit();
}