// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWDyAHgIqGZjzIui2U5XjhGoZrbUgBAtI",
  authDomain: "gallery-8a271.firebaseapp.com",
  projectId: "gallery-8a271",
  storageBucket: "gallery-8a271.appspot.com",
  messagingSenderId: "723059069132",
  appId: "1:723059069132:web:87858d1db4dae7edfd7269",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
