import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let initialized = false;

export function getAdminDb() {
  if (!process.env.FIREBASE_PROJECT_ID) return null;
  if (!process.env.FIREBASE_CLIENT_EMAIL) return null;
  if (!process.env.FIREBASE_PRIVATE_KEY) return null;

  if (!initialized && getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
    initialized = true;
  }

  return getFirestore();
}
