// /api/searchUsers.js

import { db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError } from '../server/http.js';

export default createHandler(async (req, res) => {
  const raw = req.body.username;
  const username = typeof raw === 'string' ? raw.toLowerCase().trim() : '';
  if (!username || username.length > 30 || !/^[a-z0-9_]+$/.test(username)) {
    throw new HttpError(400, 'Username is required.');
  }

  const usernameDoc = await db.collection('usernames').doc(username).get();
  if (!usernameDoc.exists) return res.status(404).json({ message: 'User not found.' });

  const { uid } = usernameDoc.data();
  const userDoc = await db.collection('users').doc(uid).get();
  if (!userDoc.exists) return res.status(404).json({ message: 'User data not found.' });

  res.status(200).json({ uid: userDoc.id, username: userDoc.data().username });
});