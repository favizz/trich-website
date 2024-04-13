import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const UpdateMovie = async (id, newTitle) => {
  const movieDoc = doc(db, "movies", id);
  await updateDoc(movieDoc, { name: newTitle });
};
