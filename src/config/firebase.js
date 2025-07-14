// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7wIJYh8ADS6H9QmGpluCG5LCsW0Wz6wo",
  authDomain: "my-auth-app-969c9.firebaseapp.com",
  projectId: "my-auth-app-969c9",
  storageBucket: "my-auth-app-969c9.firebasestorage.app",
  messagingSenderId: "323932448500",
  appId: "1:323932448500:web:1f9461fc065e1faf34e0a1",
  measurementId: "G-9SY8TWKR31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;