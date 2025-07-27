"use client";
import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const ClientBookings = ({ phoneNumber }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/${phoneNumber}`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const bookings = await res.json();
        bookings.sort((a, b) => a.status - b.status);
        setData(bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setData([]);
      }
    };

    fetchBookings();
  }, [phoneNumber]);

  return (
    <section className="lg:w-[579px] xl:w-[759px] rounded-lg bg-[#FAFAFA] tracking-wider p-4 mb-10 lg:mb-0 lg:p-6 xl:p-10">
      <h2 className="text-3xl font-extrabold">My Bookings</h2>
      <div className="pt-4">
        <div
          className="max-h-[calc(3*var(--booking-height)+2*theme(spacing.3))] overflow-y-auto space-y-3"
          style={{ "--booking-height": "172px" }}
        >
          {data.length === 0 && <p className="text-center">No Bookings</p>}
          {data.map((booking, index) => (
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
