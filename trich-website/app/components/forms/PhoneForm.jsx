"use client";
import { useState } from "react";

const PhoneForm = ({ phoneNumber, getPhoneNumber, toggleValid }) => {
    const [error, setError] = useState("");

    const formatPhoneNumber = (value) => {
        const digits = value.replace(/\D/g, "");
        const limitedDigits = digits.slice(0, 11);

        let formatted = "";
        if (limitedDigits.length > 0) {
            formatted = limitedDigits.substring(0, 3);
        }
        if (limitedDigits.length > 3) {
            formatted += "-" + limitedDigits.substring(3, 7);
        }
        if (limitedDigits.length > 7) {
            formatted += "-" + limitedDigits.substring(7);
        }
        return formatted;
    };

    const isValidPhoneNumber = (phone) => {
        const digits = phone.replace(/\D/g, "");
        return /^8\d{8,10}$/.test(digits);
    };

    const handleChange = (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        getPhoneNumber(formattedValue);

        setError("");
    };

    const handleBlur = () => {
        if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
            toggleValid(false);
            setError("Phone number must start with '8' and have 10-12 digits.");
        } else {
            toggleValid(true);
            setError("");
        }
    };

    return (
        <div>
            <label
                htmlFor="phone_number"
                className="block text-gray-700 font-medium mb-2"
            >
                Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
                <div className="bg-gray-100 px-4 py-2 text-gray-700 font-medium">
                    +62
                </div>
                <input
                    id="phone_number"
                    type="tel"
                    placeholder="Enter phone number"
                    className={`w-full px-3 py-2 focus:outline-none ${
                        error ? "border-red-500" : ""
                    }`}
                    value={phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default PhoneForm;
