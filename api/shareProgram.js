// /api/shareProgram.js

import admin from 'firebase-admin';
import { generateUniqueId } from '../../utils/idUtils.js'; // We'll create this utility file next

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// A simple utility function to generate unique IDs on the server
const serverGenerateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { senderUid, recipientUid, programId } = req.body;

    if (!senderUid || !recipientUid || !programId) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    // 1. Get the sender's document to find the program to copy
    const senderRef = db.collection('users').doc(senderUid);
    const senderDoc = await senderRef.get();
    if (!senderDoc.exists) {
      return res.status(404).json({ error: 'Sender not found.' });
    }
    const senderData = senderDoc.data();
    const programToShare = senderData.programs.find(p => p.id === programId);

    if (!programToShare) {
      return res.status(404).json({ error: 'Program not found in sender\'s account.' });
    }
    
    // 2. Create a deep, safe copy of the program.
    // This is crucial to give every workout and block a new, unique ID for the recipient.
    const newProgram = JSON.parse(JSON.stringify(programToShare));
    newProgram.id = serverGenerateUniqueId(); // Give the program itself a new ID
    newProgram.name = `${programToShare.name} (Shared by ${senderData.username || 'a friend'})`;
    newProgram.isTemplate = false; // It's a user program now

    // Assign new IDs to all workouts and their internal blocks/sets
    if (newProgram.workouts) {
        newProgram.workouts.forEach(workout => {
            workout.id = serverGenerateUniqueId();
            if (workout.blocks) {
                workout.blocks.forEach(block => {
                    block.id = serverGenerateUniqueId();
                    if (block.exercises) {
                        block.exercises.forEach(ex => {
                            ex.instanceId = serverGenerateUniqueId(); // The React key
                            if (ex.sets) ex.sets.forEach(s => s.id = serverGenerateUniqueId());
                        });
                    }
                    if (block.minutes) {
                        block.minutes.forEach(m => m.id = serverGenerateUniqueId());
                    }
                });
            }
        });
    }

    // 3. Add the new program to the recipient's 'programs' array in Firestore.
    const recipientRef = db.collection('users').doc(recipientUid);
    await recipientRef.update({
      programs: admin.firestore.FieldValue.arrayUnion(newProgram)
    });

    res.status(200).json({ success: true, message: 'Program shared successfully!' });

  } catch (error) {
    console.error('Error sharing program:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}