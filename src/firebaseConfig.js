// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-sUIhsyUOSPA0RIjb59lL7TOBxTyYuJM",
  authDomain: "payment-portal-auth.firebaseapp.com",
  projectId: "payment-portal-auth",
  storageBucket: "payment-portal-auth.firebasestorage.app",
  messagingSenderId: "655511061320",
  appId: "1:655511061320:web:499ee9da8cb9aa41c2a97d",
  measurementId: "G-V7YHB9E07M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
