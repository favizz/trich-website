import { useState } from "react";
import { deleteBooking } from "@/utils/user";
import { generateCode } from "./ConfirmPay";
import { createBooking } from "@/utils/user";

const ClientPendings = ({ pendingBooking, setPendingBooking, setPage }) => {
    const [modalType, setModalType] = useState(null);
    const pendingData = pendingBooking.booking_data;

    const handleConfirm = async () => {
        if (!pendingBooking.booking_ref) {
            return;
        }

        await deleteBooking(pendingBooking.booking_ref);

        if (modalType === "delete") {
            setPage(1);
        } else if (modalType === "pay") {
            const tempOrderId = generateCode();
            setPendingBooking(prevState => ({
                ...prevState,
                booking_data: {
                    ...prevState.booking_data,
                    order_id: tempOrderId
                }
            }));

            await createBooking(
                pendingData.name,
                pendingData.phone_number,
                pendingData.service,
                pendingData.time,
                pendingData.date,
                pendingData.amount,
                tempOrderId
            )
            
            setPage(4);
        }
        setModalType(null);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-600">You still have unpaid bookings</h2>
            <div className="mt-4 space-y-2">
                <p><strong>Name:</strong> {pendingData.name}</p>
                <p><strong>Phone Number:</strong> {pendingData.phone_number}</p>
                <p><strong>Service:</strong> {pendingData.service}</p>
                <p><strong>Amount:</strong> IDR {pendingData.amount.toLocaleString()}</p>
                <p><strong>Date:</strong> {pendingData.date}</p>
                <p><strong>Time:</strong> {pendingData.time}</p>
            </div>

            <div className="flex justify-between mt-6">
                <button 
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    onClick={() => setModalType("delete")}
                >
                    Delete
                </button>

                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    onClick={() => setModalType("pay")}
                >
                    Pay
                </button>
            </div>

            {modalType && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {modalType === "delete" ? "Confirm Deletion" : "Confirm Payment"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {modalType === "delete"
                                ? "Are you sure you want to delete this booking?"
                                : "Are you sure you want to proceed with payment?"}
                        </p>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded-md"
                                onClick={() => setModalType(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                className={`${modalType === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white py-1 px-4 rounded-md`}
                                onClick={handleConfirm}
                            >
                                {modalType === "delete" ? "Delete" : "Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientPendings;

