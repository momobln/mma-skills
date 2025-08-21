// Firebase init only (no JSX here)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase Console (Project settings → General → Your apps → Web)
const firebaseConfig = {
  apiKey: "AIzaSyChBUXzq0HkjNRrOzJ_ilremQRopAaKgWw",
  authDomain: "mma-skills.firebaseapp.com",
  databaseURL:
    "https://mma-skills-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mma-skills",
  storageBucket: "mma-skills.firebasestorage.app",
  messagingSenderId: "843900620252",
  appId: "1:843900620252:web:4ab4b9a89e892735f3d319",
};

console.log("[firebase] apiKey:", firebaseConfig.apiKey);
console.log("[firebase] projectId:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
