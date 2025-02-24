"use client";
import { useState } from "react";
import { getUser } from "@/utils/non-auth-user";
import PhoneForm from "@/app/components/forms/PhoneForm";

const ClientForm = ({
    phoneNumber,
    setPhoneNumber,
    fullName,
    setFullName,
    user,
    setUser,
    handleVerification,
}) => {
    const [isValid, setValid] = useState(true);
    const [isVerify, toggleVerify] = useState(false);
    const [error, setError] = useState(null);

    const handleCheck = async () => {
        const phoneNumberString = `+62${phoneNumber.replace(/-/g, "")}`;
        const response = await getUser(phoneNumberString);

        if (response.error) {
            setError("Error! please refresh!");
            return;
        }

        if (response.success && response.user) {
            setUser(response.user);
        } else if (response.success && !response.user) {
            console.log("No user found!");
        }
        toggleVerify(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) {
            return;
        }
        if (isVerify) {
            handleVerification();
        } else {
            handleCheck();
        }
    };

    const getRoute = () => {
        const hash = window.location.hash;
        if (hash === "" || hash === "#reservation") return 1;
        if (hash === "#profile") return 2;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Enter Your Phone Number
                </h2>
                <p className="text-gray-500 text-center mb-4">
                    We will send a verification code
                </p>

                <form onSubmit={handleSubmit}>
                    <PhoneForm
                        phoneNumber={phoneNumber}
                        getPhoneNumber={setPhoneNumber}
                        toggleValid={setValid}
                    />

                    {/* Reservation route */}
                    {getRoute() === 1 && isVerify && !user && (
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
                    )}
                    {getRoute() === 1 && isVerify && user && (
                        <p className="font-semibold">
                            Welcome {user?.first_name}!
                        </p>
                    )}

                    {/* Profile Route */}
                    {getRoute() === 2 && isVerify && !user && (
                        <p className="text-red-500">No user found!</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        {isVerify ? "Continue" : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;
