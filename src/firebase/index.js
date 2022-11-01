import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPF0UXvO6q0YEbY3otVEzqTznSlX5tZzY",
    authDomain: "elcastudentgovernment.firebaseapp.com",
    projectId: "elcastudentgovernment",
    storageBucket: "elcastudentgovernment.appspot.com",
    messagingSenderId: "72384887586",
    appId: "1:72384887586:web:351dd2447296123ec5437b",
    measurementId: "G-ZZSE3XD4CR"
  };


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);