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
        <form onSubmit={handleContinue} className="max-w-md mx-auto p-4">
            <PhoneForm
                phoneNumber={phoneNumber}
                getPhoneNumber={setPhoneNumber}
                toggleValid={toggleValid}
            />

            <div className="mb-4">
                <label
                    htmlFor="fullName"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Full Name
                </label>
                <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            <p className="text-red-500">{error}</p>
            <p>Please be sure that your phone number & name is correct!</p>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Continue"}
            </button>
        </form>
    );
};

export default ClientForm;
