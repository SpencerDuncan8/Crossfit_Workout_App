// src/utils/apiClient.js
// Calls our own /api endpoints with the signed-in user's login token attached.
// The server uses that token to know who you are, so it no longer trusts a user ID from the browser.

import { auth } from '../firebase/config.js';

export async function apiPost(path, body = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error('You need to be signed in to do that.');
  const token = await user.getIdToken();
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}