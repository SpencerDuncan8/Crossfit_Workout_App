// /api/shareProgram.js

import { admin, db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError, requireString } from '../server/http.js';
import { findProgram, addProgram } from '../server/userData.js';

const serverGenerateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const MAX_PROGRAM_BYTES = 300 * 1024; // keeps one share from bloating someone's account

export default createHandler(async (req, res) => {
  const senderUid = req.user.uid; // from the verified login token: you can only share YOUR programs
  const recipientUid = requireString(req.body.recipientUid, 'Recipient UID');
  const programId = requireString(req.body.programId, 'Program ID');

  if (recipientUid === senderUid) throw new HttpError(400, 'You cannot share a program with yourself.');

  const senderRef = db.collection('users').doc(senderUid);
  const recipientRef = db.collection('users').doc(recipientUid);
  const [senderDoc, recipientDoc] = await Promise.all([senderRef.get(), recipientRef.get()]);

  if (!senderDoc.exists) throw new HttpError(404, 'Sender not found.');
  if (!recipientDoc.exists) throw new HttpError(404, 'Recipient not found.');

  // The recipient must have you on THEIR friends list (they accepted you).
  if (!(recipientDoc.data().friends || []).includes(senderUid)) {
    throw new HttpError(403, 'You can only share programs with your friends.');
  }

  const senderData = senderDoc.data();
  const programToShare = await findProgram(db, senderUid, senderData, programId);
  if (!programToShare) throw new HttpError(404, "Program not found in sender's account.");

  const newProgram = JSON.parse(JSON.stringify(programToShare));
  newProgram.id = serverGenerateUniqueId();
  newProgram.name = `${programToShare.name} (Shared by ${senderData.username || 'a friend'})`;
  newProgram.isTemplate = false;

  (newProgram.workouts || []).forEach(workout => {
    workout.id = serverGenerateUniqueId();
    (workout.blocks || []).forEach(block => {
      block.id = serverGenerateUniqueId();
      (block.exercises || []).forEach(ex => {
        ex.instanceId = serverGenerateUniqueId();
        (ex.sets || []).forEach(s => { s.id = serverGenerateUniqueId(); });
      });
      (block.minutes || []).forEach(m => { m.id = serverGenerateUniqueId(); });
    });
  });

  if (Buffer.byteLength(JSON.stringify(newProgram)) > MAX_PROGRAM_BYTES) {
    throw new HttpError(400, 'That program is too large to share.');
  }

  await addProgram(db, admin, recipientUid, recipientDoc.data(), newProgram);

  res.status(200).json({ success: true, message: 'Program shared successfully!' });
});