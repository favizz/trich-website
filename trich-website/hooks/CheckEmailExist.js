import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export const checkIfEmailExists = async (email) => {
  const q = query(collection(db, "user"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
