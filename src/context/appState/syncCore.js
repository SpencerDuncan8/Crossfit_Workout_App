// src/context/appState/syncCore.js
//
// The logic for loading and saving a user's data as many small Firestore documents
// (see shared/chunking.js for the layout).
//
// This file never talks to Firebase directly. It receives an `io` object that does the
// actual reading and writing, which keeps the tricky parts (migration, change detection,
// safety checks) testable without a real database.
//
//   io.getMain(uid)                       -> { exists, data }
//   io.getChunks(uid)                     -> [{ id, data }]
//   io.commit(uid, { setChunks, deleteChunks, main })   (one atomic write)
//   io.removeLegacyFields(uid, fields)    (deletes old-style fields from the main document)

import {
  STORAGE_VERSION,
  PHOTO_FIELDS,
  photoChunkId,
  splitState,
  mergeChunks,
  diffChunks,
  stableStringify,
} from '../../../shared/chunking.js';

const MAX_OPS_PER_COMMIT = 400; // Firestore allows 500 operations per batch

export function createSyncEngine(io, { report, classify }) {
  const sessions = new Map(); // uid -> what we know is already saved in the cloud

  // Loads everything for a user and returns it in the app's normal shape (or null if the
  // user has no saved data yet). Throws if the cloud can't be read, and in that case NO
  // session is created, so nothing is ever saved over data we failed to load.
  async function load(uid) {
    const main = await io.getMain(uid);
    const chunkDocs = await io.getChunks(uid);

    const session = { cache: {}, mainSig: null, legacyFields: [], queue: Promise.resolve() };

    let result = null;
    if (main.exists) {
      const data = main.data;
      session.legacyFields = ['workoutSchedule', 'programs', ...PHOTO_FIELDS].filter((key) => key in data);

      if ((data.storageVersion || 0) >= STORAGE_VERSION) {
        // New layout: the small documents are the truth.
        for (const { id, data: chunkData } of chunkDocs) session.cache[id] = stableStringify(chunkData);
        result = mergeChunks(data, chunkDocs);
      } else {
        // Old layout: use it as it is. The next save moves it to the new layout.
        result = data;
      }
    }

    sessions.set(uid, session);
    return result;
  }

  // Saves the user's data. Only the documents that changed are written.
  function save(uid, saveable) {
    const session = sessions.get(uid);
    if (!session) return Promise.resolve({ skipped: true }); // never loaded, so never save
    session.queue = session.queue.then(() => doSave(uid, session, saveable));
    return session.queue;
  }

  async function doSave(uid, session, saveable) {
    try {
      const { main, chunks } = splitState(saveable);
      const { writes, deletes, tooLarge, signatures } = diffChunks(session.cache, chunks);
      const mainSig = stableStringify(main);
      const mainChanged = mainSig !== session.mainSig;

      if (writes.length || deletes.length || mainChanged) {
        const sets = writes.map((w) => ({ id: w.id, data: w.data }));
        const chunkOps = sets.length + deletes.length;

        if (chunkOps + 1 <= MAX_OPS_PER_COMMIT) {
          await io.commit(uid, { setChunks: sets, deleteChunks: deletes, main });
        } else {
          // A very large first-time move: write the chunks in several steps, main document last.
          const ops = [
            ...sets.map((s) => ({ type: 'set', s })),
            ...deletes.map((id) => ({ type: 'delete', id })),
          ];
          for (let i = 0; i < ops.length; i += MAX_OPS_PER_COMMIT) {
            const slice = ops.slice(i, i + MAX_OPS_PER_COMMIT);
            await io.commit(uid, {
              setChunks: slice.filter((o) => o.type === 'set').map((o) => o.s),
              deleteChunks: slice.filter((o) => o.type === 'delete').map((o) => o.id),
              main: null,
            });
          }
          await io.commit(uid, { setChunks: [], deleteChunks: [], main });
        }

        for (const w of writes) session.cache[w.id] = w.sig;
        for (const id of deletes) delete session.cache[id];
        session.mainSig = mainSig;
      }

      if (session.legacyFields.length) {
        await cleanupLegacy(uid, session, chunks, signatures, tooLarge);
      }

      report(tooLarge.length ? { kind: 'item-too-large' } : null);
      return { ok: true, wrote: writes.length, deleted: deletes.length, tooLarge };
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      report({ kind: classify(error) });
      return { ok: false, error };
    }
  }

  // Removes old-style fields from the main document, but ONLY after reading the new
  // documents back and confirming they hold exactly the same data.
  async function cleanupLegacy(uid, session, chunks, signatures, tooLarge) {
    const idsFor = (field) => {
      if (field === 'workoutSchedule') return Object.keys(chunks).filter((id) => chunks[id].kind === 'schedule');
      if (field === 'programs') return Object.keys(chunks).filter((id) => chunks[id].kind === 'program');
      return photoChunkId(field) in chunks ? [photoChunkId(field)] : [];
    };

    const back = {};
    for (const { id, data } of await io.getChunks(uid)) back[id] = stableStringify(data);

    const safe = session.legacyFields.filter((field) =>
      idsFor(field).every((id) => !tooLarge.includes(id) && back[id] === signatures[id])
    );

    if (safe.length) {
      await io.removeLegacyFields(uid, safe);
      session.legacyFields = session.legacyFields.filter((field) => !safe.includes(field));
    }
  }

  function clear() {
    sessions.clear();
  }

  return { load, save, clear, _sessions: sessions };
}