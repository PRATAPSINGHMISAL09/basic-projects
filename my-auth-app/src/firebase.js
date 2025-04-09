import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAxuLZZAPl6vFk9S3D97eFQQI-5KdCURTs",
  authDomain: "double-auth-1e101.firebaseapp.com",
  projectId: "double-auth-1e101",
  storageBucket: "double-auth-1e101.firebasestorage.app",
  messagingSenderId: "511512218648",
  appId: "1:511512218648:web:e29ab9d34b31959e43476d",
  measurementId: "G-GD5G1P4T1F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);