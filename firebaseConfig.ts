import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config object extracted from google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyCyiVGZJvrGJubP7L4UErvp4tFykPhPCmM",
  authDomain: "rider-9b757.firebaseapp.com",
  projectId: "rider-9b757",
  storageBucket: "rider-9b757.firebasestorage.app",
  messagingSenderId: "519511846544",
  appId: "1:519511846544:web:4f7a89bea7d05ad8e0b215",
  measurementId: "G-S1PMHZW0ZF",
};

// Initialize Firebase only if it hasn't been initialized already
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
