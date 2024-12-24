"use client";
import { useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { formatPrice } from "./ChooseService";

const ConfirmPay = ({
    date,
    time,
    service,
    price,
    actualPrice,
    duration,
    setOrderId,
    handlePage,
}) => {
    const [agreePolicy, setAgreePolicy] = useState(false);

    const userBookingRef = collection(db, "active_booking");

    const handleBooking = async (
        order_id,
        fullName,
        userEmail,
        userPhone,
        pickedService,
        pickedTime,
        pickedDate,
        totalPrice
    ) => {
        try {
            await addDoc(userBookingRef, {
                create_booking_date: new Date(),
                user_id: auth?.currentUser?.uid,
                name: fullName,
                email: userEmail,
                phone_number: userPhone,
                service: pickedService,
                amount: totalPrice,
                date: pickedDate,
                time: pickedTime,
                status: 1,
                booking_id: uuidv4(),
                order_id: order_id.toString(),
            }).catch((e) => {
                console.error(e);
            });
        } catch (error) {
            console.error(error);
        }
    };

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

                const orderid = Math.floor(Math.random() * (5000 - 2001 + 1)) + 2001;
                setOrderId(orderid);
                const fullName = `${userInfo.first_name}`;

                await handleBooking(
                    orderid,
                    fullName,
                    userInfo.email,
                    userInfo.phone_number,
                    service,
                    time,
                    date,
                    price
                );
            } else {
                throw new Error("No user found with the provided user ID");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (agreePolicy) {
            await fetchData();
            handlePage(4);
        } else {
            return;
        }
    };

    return (
        <div className="w-full text-sm xl:text-base 2xl:text-lg">
            <div className="px-4 lg:px-6 space-y-2 py-4">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[#545454] font-semibold">
                        Reserved Date
                    </p>
                    <p className="font-bold">{date}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[#545454] font-semibold">Time</p>
                    <p className="font-bold">{time}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[#545454] font-semibold">Services</p>
                    <p className="font-bold">{service}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[#545454] font-semibold">Duration</p>
                    <p className="font-bold">{duration * 60} Minutes</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[#545454] font-semibold">Down Payment</p>
                    <p className="font-extrabold text-orange1 lg:text-base">
                        IDR{" "}
                        {actualPrice >= 200000 ? "100.000" : formatPrice(price)}
                    </p>
                </div>
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
                        onChange={(e) => setAgreePolicy(e.target.checked)}
                    />
                    <label className="text-[10px]">
                        I agree to the policy above
                    </label>
                </div>
                <div
                    onClick={(e) => handleCheckout(e)}
                    className="w-full rounded text-white font-bold bg-green2 py-2 lg:text-lg text-center"
                >
                    Checkout
                </div>
            </div>
        </div>
    );
};

export default ConfirmPay;
