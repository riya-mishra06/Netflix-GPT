// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC38_PQPvZ9ndxOKUaW1u868tteLm3IfPA",
  authDomain: "netflix-clone061.firebaseapp.com",
  projectId: "netflix-clone061",
  storageBucket: "netflix-clone061.firebasestorage.app",
  messagingSenderId: "1086706326189",
  appId: "1:1086706326189:web:17e5d806154a7da3508424",
  measurementId: "G-67MVQW70S9",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// (Optional) Initialize analytics — only works in browsers with measurement ID
const analytics = getAnalytics(app);

// ✅ Initialize Auth properly with app
export const auth = getAuth();

export default app;
