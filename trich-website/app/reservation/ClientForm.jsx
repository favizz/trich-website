"use client";
import { useState } from "react";
import { getPendingBookings } from "@/utils/user";
import PhoneForm from "../components/forms/PhoneForm";

const ClientForm = ({
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    setPage,
    setPendingBooking
}) => {
    const [isValid, toggleValid] = useState(true);
    const [isLoading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBookingCheck = async () => {
        toggleLoading(true);
        const pendingBooking = await getPendingBookings(`+62${phoneNumber.replace(/\D/g, "")}`);

        if (pendingBooking) {
            console.log("Booking Data:", pendingBooking.data);
            setPendingBooking({
                booking_ref: pendingBooking.docRef,
                booking_data: pendingBooking.data
            });
            setPage(5);
        } else {
            console.log("No pending bookings found.");
            setPage(1);
        }
        toggleLoading(false);
    }

    const handleContinue = (e) => {
        e.preventDefault();

        if (!fullName || !isValid) {
            setError("Please Fill Correctly!");
            return;
        }
        handleBookingCheck();
    };

    return (
        <form onSubmit={handleContinue} className="w-full px-4 lg:px-6 xl:px-10 space-y-4 mt-14 mb-14">
            {/* Phone Number Field */}
            <PhoneForm 
                phoneNumber={phoneNumber}
                getPhoneNumber={setPhoneNumber}
                toggleValid={toggleValid}
            />

            {/* Full Name (Nickname) Field */}
            <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Full Name</label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Continue Button */}
            <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                <button
                    type="submit"
                    className="w-full text-center border hover:border-orange1 hover:bg-white bg-orange1 hover:text-orange1 text-white font-bold px-12 py-2 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Continue"}
                </button>
            </div>
        </form>

    );
};

export default ClientForm;
