"use client";
import { useState, useEffect } from "react";
import { handleRewardMatch } from "./Services";
import { logError } from "@/utils/booking";

import LoadingSpinner from "../components/animation/Spinner";
import SuccessIcon from "@/public/signInAssets/success.svg";
import Image from "next/image";
import Link from "next/link";

const Checkout = ({ first_name, phone_number, pickedService, totalPrice, orderId }) => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(0);

    useEffect(() => {
        async function fetchToken() {
            setLoading(true);

            try {
                const services = pickedService.toString().split(",");

                const body = {
                    transaction_details: {
                        order_id: orderId,
                        gross_amount: Math.round(totalPrice / 2),
                    },
                    item_details: services.map((service, idx) => ({
                        name: service.trim(),
                        quantity: 1,
                        price: Math.round(totalPrice / 2) / services.length,
                        id: `TS-${idx}`,
                    })),
                    customer_details: {
                        first_name,
                        phone: phone_number,
                    },
                    enabled_payments: ["other_qris"],
                };

                const endpoint = `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/operational/payment/token`;
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                if (!response.ok) throw new Error("Failed to fetch token");
                const data = await response.json();

                window.snap.pay(data.transactionToken, {
                    onSuccess: () => setPaymentStatus(1),
                    onError: () => setPaymentStatus(2),
                    onPending: () => setPaymentStatus(3),
                });
            } catch (error) {
                console.error(error);
                logError("MIDTRANS", error);
                setPaymentStatus(2);
            } finally {
                setLoading(false);
            }
        }

        fetchToken();
    }, [first_name, phone_number, pickedService, totalPrice, orderId]);

    useEffect(() => {
        const snapScript = "https://app.midtrans.com/snap/snap.js";
        const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;

        const script = document.createElement("script");
        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    return (
        <section className="pt-4 space-y-4 flex flex-col items-center justify-center">
            <p className="font-extrabold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                {paymentStatus === 0 && "Please Wait"}
                {paymentStatus === 1 && (
                    <span className="text-green-400">Payment Success</span>
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
