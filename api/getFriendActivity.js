// /api/getFriendActivity.js

import { db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError, requireString } from '../server/http.js';
import { readFriendView } from '../server/userData.js';

export default createHandler(async (req, res) => {
  const callerUid = req.user.uid; // from the verified login token
  const friendUid = requireString(req.body.friendUid, 'Friend User ID');

  const friendDoc = await db.collection('users').doc(friendUid).get();
  if (!friendDoc.exists) throw new HttpError(404, 'User not found.');

  const friendData = friendDoc.data();

  // Only people on THEIR friends list may view their workouts.
  if (!(friendData.friends || []).includes(callerUid)) {
    throw new HttpError(403, 'You are not friends with this user.');
  }

  const { workoutSchedule, programs } = await readFriendView(db, friendUid, friendData);

  res.status(200).json({
    username: friendData.username || 'Unknown User',
    workoutSchedule,
    programs,
  });
});