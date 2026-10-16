// shared/chunking.js
//
// How a user's data is laid out in Firestore.
//
// Firestore limits ONE document to 1 MB, so the heavy, ever-growing parts of a user's
// data are stored as many small documents instead of one big one:
//
//   users/{uid}                  -> small stuff (totals, weight history, settings, billing...)
//   users/{uid}/chunks/s_2026-06 -> every workout day in June 2026
//   users/{uid}/chunks/p_{id}    -> one training program
//   users/{uid}/chunks/photo_*   -> the before / after photo (each isolated, so one huge
//                                   photo can never block anything else from saving)
//
// This file is plain JavaScript with no imports, so BOTH the app (src/) and the
// server (api/) use the exact same rules.

export const STORAGE_VERSION = 2;
// Firestore's hard limit is 1,048,576 bytes per document. Stay safely under it.
export const MAX_CHUNK_BYTES = 900000;
export const PHOTO_FIELDS = ['beforePhoto', 'afterPhoto', 'photos'];

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

export const scheduleChunkId = (month) => `s_${month}`;
export const photoChunkId = (field) => `photo_${field}`;
export const programChunkId = (programId) => `p_${encodeURIComponent(String(programId))}`;

export const utf8Length = (text) => new TextEncoder().encode(text).length;

// Firestore rejects `undefined` values, so drop them (arrays keep their length via null).
export function stripUndefined(value) {
  if (Array.isArray(value)) return value.map((v) => (v === undefined ? null : stripUndefined(v)));
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out = {};
    for (const [key, v] of Object.entries(value)) {
      if (v !== undefined) out[key] = stripUndefined(v);
    }
    return out;
  }
  return value;
}

// JSON with sorted keys, so two copies of the same data always produce the same text
// (used to tell whether a chunk changed since it was last saved).
export function stableStringify(value) {
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const keys = Object.keys(value).filter((k) => value[k] !== undefined).sort();
    return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(value[k])).join(',') + '}';
  }
  const text = JSON.stringify(value);
  return text === undefined ? 'null' : text;
}

const isEmptyPhoto = (field, value) =>
  field === 'photos' ? !Array.isArray(value) || value.length === 0 : !value;

// Splits the app's data into { main, chunks }.
export function splitState(state) {
  const main = {};
  for (const [key, value] of Object.entries(state)) {
    if (key === 'workoutSchedule' || key === 'programs' || PHOTO_FIELDS.includes(key)) continue;
    main[key] = value;
  }

  const chunks = {};
  const order = [];

  const programs = Array.isArray(state.programs) ? state.programs : [];
  programs.forEach((program, index) => {
    if (!program || typeof program !== 'object') return;
    const base = program.id != null ? programChunkId(program.id) : `p_noid_${index}`;
    let id = base;
    let n = 2;
    while (chunks[id]) id = `${base}__${n++}`; // two programs sharing an id must not overwrite each other
    chunks[id] = { kind: 'program', program };
    order.push(id);
  });

  const schedule =
    state.workoutSchedule && typeof state.workoutSchedule === 'object' ? state.workoutSchedule : {};
  for (const [dateKey, day] of Object.entries(schedule)) {
    const month = DATE_KEY.test(dateKey) ? dateKey.slice(0, 7) : 'other';
    const id = scheduleChunkId(month);
    if (!chunks[id]) chunks[id] = { kind: 'schedule', days: {} };
    chunks[id].days[dateKey] = day;
  }

  for (const field of PHOTO_FIELDS) {
    const value = state[field];
    if (!isEmptyPhoto(field, value)) chunks[photoChunkId(field)] = { kind: 'photo', field, value };
  }

  main.storageVersion = STORAGE_VERSION;
  main.programOrder = order;

  return { main: stripUndefined(main), chunks: stripUndefined(chunks) };
}

// Puts the pieces back together into the shape the app uses.
// chunkDocs: [{ id, data }]
export function mergeChunks(main, chunkDocs) {
  const result = { ...main };
  const programById = new Map();
  const schedule = {};
  const photos = {};

  const sorted = [...chunkDocs].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  for (const { id, data } of sorted) {
    if (!data) continue;
    if (data.kind === 'program' && data.program) programById.set(id, data.program);
    else if (data.kind === 'schedule' && data.days) Object.assign(schedule, data.days);
    else if (data.kind === 'photo' && data.field) photos[data.field] = data.value;
  }

  const order = Array.isArray(main.programOrder) ? main.programOrder : [];
  const programs = [];
  const used = new Set();
  for (const id of order) {
    if (programById.has(id)) {
      programs.push(programById.get(id));
      used.add(id);
    }
  }
  for (const [id, program] of programById) {
    if (!used.has(id)) programs.push(program); // e.g. a program shared to you by a friend
  }

  delete result.programOrder;
  delete result.storageVersion;
  result.programs = programs;
  result.workoutSchedule = schedule;

  for (const field of PHOTO_FIELDS) {
    if (field in photos) {
      result[field] = photos[field];
    } else if (!isEmptyPhoto(field, main[field])) {
      result[field] = main[field]; // photo that is still stored the old way
    } else {
      result[field] = field === 'photos' ? [] : null;
    }
  }
  return result;
}

// Compares the chunks we want to have against what was last saved.
//   cache: { chunkId: signature } of what is already in the cloud
// Returns only the work that is actually needed.
export function diffChunks(cache, chunks) {
  const writes = [];
  const tooLarge = [];
  const deletes = [];
  const signatures = {};

  for (const [id, data] of Object.entries(chunks)) {
    const sig = stableStringify(data);
    signatures[id] = sig;
    if (cache[id] === sig) continue;
    if (utf8Length(sig) > MAX_CHUNK_BYTES) {
      tooLarge.push(id);
      continue;
    }
    writes.push({ id, data, sig });
  }
  for (const id of Object.keys(cache)) {
    if (!(id in chunks)) deletes.push(id);
  }
  return { writes, deletes, tooLarge, signatures };
}