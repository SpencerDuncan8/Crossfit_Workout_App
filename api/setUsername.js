// /api/setUsername.js

import { db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError } from '../server/http.js';

export default createHandler(async (req, res) => {
  const uid = req.user.uid; // from the verified login token: you can only change YOUR username

  const raw = req.body.username;
  if (typeof raw !== 'string' || !raw.trim()) {
    throw new HttpError(400, 'Username is required.');
  }
  const username = raw.toLowerCase().trim();
  if (username.length < 3 || username.length > 15) {
    throw new HttpError(400, 'Username must be 3-15 characters long.');
  }
  if (!/^[a-z0-9_]+$/.test(username)) {
    throw new HttpError(400, 'Username can only contain lowercase letters, numbers, and underscores.');
  }

  await db.runTransaction(async (transaction) => {
    const usernameRef = db.collection('usernames').doc(username);
    const userRef = db.collection('users').doc(uid);

    // All reads first, then writes.
    const usernameDoc = await transaction.get(usernameRef);
    const userDoc = await transaction.get(userRef);
    const oldUsername = userDoc.exists ? userDoc.data().username : null;

    if (usernameDoc.exists && usernameDoc.data().uid !== uid) {
      throw new HttpError(400, 'Username is already taken. Please choose another.');
    }

    let oldUsernameRef = null;
    if (oldUsername && oldUsername !== username) {
      oldUsernameRef = db.collection('usernames').doc(oldUsername);
      const oldDoc = await transaction.get(oldUsernameRef);
      if (!oldDoc.exists || oldDoc.data().uid !== uid) oldUsernameRef = null;
    }

    transaction.set(usernameRef, { uid });
    transaction.set(userRef, { username }, { merge: true });
    // Free up the name you used to have so it doesn't stay reserved forever.
    if (oldUsernameRef) transaction.delete(oldUsernameRef);
  });

  res.status(200).json({ success: true, message: 'Username set successfully!' });
});