
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore } from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: "REDACTED_FIREBASE_API_KEY",
//   authDomain: "trich-barberspace.firebaseapp.com",
//   projectId: "trich-barberspace",
//   storageBucket: "trich-barberspace.appspot.com",
//   messagingSenderId: "637709484500",
//   appId: "1:637709484500:web:42e559d33e8b9cad985641",
//   measurementId: "G-6W5PG4BXTH"
// };

const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "trich-temp.firebaseapp.com",
  projectId: "trich-temp",
  storageBucket: "trich-temp.appspot.com",
  messagingSenderId: "645526511626",
  appId: "1:645526511626:web:6e892d919f955064997ff3",
  measurementId: "G-3K8EL56M8B"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)