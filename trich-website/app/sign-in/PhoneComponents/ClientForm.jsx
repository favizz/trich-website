"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/non-auth-user";
import PhoneForm from "@/app/components/forms/PhoneForm";
import { getCookie } from "cookies-next";

const ClientForm = ({
    phoneNumber,
    setPhoneNumber,
    setUser,
    handleVerification,
}) => {
    const router = useRouter();
    const [isValid, setValid] = useState(true);
    const [isVerify, toggleVerify] = useState(false);
    const [error, setError] = useState(null);

    const handleCheck = async () => {
        const phoneNumberString = `+62${phoneNumber.replace(/-/g, "")}`;
        console.log(phoneNumberString)

        const response = await getUser(phoneNumberString);
        const existingUserId = getCookie(phoneNumberString);

        if (response.error) {
            setError("Error! please refresh!");
            return;
        }

        if (response.success && response.user) {
            setUser(response.user);
            if (existingUserId) {
                console.log("Cookie found for phone number:", phoneNumberString, "User ID:", existingUserId);
                router.push('/dashboard');
                return;
            } else {
                console.log("No Cookie!");
            }
            console.log(response.user);
        } else if (response.success && !response.user) {
            setError("No User found!");
            console.log("No user found!");
            return;
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
                    {error ? (<p className="text-red-500">{error}</p>) : ''}
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
