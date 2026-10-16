// server/http.js
// Shared request handling for the API endpoints:
//   - CORS limited to your own site (no more "allow everyone")
//   - verifies the caller's Firebase login token, so the SERVER decides who the user is
//   - consistent error responses

import { adminAuth } from './firebaseAdmin.js';

const DEFAULT_ORIGINS = ['https://www.blockfit.app', 'https://blockfit.app'];

const allowedOrigins = () => {
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const site = process.env.SITE_URL ? [process.env.SITE_URL.replace(/\/$/, '')] : [];
  return [...DEFAULT_ORIGINS, ...site, ...extra];
};

export const applyCors = (req, res) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins().includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export class HttpError extends Error {
  constructor(status, message, extra = {}) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}

// Billing endpoints reply { error: { message } }, social endpoints reply { error: "message" }.
// The app already expects those two shapes, so we keep them.
const fail = (res, status, message, shape, extra = {}) =>
  res.status(status).json({ error: shape === 'object' ? { message, ...extra } : message });

// Returns the verified Firebase user ({ uid, email, ... }) or null.
export const verifyUser = async (req) => {
  const match = (req.headers.authorization || '').match(/^Bearer (.+)$/i);
  if (!match) return null;
  try {
    return await adminAuth.verifyIdToken(match[1]);
  } catch {
    return null;
  }
};

export const createHandler = (fn, { auth = true, errorShape = 'string' } = {}) =>
  async function handler(req, res) {
    applyCors(req, res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      return fail(res, 405, 'Method Not Allowed', errorShape);
    }
    try {
      if (auth) {
        const user = await verifyUser(req);
        if (!user) return fail(res, 401, 'Please sign in again.', errorShape);
        req.user = user; // uid and email here come from the signed token, never from the request body
      }
      req.body = req.body || {};
      await fn(req, res);
    } catch (err) {
      if (err instanceof HttpError) return fail(res, err.status, err.message, errorShape, err.extra);
      if (err?.type === 'StripeCardError') return fail(res, 402, err.message, errorShape);
      console.error(`Unhandled error in ${req.url}:`, err);
      return fail(res, 500, 'An internal server error occurred.', errorShape);
    }
  };

export const requireString = (value, name, maxLength = 200) => {
  if (typeof value !== 'string' || !value.trim() || value.length > maxLength) {
    throw new HttpError(400, `${name} is required.`);
  }
  return value.trim();
};