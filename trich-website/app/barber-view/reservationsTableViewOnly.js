"use client";
import React from "react";

const ReservationsTableViewOnly = ({ recentBookings }) => {
    return (
        <div className="border-collapse w-full">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-orange1 font-bold text-white">
                        <th className="border border-gray-300 p-2 w-32">Customer</th>
                        <th className="border border-gray-300 p-2 w-32">Phone</th>
                        <th className="border border-gray-300 p-2 w-32">Services</th>
                        <th className="border border-gray-300 p-2 w-24">Date</th>
                        <th className="border border-gray-300 p-2 w-24">Time</th>
                        <th className="border border-gray-300 p-2 w-32">Barber Name</th>
                        <th className="border border-gray-300 p-2 w-24">Status</th>
                        <th className="border border-gray-300 p-2 w-24">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {recentBookings.length > 0 ? (
                        recentBookings.map((reservation, index) => {
                            const prevDate = index > 0 ? recentBookings[index - 1].date : null;
                            const showSeparator = reservation.date !== prevDate;

                            return (
                                <React.Fragment key={index}>
                                    {showSeparator && index !== 0 && (
                                        <tr>
                                            <td colSpan={10} className="p-0">
                                                <div className="border-4 border-gray-400"></div>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="hover:bg-gray-50">
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
                                        <td className="border border-gray-300 p-2">{reservation.status || "unpaid"}</td>
                                        <td className="border border-gray-300 p-2">
                                            {reservation.amount ? `Rp ${reservation.amount}` : "-"}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={10} className="text-center p-4 text-gray-500">
                                No reservations available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsTableViewOnly;
