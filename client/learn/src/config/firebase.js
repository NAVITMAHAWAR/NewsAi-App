import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8sPtfPRZUWRTSrU4TM1UKb7Cu3704Ljg",
  authDomain: "test-32543.firebaseapp.com",
  projectId: "test-32543",
  storageBucket: "test-32543.firebasestorage.app",
  messagingSenderId: "650008929815",
  appId: "1:650008929815:web:c03bfe09d02eb20f235e52",
  measurementId: "G-FNVDNDKY97",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
