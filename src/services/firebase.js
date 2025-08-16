// src/services/firebase.js
// [AR] هذا الملف يهيّئ Firebase ويُصدّر الخدمات التي سنستعملها في التطبيق.
// [EN] This file initializes Firebase and exports the services we will use in the app.

import { initializeApp } from "firebase/app";
// [AR] استيراد دالة تهيئة تطبيق Firebase.
// [EN] Import the function to initialize the Firebase app.

import { getAuth } from "firebase/auth";
// [AR] استيراد خدمة المصادقة (Auth) للتسجيل/الدخول/الخروج.
// [EN] Import the Auth service for sign up / sign in / sign out.

import { getFirestore } from "firebase/firestore";
// [AR] استيراد قاعدة البيانات السحابية Firestore (للـ CRUD).
// [EN] Import Cloud Firestore (for CRUD operations).

import { getStorage } from "firebase/storage";
// [AR] استيراد التخزين (للملفات/الصور) — اختياري الآن.
// [EN] Import Storage (for files/images) — optional for now.

const firebaseConfig = {
  // [AR] هذه القيم انسخها كما ظهرت لك في Firebase Console (Project settings → Your apps → Web).
  // [EN] Copy these values exactly from Firebase Console (Project settings → Your apps → Web).
  apiKey: "AIzaSyChBUXzq0HkjNRrOzJ_ilremQRopAaKgWw",
  authDomain: "mma-skills.firebaseapp.com",
  projectId: "mma-skills",
  storageBucket: "mma-skills.firebasestorage.app", 
  // [AR] هذا الحقل خليه كما أعطاك Firebase. (في بعض المشاريع يكون appspot.com؛ اتبع القيم المعروضة لك).
  // [EN] Keep exactly what Firebase gave you. (Some projects show appspot.com; follow your console.)

  messagingSenderId: "843900620252",
  appId: "1:843900620252:web:4ab4b9a89e892735f3d319",
};

const app = initializeApp(firebaseConfig);
// [AR] تهيئة تطبيق Firebase باستخدام الإعدادات أعلاه.
// [EN] Initialize the Firebase app with the config above.

export const auth = getAuth(app);
// [AR] نصدر كائن المصادقة لاستخدامه في Login/Signup/Logout.
// [EN] Export the Auth instance to use for Login/Signup/Logout.

export const db = getFirestore(app);
// [AR] نصدر قاعدة البيانات Firestore لنخزن المهارات (CRUD).
// [EN] Export Firestore to store skills (CRUD).

export const storage = getStorage(app);
// [AR] نصدر التخزين لاستخدامه لاحقًا (رفع فيديو/صورة) — اختياري.
// [EN] Export Storage to use later (upload video/image) — optional.
