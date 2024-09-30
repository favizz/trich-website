import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed, only POST requests are allowed" });
  }

  try {
    const { currentUserID } = req.body;
    if (!currentUserID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const q = query(
      collection(db, "user"),
      where("user_id", "==", currentUserID)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userInfo = querySnapshot.docs[0].data();
      return res.status(200).json({ user: userInfo });
    } else {
      return res.status(404).json({ error: "No user found with the provided user ID" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}