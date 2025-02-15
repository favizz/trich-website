"use client";
import { useState } from "react";
import PhoneForm from "../components/forms/PhoneForm";

const ClientForm = ({
    fullName,
    getFullName,
    phoneNumber,
    getPhoneNumber,
    setPage,
}) => {
    const [isValid, toggleValid] = useState(true);

    const handleContinue = (e) => {
        e.preventDefault();

        if (!fullName || !isValid) {
            return;
        }

        setPage(1);
    };

    return (
        <form onSubmit={handleContinue} className="max-w-md mx-auto p-4">
            <PhoneForm
                phoneNumber={phoneNumber}
                getPhoneNumber={getPhoneNumber}
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
                    onChange={(e) => getFullName(e.target.value)}
                />
            </div>

            {fullName && phoneNumber && (
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                    Continue
                </button>
            )}
        </form>
    );
};

export default ClientForm;
