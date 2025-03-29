import { db } from "@/config/firebase";
import {
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { phone_number } = req.body; // Extract phone number from request body

        if (!phone_number) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        try {
            // Reference to the 'past_booking' collection
            const bookingRef = collection(db, "past_booking");
            
            // Create a query to filter by the phone_number
            const q = query(bookingRef, where("phone_number", "==", phone_number));
            
            // Get the documents matching the query
            const querySnapshot = await getDocs(q);

            // If no documents found
            if (querySnapshot.empty) {
                return res.status(404).json({ message: "No bookings found for this phone number" });
            }

            // Collect the data of the matching documents
            const bookings = querySnapshot.docs.map(doc => doc.data());

            // Return the bookings in the response
            return res.status(200).json({ bookings });
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ message: "Error fetching bookings", error: error.message });
        }
    } else {
        // Handle unsupported HTTP methods
        return res.status(405).json({ message: "Method not allowed" });
    }
}