import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHzd9z1f3ZdCwVq96TquuF7_JQuKyrpT8",
  authDomain: "house-marketplace-app-732dd.firebaseapp.com",
  projectId: "house-marketplace-app-732dd",
  storageBucket: "house-marketplace-app-732dd.appspot.com",
  messagingSenderId: "1054927920859",
  appId: "1:1054927920859:web:7016498793da5e94c6f6fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()