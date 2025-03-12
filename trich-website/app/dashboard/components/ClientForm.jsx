"use client";
import { useState } from "react";
import { getUserBookings } from "@/utils/user";
import PhoneForm from "@/app/components/forms/PhoneForm";

const ClientForm = ({
    setBookings,
    setPage
}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValid, toggleValid] = useState(true);
    const [isLoading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBooking = async () => {
        toggleLoading(true);
        const res = await getUserBookings(`+62${phoneNumber.replace(/\D/g, "")}`);

        if (res.success) {
            if (res.bookings) {
                setBookings(res.bookings);
                setPage(2);
            }
            else {
                setError("No user or booking found!");
            }
        } else {
            console.log(res.error);
        }
    }


    const handleContinue = (e) => {
        e.preventDefault();

        if (phoneNumber === "" || !isValid) {
            setError("Please Fill Correctly!");
            return;
        }
        handleBooking();
        toggleLoading(false);
    };

    return (
        <form onSubmit={handleContinue} className="bg-white px-8 py-8 rounded-lg w-full  lg:px-6 xl:px-10 space-y-4 mt-14 mb-14">
            {/* Phone Number Field */}
            <PhoneForm 
                phoneNumber={phoneNumber}
                getPhoneNumber={setPhoneNumber}
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
                    {isLoading ? "Loading..." : "Continue"}
                </button>
            </div>
        </form>

    );
};

export default ClientForm;
