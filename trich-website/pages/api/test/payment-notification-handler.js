import { db } from "@/config/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { handleUser, removeExpiredBooking } from "@/utils/user";

const statusMessages = {
    200: "Success: Transaction successful.",
    201: "Pending: Transaction pending, awaiting customer action.",
    202: "Denied: Transaction denied by payment provider or fraud detection system.",
    300: "Move Permanently: Future requests should use the new URL.",
    400: "Validation Error: Invalid request data.",
    401: "Access Denied: Check client or server key.",
    402: "Unauthorized Payment Type: Merchant lacks access.",
    403: "Not Acceptable: Request does not meet required headers.",
    404: "Not Found: The requested resource is missing.",
    405: "Method Not Allowed: HTTP method is incorrect.",
    406: "Duplicate Order ID: The order ID has already been used.",
    407: "Expired Transaction: The transaction has expired.",
    408: "Invalid Data Type: Wrong data format sent.",
    409: "Too Many Requests: Too many transactions for the same card number.",
    410: "Merchant Deactivated: Contact Midtrans support.",
    411: "Invalid Token: Token ID is missing, invalid, or timed out.",
    412: "Modification Not Allowed: Cannot change transaction status.",
    413: "Malformed Syntax: Incorrect request body format."
};

const sendResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return sendResponse(res, 405, "Method not allowed");
    }

    try {
        const { status_code: statusCode, order_id: orderId, transaction_status: transactionStatus } = req.body;

        if (!orderId || !transactionStatus) {
            return sendResponse(res, 400, "Missing required fields: order_id or transaction_status");
        }

        if (statusCode !== 200) {
            return sendResponse(res, statusCode, statusMessages[statusCode]);
        }

        if (transactionStatus === "expire") {
            removeExpiredBooking(orderId);
        }

        if (transactionStatus !== "settlement") {
            return sendResponse(res, 201, "Transaction not settled yet.");
        }

        // Update Booking status
        const orderQuery = query(collection(db, "non_auth_booking"), where("order_id", "==", orderId));
        const querySnapshot = await getDocs(orderQuery);

        if (querySnapshot.empty) {
            console.log(`No matching order found for order_id: ${orderId}`);
            return sendResponse(res, 404, "Order not found");
        }

        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { status: 2 });
        console.log(`Booking status updated successfully for order_id: ${orderId}`);

        // Add new / update user
        const bookingData = querySnapshot.docs[0].data();
        handleUser(bookingData.name, bookingData.phone_number);

        return res.status(200).json({ success: true, message: "Booking status updated successfully." });

    } catch (error) {
        console.error("Error updating booking status:", error);
        return sendResponse(res, 500, "Internal Server Error");
    }
}