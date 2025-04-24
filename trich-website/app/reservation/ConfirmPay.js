"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBooking } from "@/utils/user";

import { formatPrice } from "./ChooseService";

export function generateCode() {
    const number = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const letters = String.fromCharCode(
        Math.floor(Math.random() * 26) + 65,
        Math.floor(Math.random() * 26) + 65
    );

    return `TB-${number}${letters}`;
}

const ConfirmPay = ({
    user,
    date,
    time,
    service,
    price,
    actualPrice,
    duration,
    setOrderId,
    handlePage,
    queryParam
}) => {
    const router = useRouter();

    const [agreePolicy, setAgreePolicy] = useState(false);

    const handleBooking = async () => {
        const orderid = generateCode();
        setOrderId(orderid);

        let serviceName = service;
        if (serviceName.includes("The Trich Experience")) {
            if (queryParam === "H3e5LrxK2R") { // free the trich experience
                serviceName = `${serviceName} (Free Trich Experience)`; 
            } 
        }
        if (serviceName.includes("Trim & Treat") || 
            serviceName.includes("Mask Off") || 
            serviceName.includes("Creambath")
        ) {
            if (queryParam === "w62jI0Zzbk") { // 50% small service
                serviceName = `${serviceName} (50% Small Service)`; 
            } 
            else if (queryParam === "5J8qcc6ahu") { // free small service
                serviceName = `${serviceName} (Free Small Service)`; 
            }
        }

        await createBooking(
            user.first_name,
            user.phone_number,
            serviceName,
            time,
            date,
            price,
            orderid,
        );
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (agreePolicy) {
            await handleBooking();
            if (actualPrice > 0) {
                handlePage(4);
            } else {
                router.replace("payment-status");
            }
        } else {
            return;
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
                    value={service}
                />
                <ReceiptList
                    title={"Duration"}
                    value={`${duration * 60} Minutes`}
                />
                <ReceiptList
                    title={"Down Payment"}
                    value={`IDR ${actualPrice >= 200000 ? "100.000" : formatPrice(price)}`}
                />                
            </div>
            <div className="w-full h-[0.5px] bg-gray-600"></div>
            <div className="px-4 lg:px-6 space-y-2 mt-4">
                <p className="font-bold">Cancellation Policy:</p>
                <p className="text-orange1 font-bold max-w-[80vw] lg:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[30vw] text-[11px] lg:text-xs ">
                    Please arrive 10 minutes before appointment
                </p>
                <p className="max-w-[80vw] lg:max-w-[50vw] xl:max-w-[40vw]  2xl:max-w-[30vw] text-[11px]  lg:text-xs ">
                    Cancellations are accepted; however, the down payment is
                    non-refundable. We appreciate your understanding and
                    cooperation.
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