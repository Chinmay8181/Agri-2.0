// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZhKw2-5V-aUZrZAnTMnFdFMvZsJbUUcs",
  authDomain: "tarobapo-cd330.firebaseapp.com",
  projectId: "tarobapo-cd330",
  storageBucket: "tarobapo-cd330.appspot.com",
  messagingSenderId: "294636500892",
  appId: "1:294636500892:web:dedd485fc0d62ec07bfa59",
  measurementId: "G-3FEMREKFZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);