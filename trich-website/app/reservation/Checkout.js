"use client";
import { useState, useEffect } from "react";
import { handleRewardMatch } from "./Services";

import LoadingSpinner from "../components/animation/Spinner";
import SuccessIcon from "@/public/signInAssets/success.svg";
import Image from "next/image";
import Link from "next/link";

const Checkout = ({ first_name, phone_number, pickedService, totalPrice, orderId }) => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(0);
    console.log(pickedService, totalPrice, orderId)

    // Demo build: payment is simulated as an instant success, no external
    // payment gateway is contacted.
    useEffect(() => {
        setPaymentStatus(1)
    }, [first_name, phone_number, pickedService, totalPrice, orderId]);

    return (
        <section className="pt-4 space-y-4 flex flex-col items-center justify-center">
            <p className="font-extrabold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                {paymentStatus === 0 && "Please Wait"}
                {paymentStatus === 1 && (
                    <span className="text-green-400">Reservation Made</span>
                )}
                {paymentStatus === 2 && (
                    <span className="text-red-400">Payment Failed</span>
                )}
                {paymentStatus === 3 && (
                    <span className="text-yellow-400">Payment Pending</span>
                )}
            </p>

            {loading && paymentStatus === 0 && (
                <LoadingSpinner toggleShow={true} />
            )}

            {paymentStatus === 1 && (
                <Image src={SuccessIcon} alt="Payment-success-icon" width={100} />
            )}

            {paymentStatus === 2 && (
                <Link href="/">
                    <button className="px-6 py-2 font-semibold bg-orange1 text-white rounded-[10px]">
                        Homepage
                    </button>
                </Link>
            )}
        </section>
    );
};

export default Checkout;
