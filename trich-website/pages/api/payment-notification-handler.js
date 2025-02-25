import { db } from "@/config/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const data = req.body;

            const orderId = data.order_id;
            const statusCode = data.status_code;
            const transactionStatus = data.transaction_status;

            if (orderId && statusCode == 200) {
                if (transactionStatus !== "settlement") return;

                try {
                    const q = query(
                        collection(db, "non_auth_booking"),
                        where("order_id", "==", orderId)
                    );

                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const docRef = querySnapshot.docs[0].ref;

                        await updateDoc(docRef, {
                            status: 2,
                        });

                        console.log("Booking status updated successfully.");
                    } else {
                        console.log(
                            "No matching order found for order_id:",
                            orderId
                        );
                    }
                } catch (error) {
                    console.error("Error updating booking status:", error);
                }
            }

            res.status(200).json({
                message: "Notification saved successfully",
            });
        } catch (error) {
            console.error("Error saving notification:", error);
            res.status(500).json({ error: "Failed to save notification" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
