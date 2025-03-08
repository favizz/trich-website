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
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700 font-medium">Phone Number</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="+62"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
            </div>

            {/* Full Name (Nickname) Field */}
            <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Nickname</label>
                    {/*<a href="#" className="text-gray-500 text-sm">Forgot password?</a>*/}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {/* Eye Icon
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        */}
                    </div>
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
