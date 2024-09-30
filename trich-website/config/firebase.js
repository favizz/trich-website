
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "trich-barberspace.firebaseapp.com",
  projectId: "trich-barberspace",
  storageBucket: "trich-barberspace.appspot.com",
  messagingSenderId: "637709484500",
  appId: "1:637709484500:web:42e559d33e8b9cad985641",
  measurementId: "G-6W5PG4BXTH"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)