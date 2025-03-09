import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { phone_number } = req.body;

  if (!phone_number) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Query the 'past_booking' collection using the userId
    const bookingQuery = query(
      collection(db, "active_booking"),
      where("phone_number", "==", phone_number)
    );
    const bookingSnapshot = await getDocs(bookingQuery);

    if (bookingSnapshot.empty) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }

    // Extract bookings data
    const bookings = bookingSnapshot.docs.map((doc) => doc.data());

    // Return the bookings as JSON
    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching booking data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
