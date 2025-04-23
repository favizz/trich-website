"use client";
import { useState, useEffect } from "react";
import { getPendingBookings } from "@/utils/user";
import { getUser } from "@/utils/non-auth-user";
import { getCookie, setCookie } from "cookies-next";
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
    const [showNameInput, toggleNameInput] = useState(false);
    const [error, setError] = useState(null);

    const getStoredCredentials = () => {
        const credential = getCookie("trich_credential");

        if (credential) {
            const parsedData = JSON.parse(credential);

            setFullName(parsedData.full_name);
            setPhoneNumber(parsedData.phone_number);
            toggleNameInput(true);
        } else {
            console.log("No Cookie!");
        }
    }

    const storeCredentials = () => {
        const credential = getCookie("trich_credential");

        if (!credential) {
            setCookie(
                "trich_credential", 
                JSON.stringify({
                    phone_number: phoneNumber,
                    full_name: fullName,
                }), 
                {
                maxAge: 60 * 60 * 24 * 7,
                path: "/", 
                }
            );
        } 
        // Cannot update a cookie once its on the client
    }

    const handleGetName = async (phone_number) => {
        try {
            const { success, user, error } = await getUser(`+62${phone_number.replace(/\D/g, "")}`);
            if (success && user) {
                setFullName(user.first_name);
                console.log(user.first_name);
            } else {
                console.log("User not found or error occurred:");
                setFullName("");
            }
        } catch (err) {
            setFullName("");
            console.error("Error in handleGetName:", err);
        }
        toggleNameInput(true);
    };

    const handleBookingCheck = async () => {
        toggleLoading(true);
        const pendingBooking = await getPendingBookings(`+62${phoneNumber.replace(/\D/g, "")}`);

        if (pendingBooking) {
            setPendingBooking({
                booking_ref: pendingBooking.docRef,
                booking_data: pendingBooking.data
            });
            setPage(5);
        } else {
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
        storeCredentials();
        handleBookingCheck();
    };

    useEffect(() => {
        getStoredCredentials();
    }, [])

    return (
        <form onSubmit={handleContinue} className="w-full px-4 lg:px-6 xl:px-10 space-y-4 mt-14 mb-14">
            {/* Phone Number Field */}
            <div className="mb-4">
                <p className="text-3xl font-bold mt-2">Schedule your cut!</p>
                <h2 className="text-lg font-medium text-gray-700">Fill in your details</h2>
            </div>
            <PhoneForm 
                phoneNumber={phoneNumber}
                getPhoneNumber={setPhoneNumber}
                toggleValid={toggleValid}
                onBlurFunc={() => handleGetName(phoneNumber)}
            />

            {/* Full Name (Nickname) Field */}
            <div className={`${showNameInput ? "flex " : "invisible" } flex-col space-y-1`}>
                <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Full Name</label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Continue Button */}
            <div className="flex flex-col items-center justify-center space-y-2">
                <button
                    type="submit"
                    className={`${fullName === "" || !isValid ? "bg-gray-400" : "bg-orange1 hover:text-orange1 hover:border-orange1 hover:bg-white"} 
                    w-full text-center border text-white font-bold px-12 py-2 rounded`}
                    disabled={isLoading || fullName === "" || phoneNumber === ""}
                >
                    {isLoading ? "Loading..." : "Continue"}
                </button>
            </div>
        </form>

    );
};

export default ClientForm;
