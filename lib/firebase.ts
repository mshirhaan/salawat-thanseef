// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAATgrgHkRylvNW1Ievnj0S9iYMbqRuivU",
  authDomain: "dummy-7293e.firebaseapp.com",
  projectId: "dummy-7293e",
  storageBucket: "dummy-7293e.firebasestorage.app",
  messagingSenderId: "443735093256",
  appId: "1:443735093256:web:2d8ebe9e5f8ccbb281a1bd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
