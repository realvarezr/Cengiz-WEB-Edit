// ─── FIREBASE CONFIG ────────────────────────────────────────────────────────
// Reemplaza estos valores con los de tu proyecto Firebase:
// Firebase Console → Project Settings → Your apps → Web app → firebaseConfig

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyDPaigkpVd9nWVGHuFH0c_595m4fIrmiW4",
  authDomain:        "cengiz-menu.firebaseapp.com",
  projectId:         "cengiz-menu",
  storageBucket:     "cengiz-menu.firebasestorage.app",
  messagingSenderId: "233532925350",
  appId:             "1:233532925350:web:4bcc1ae61166a3d3531b67"
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
