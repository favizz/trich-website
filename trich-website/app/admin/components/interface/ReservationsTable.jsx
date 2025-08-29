"use client";
import React from "react";

const ReservationsTable = ({ recentBookings, deleteActiveBooking }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-orange1 font-bold text-white">
                        <th className="border border-gray-300 p-2 w-32">Reservation ID</th>
                        <th className="border border-gray-300 p-2 w-32">Order ID</th>
                        <th className="border border-gray-300 p-2 min-w-[120px]">Customer</th>
                        <th className="border border-gray-300 p-2 w-32">Phone</th>
                        <th className="border border-gray-300 p-2 min-w-[150px]">Services</th>
                        <th className="border border-gray-300 p-2 w-24">Date</th>
                        <th className="border border-gray-300 p-2 w-24">Time</th>
                        <th className="border border-gray-300 p-2 w-32">Barber Name</th>
                        <th className="border border-gray-300 p-2 w-24">Status</th>
                        <th className="border border-gray-300 p-2 w-24">Total Amount</th>
                        <th className="border border-gray-300 p-2 w-24">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recentBookings.length > 0 ? (
                        recentBookings.map((reservation, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2">{reservation.reservationId || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.orderId || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.name || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.phoneNumber || "-"}</td>
                                <td className="border border-gray-300 p-2">
                                    {Array.isArray(reservation.serviceNames)
                                        ? reservation.serviceNames.join(", ")
                                        : "-"}
                                </td>
                                <td className="border border-gray-300 p-2">{reservation.date || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.time || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.barberName || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.status || "-"}</td>
                                <td className="border border-gray-300 p-2">{reservation.amount ? `Rp ${reservation.amount}` : "-"}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => deleteActiveBooking(reservation.reservationId || reservation.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11} className="text-center p-4 text-gray-500">
                                No reservations available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsTable;
