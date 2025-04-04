"use client";
import { useState } from "react";
import PhoneForm from "@/app/components/forms/PhoneForm";
import Spinner from "@/app/components/Spinner";

const ClientForm = ({
    setPhoneNumber,
    isLoading,
    error,
}) => {
    const [tempPhoneNumber, setTempPhoneNumber] = useState("");
    const [isValid, toggleValid] = useState(true);

    const handleContinue = (e) => {
        e.preventDefault();

        if (tempPhoneNumber !== "" && isValid) {
            setPhoneNumber(tempPhoneNumber);
        }
        return;
    };

    return (
        <form onSubmit={handleContinue} className="bg-white px-8 py-8 rounded-lg w-full  lg:px-6 xl:px-10 space-y-4 mt-14 mb-14">
            {/* Phone Number Field */}
            <div className="mb-4">
                <p className="text-3xl font-bold mt-2">Dashboard</p>
                <h2 className="text-lg font-medium text-gray-700">See your bookings & points!</h2>
            </div>
            <PhoneForm 
                phoneNumber={tempPhoneNumber}
                getPhoneNumber={setTempPhoneNumber}
                toggleValid={toggleValid}
            />


            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Continue Button */}
            <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                <button
                    type="submit"
                    className="w-full text-center border hover:border-orange1 hover:bg-white bg-orange1 hover:text-orange1 text-white font-bold px-12 py-2 rounded"
                    disabled={isLoading}
                >
                    {!isLoading && "Continue"}
                    <Spinner isLoading={isLoading} />
                </button>
            </div>
        </form>

    );
};

export default ClientForm;
