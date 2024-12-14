"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/config/firebase";
import {
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

import LoadingSpinner from "../components/animation/Spinner";
import SuccessIcon from "@/public/signInAssets/success.svg";
import Image from "next/image";
import Link from "next/link";

const Checkout = ({ pickedService, totalPrice, pickedDate, pickedTime }) => {
    const [loading, setLoading] = useState(false);

    const [reqBody, setReqBody] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!auth?.currentUser?.uid) {
                    throw new Error("User ID is required");
                }

                const q = query(
                    collection(db, "user"),
                    where("user_id", "==", auth.currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userInfo = querySnapshot.docs[0].data();

                    const orderid = Math.floor(Math.random() * 1000) + 1;
                    const fullName = `${userInfo.first_name}`;
                    const services = pickedService.toString().split(",");

                    const body = {
                        transaction_details: {
                            order_id: orderid,
                            gross_amount: totalPrice,
                        },
                        item_details: services.map((service, idx) => ({
                            name: service.trim(),
                            price:
                                services.length > 1
                                    ? totalPrice / 2
                                    : totalPrice,
                            quantity: 1,
                            id: `TS-${idx}`,
                        })),
                        customer_details: {
                            first_name: fullName,
                            email: userInfo.email,
                        },
                        enabled_payments: ["other_qris"],
                    };

                    setReqBody(body);
                } else {
                    throw new Error("No user found with the provided user ID");
                }
            } catch (error) {
                console.error(error);
                setPaymentStatus(2);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchToken() {
            setLoading(true);
            if (!reqBody) return;

            try {
                const response = await fetch("/api/dokuHandler", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reqBody),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch token");
                }

                const data = await response.json();

                window.snap.pay(data.token, {
                    onSuccess: function (result) {
                        setPaymentStatus(1);
                    },
                    onError: function (result) {
                        setPaymentStatus(2);
                    },
                    onPending: function (result) {
                        setPaymentStatus(3);
                    },
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchToken();
    }, [reqBody]);

    useEffect(() => {
        const snapScript = "https://app.midtrans.com/snap/snap.js"; // Production
        // const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"; // Sandbox
        const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
        const script = document.createElement("script");

        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
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

            {/* Loading */}
            {loading ? (
                <LoadingSpinner
                    toggleShow={
                        loading &&
                        paymentStatus !== 1 &&
                        paymentStatus !== 2 &&
                        paymentStatus !== 3
                    }
                />
            ) : (
                ""
            )}

            {/* Icons */}
            {paymentStatus === 1 && (
                <Image
                    src={SuccessIcon}
                    alt="Payment-success-icon"
                    width={100}
                />
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
