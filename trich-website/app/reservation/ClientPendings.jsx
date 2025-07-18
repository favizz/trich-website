import { useState } from "react";
import { deleteBooking } from "@/utils/user";
import { generateCode } from "./ConfirmPay";
import { createBooking } from "@/utils/user";

const ClientPendings = ({ pendingBooking, setPendingBooking, setPage }) => {
    const [modalType, setModalType] = useState(null);

    const handleConfirm = async () => {
        if (!pendingBooking) {
            return;
        }

        await deleteBooking(pendingBooking.reservationId);

        if (modalType === "delete") {
            setPage(1);
        } else if (modalType === "pay") {
            const tempOrderId = generateCode();
            setPendingBooking(prevState => ({
                ...prevState,
                orderId: tempOrderId
            }));

            console.log(pendingBooking);

            await createBooking(
                pendingBooking.name,
                pendingBooking.phoneNumber,
                pendingBooking.service,
                pendingBooking.time,
                pendingBooking.date,
                pendingBooking.amount,
                tempOrderId
            )
            
            setPage(4);
        }
        setModalType(null);
    };

    return (
    <div className="max-w-md mx-auto p-6 ">
      <div className="text-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Pending Payment</h2>
        <p className="text-3xl font-bold mt-2">IDR {pendingBooking.amount.toLocaleString()}</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="grid grid-cols-2 gap-y-3">
          <div className="text-gray-600">Name</div>
          <div className="text-right font-medium">{pendingBooking.name}</div>

          <div className="text-gray-600">Phone Number</div>
          <div className="text-right font-medium">
            {pendingBooking.phone_number}
          </div>

          <div className="text-gray-600">Service</div>
          <div className="text-right font-medium">{pendingBooking.service}</div>

          <div className="text-gray-600">Date</div>
          <div className="text-right font-medium">{pendingBooking.date}</div>

          <div className="text-gray-600">Time</div>
          <div className="text-right font-medium">{pendingBooking.time}</div>

        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-full"
          onClick={() => {
            setModalType("pay");
          }}
        >
          Pay
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 py-3 px-4 rounded-full"
          onClick={() => {
            setModalType("delete");
          }}
        >
          Delete
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
                className={`${modalType === "delete" ? "bg-orange1 hover:bg-red-600" : "bg-green2 hover:bg-green-800"} text-white py-1 px-4 rounded-md`}
                onClick={handleConfirm}
              >
                {modalType === "delete" ? "Delete" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default ClientPendings;

