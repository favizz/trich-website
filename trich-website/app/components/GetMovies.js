import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export const GetMovieList = async (setMovieFunc) => {
  const moviesCollectionRef = collection(db, "movies");
  try {
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMovieFunc(filteredData);
  } catch (error) {
    console.error(error);
  }
};
