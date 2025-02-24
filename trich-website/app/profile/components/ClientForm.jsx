"use client";
import { useState } from "react";
import PhoneForm from "@/app/components/forms/PhoneForm";

const ClientForm = ({ phoneNumber, setPhoneNumber, handleVerification }) => {
    const [isValid, setValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) {
            return;
        }

        handleVerification();
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;
