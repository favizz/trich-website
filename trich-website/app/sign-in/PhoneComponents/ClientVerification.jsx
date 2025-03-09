"use client";

import { useRef } from "react";

const ClientVerification = ({
    code,
    setCode,
    phoneNumber,
    handleSignIn,
    error,
}) => {
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            let newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (code.join("") === "") {
            return;
        }

        handleSignIn();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Enter Verification Code
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    We've sent a code to{" "}
                    <span className="font-medium">{phoneNumber}</span>
                </p>
                <div className="flex justify-center gap-2 mb-4">
                    {code.map((num, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={num}
                            onChange={(e) =>
                                handleChange(index, e.target.value)
                            }
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-12 h-12 text-2xl font-bold text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    ))}
                </div>
                {error === "Invalid" && (
                    <p className="text-sm text-red-500 mb-4">
                        Invalid Code! Please try again.
                    </p>
                )}
                {error === "Expired" && (
                    <p className="text-sm text-red-500 mb-4">
                        OTP Code Expired!.
                    </p>
                )}
                <p className="text-sm text-gray-600 mb-4">
                    Didn't get a code?{" "}
                    <a href="#" className="text-indigo-600 font-medium">
                        Click to Resend
                    </a>
                </p>
                <button
                    onClick={(e) => handleSubmit(e)}
                    className="w-full py-2 bg-orange1 text-white font-semibold rounded-lg shadow-md hover:opacity-90"
                >
                    VERIFY
                </button>
            </div>
        </div>
    );
};

export default ClientVerification;
