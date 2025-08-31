// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5cb06.firebaseapp.com",
  projectId: "real-estate-5cb06",
  storageBucket: "real-estate-5cb06.firebasestorage.app",
  messagingSenderId: "1049917339017",
  appId: "1:1049917339017:web:378fec22d1106879f25d58"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);