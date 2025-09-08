"use client";
import { useState, useEffect } from "react";
import { getPendingBookings, getUserData } from "@/utils/user";
import { getCredentials, setCredentials } from "@/utils/cookieManager";
import PhoneForm from "../components/forms/PhoneForm";
import Spinner from "../components/Spinner";

const ClientForm = ({
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    setPoints,
    setMembership,
    setPage,
    setPendingBooking
}) => {
    const [isValid, toggleValid] = useState(true);
    const [isLoading, toggleLoading] = useState(false);
    const [isNameLoading, setIsNameLoading] = useState(false);
    const [showNameInput, toggleNameInput] = useState(false);
    const [error, setError] = useState(null);

    const getStoredCredentials = () => {
        const credential = getCredentials();

        if (credential) {
            setFullName(credential.full_name);
            setPhoneNumber(credential.phone_number);
            setPoints(credential.point);
            setMembership(credential.is_member);
            toggleNameInput(true);
        } else {
            console.log("No Cookie!");
        }
    }

    const handleGetName = async (phone_number) => {
        if (!phone_number) return;

        setIsNameLoading(true);
        try {
            const data = await getUserData(`+62${phone_number.replace(/\D/g, "")}`);

            setFullName(data.name);
            setPoints(data.point);
            setMembership(data.member);

            setCredentials(phoneNumber, data.name, data.point, data.member);
        } catch (err) {
            console.error("Error in handleGetName:", err);
            setFullName("");
        } finally {
            toggleNameInput(true);
            setIsNameLoading(false);
        }
    };

    const handleBookingCheck = async () => {
        toggleLoading(true);
        const formatedPhoneNumber = `+62${phoneNumber.replace(/\D/g, "")}`;
        const pendingBooking = await getPendingBookings(formatedPhoneNumber);

        if (pendingBooking && formatedPhoneNumber != "+6282165152727") {
            setPendingBooking(pendingBooking);
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
            <div className={`${showNameInput ? "flex" : "invisible"} flex-col space-y-1`}>
                <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">Full Name</label>
                </div>
                <div className="relative">
                    {isNameLoading ? (
                        <div className="flex justify-center items-center py-2">
                            <Spinner isLoading={isNameLoading} />
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    )}
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