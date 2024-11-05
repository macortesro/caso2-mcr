// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDPDg9G_-SoGzav2HwB7FijGxsNAyL8OfQ",
  authDomain: "pcev2-c2.firebaseapp.com",
  projectId: "pcev2-c2",
  storageBucket: "pcev2-c2.firebasestorage.app",
  messagingSenderId: "79676794487",
  appId: "1:79676794487:web:e4741aacff5b151222c872"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
