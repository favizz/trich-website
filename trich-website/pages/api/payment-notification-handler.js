import { updatePaidBooking } from "@/utils/booking";
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
        const {
            status_code: statusCode,
            order_id: orderId,
            transaction_status: transactionStatus
        } = req.body;
    
        if (!orderId || !transactionStatus) {
            return sendResponse(res, 400, "Missing required fields: order_id or transaction_status");
        }
    
        if (statusCode !== "200") {
            return sendResponse(res, +statusCode, statusMessages[statusCode] || "Unknown status");
        }

        if (transactionStatus === "expire") {
            await removeExpiredBooking(orderId);
            return sendResponse(res, 200, "Booking expired and removed");
        }

        if (transactionStatus !== "settlement") {
            return sendResponse(res, 202, "Transaction not settled yet.");
        }

        try {
            const booking = await updatePaidBooking(orderId);
            const { first_name, phone_number, service } = booking;
            await handleUser(first_name, phone_number, service);
            return res.status(200).json({
                success: true,
                message: "Booking paid and user points updated."
            });
        } catch (err) {
            if (err.message.startsWith("Order not found")) {
                return sendResponse(res, 404, "Order not found");
            }
            console.error("payment-notification error:", err);
            return sendResponse(res, 500, "Internal Server Error");
        }
  
    } catch (err) {
        console.error("Error in payment-notification-handler:", err);
        return sendResponse(res, 500, "Internal Server Error");
    }
}
  