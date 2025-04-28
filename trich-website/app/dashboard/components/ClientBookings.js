"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import BookingCard from "./BookingCard";

const ClientBookings = ({ phoneNumber, bookingData }) => {
  // const [bookingData, setBookingData] = useState([]);

  // useEffect(() => {
  //   const getBookingData = async () => {

  //     const q = query(
  //       collection(db, "active_booking"),
  //       where("phone_number", "==", phoneNumber)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     if (!querySnapshot.empty) {
  //       let bookings = querySnapshot.docs.map((doc) => doc.data());
  //       bookings = bookings.sort((a,b) => a.status - b.status);
  //       setBookingData(bookings);
  //     }
  //   };

  //   getBookingData();
  // }, []);

  return (
    <section className="lg:w-[579px] xl:w-[759px] rounded-lg bg-[#FAFAFA] tracking-wider p-4 mb-10 lg:mb-0 lg:p-6 xl:p-10">
      <h2 className="text-3xl font-extrabold">My Bookings</h2>
      
      {/* Container with fixed height and scrolling */}
      <div className="pt-4">
        <div className="max-h-[calc(3*var(--booking-height)+2*theme(spacing.3))] overflow-y-auto space-y-3" style={{ "--booking-height": "172px" }}>
          {bookingData.length == 0 && <p className="text-center">No Bookings</p>}
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
      </div>
    </section>
  );
};

export default ClientBookings;