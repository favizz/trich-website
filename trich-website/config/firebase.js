
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore } from "firebase/firestore"

// trich base
// const firebaseConfig = {
//   apiKey: "REDACTED_FIREBASE_API_KEY",
//   authDomain: "trich-barberspace.firebaseapp.com",
//   projectId: "trich-barberspace",
//   storageBucket: "trich-barberspace.appspot.com",
//   messagingSenderId: "637709484500",
//   appId: "1:637709484500:web:42e559d33e8b9cad985641",
//   measurementId: "G-6W5PG4BXTH"
// };

// trich temp
// const firebaseConfig = {
//   apiKey: "REDACTED_FIREBASE_API_KEY",
//   authDomain: "trich-temp.firebaseapp.com",
//   projectId: "trich-temp",
//   storageBucket: "trich-temp.appspot.com",
//   messagingSenderId: "645526511626",
//   appId: "1:645526511626:web:6e892d919f955064997ff3",
//   measurementId: "G-3K8EL56M8B"
// };

// trich server
// const firebaseConfig = {
//   apiKey: "REDACTED_FIREBASE_API_KEY",
//   authDomain: "trich-barber.firebaseapp.com",
//   projectId: "trich-barber",
//   storageBucket: "trich-barber.appspot.com",
//   messagingSenderId: "966772996674",
//   appId: "1:966772996674:web:c53155dcbf1b7baeb58bdb",
//   measurementId: "G-4DSWPXYZKD"
// };

// trich newest
const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "trich-new-server.firebaseapp.com",
  projectId: "trich-new-server",
  storageBucket: "trich-new-server.appspot.com",
  messagingSenderId: "666749190814",
  appId: "1:666749190814:web:dddf0a195500c61b4a718f",
  measurementId: "G-YR29PK3HG5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)