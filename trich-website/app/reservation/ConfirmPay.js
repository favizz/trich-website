"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleUser, createReservation } from "@/utils/user";
import { getOperationalTimes } from "@/utils/operationalTimes";
import { updatePaidBooking } from "@/utils/booking";

import { formatPrice } from "./ChooseService";
import { generateCode } from "@/utils/generateOrderId";

import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";

const ConfirmPay = ({
    user,
    date,
    time,
    service,
    duration,
    barber,
    setOrderId,
    handlePage,
    setBookingResponse
}) => {
    const [agreePolicy, setAgreePolicy] = useState(false);
    const totalPrice = service.reduce((sum, service) => {
        return sum + service.price;
    }, 0);

    const handleBooking = async () => {
        const orderid = generateCode();
        setOrderId(orderid);

        const response = await createReservation(
            orderid,
            user.first_name,
            user.phone_number,
            service,
            time,
            date,
            barber.id
        );

        return response;
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        const dateObj = new Date(Date.parse(date));
        if (isNaN(dateObj)) {
            alert("Invalid date format.");
            return;
        }

        const { error, times } = await getOperationalTimes(dateObj, service);
    
        if (error === "DATE_IN_PAST") {
            ToastManager.notify(
                "Please pick today or a future date.",
                "error",
            );
            return;
        }

        if (!times.includes(time)) {
            ToastManager.notify(
                "Sorry, that slot was just taken. Please go back to choose another time.",
                "error",
            );
            handlePage(2);
            return;
        }

        const response = await handleBooking();
        setBookingResponse(response);
        if (totalPrice > 0) {
            handlePage(4);
        }
    };

    return (
        <div className="w-full text-sm xl:text-base 2xl:text-lg">
            <div className="px-4 lg:px-6 space-y-2 py-4">
                <ReceiptList
                    title={"Reserved Date"}
                    value={date}
                />
                <ReceiptList
                    title={"Time"}
                    value={time}
                />
                <ReceiptList
                    title={"Services"}
                    value={service.map(s => s.name).join(", ")}
                />
                <ReceiptList
                    title={"Barber"}
                    value={barber.name}
                />
                <ReceiptList
                    title={"Duration"}
                    value={`${duration} Minutes`}
                />
                <ReceiptList
                    title={"Down Payment"}
                    value={`IDR ${totalPrice >= 200000 ? "100.000" : formatPrice(totalPrice)}`}
                />                
            </div>
            <div className="w-full h-[0.5px] bg-gray-600"></div>
            <div className="px-4 lg:px-6 space-y-2 mt-4">
                <p className="font-bold">Cancellation Policy:</p>
                <p className="text-orange1 font-bold max-w-[80vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[30vw] text-[11px] lg:text-xs ">
                    Please arrive 10 minutes before appointment
                </p>
                <p className="max-w-[80vw] lg:max-w-[50vw] xl:max-w-[40vw]  2xl:max-w-[30vw] text-[11px]  lg:text-xs ">
                    Cancellations are accepted, but the down payment is non-refundable. 
                    Rescheduling is allowed up to 3 hours before your appointment. 
                    We truly appreciate your understanding and cooperation.
                </p>
                <div className="flex flex-row items-center space-x-2">
                    <input
                        type="checkbox"
                        className="w-6 h-6"
                        onChange={(e) => setAgreePolicy(e.target.checked)}
                    />
                    <label className="text-sm">
                        I agree to the policy above
                    </label>
                </div>
                <div
                    onClick={(e) => handleCheckout(e)}
                    className={`w-full rounded text-white font-bold ${agreePolicy ? 'bg-green2' : 'bg-gray-400'} py-2 lg:text-lg text-center`}
                >
                    Checkout
                </div>
            </div>

            <div className="w-0 h-0">
                <ToastContainer />
            </div>
        </div>
    );
};

export default ConfirmPay;

const ReceiptList = ({title, value}) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <p className="text-[#545454] font-semibold">
                {title}
            </p>
            <p className="font-bold">{value}</p>
        </div>
    )
}