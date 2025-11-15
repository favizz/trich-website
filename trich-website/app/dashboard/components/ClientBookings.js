"use client";
import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const ClientBookings = ({ phoneNumber }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_SPRINGBOOT_URL + "/website/reservations/" + phoneNumber,
          {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
                },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const bookings = await res.json();
        console.log(bookings);

        // map status string → number for sorting
        const statusOrder = {
          unpaid: 0,
          half: 1,
          walkIn: 2,
          paid: 3,
        };

        bookings.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        setData(bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setData([]);
      }
    };

    fetchBookings();
  }, [phoneNumber]);

  return (
    <section className="rounded-lg bg-[#FAFAFA] tracking-wider p-4 mb-10 lg:mb-0 lg:p-6 xl:p-10">
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
              duration={booking.duration}
              status={booking.status}
              amount={booking.amount}
              barberName={booking.barberName}
              serviceNames={booking.serviceNames}
              notes={booking.notes}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientBookings;
