import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const notificationRef = collection(db, "notification");

      await addDoc(notificationRef, {
        time: Date.now(),
        transaction_time: data.transaction_time,
        transaction_status: data.transaction_status,
        transaction_id: data.transaction_id,
        status_message: data.status_message,
        status_code: data.status_code,
        signature_key: data.signature_key,
        settlement_time: data.settlement_time,
        payment_type: data.payment_type,
        order_id: data.order_id,
        merchant_id: data.merchant_id,
        issuer: data.issuer,
        gross_amount: data.gross_amount,
        fraud_status: data.fraud_status,
        currency: data.currency,
        acquirer: data.acquirer,
      });

      res.status(200).json({ message: "Notification saved successfully" });
    } catch (error) {
      console.error("Error saving notification:", error);
      res.status(500).json({ error: "Failed to save notification" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
