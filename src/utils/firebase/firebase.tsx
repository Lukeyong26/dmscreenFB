// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB56H_MMIRuekQzY010pPlYzBLii835B2c",
  authDomain: "dm-screen-8a89d.firebaseapp.com",
  projectId: "dm-screen-8a89d",
  storageBucket: "dm-screen-8a89d.firebasestorage.app",
  messagingSenderId: "916563090601",
  appId: "1:916563090601:web:15cba9a6590048bd96ddb8",
  measurementId: "G-51YQV81BL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };