"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import BookingCard from "./BookingCard";

const ClientBookings = ({ handleBookingData }) => {
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const getBookingData = async () => {
            const currentUserID = auth?.currentUser?.uid;
            if (!currentUserID) {
                console.error("Current user ID is undefined.");
                return;
            }
            const q = query(
                collection(db, "active_booking"),
                where("user_id", "==", currentUserID),
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                let bookings = querySnapshot.docs.map((doc) => doc.data());
                bookings = bookings.sort((a, b) => a.status - b.status);
                setBookingData(bookings);
            }
        };

        getBookingData();
        handleBookingData(bookingData);
    }, []);

    return (
        <section className="lg:w-[579px] xl:w-[759px] rounded-[10px] bg-[#FAFAFA] tracking-wider p-4 mb-10 lg:mb-0 lg:p-6 xl:p-10">
            <h2 className="text-3xl font-extrabold">My Bookings</h2>
            <div className="pt-4 space-y-3">
                {bookingData.length == 0 && (
                    <p className="text-center">No Bookings</p>
                )}
                {bookingData.map((booking, index) => (
                    <BookingCard
                        key={index}
                        date={booking.date}
                        time={booking.time}
                        status={booking.status}
                        isPaid={booking.is_paid}
                        amount={booking.amount}
                        notes={booking.notes}
                    />
                ))}
            </div>
        </section>
    );
};

export default ClientBookings;
