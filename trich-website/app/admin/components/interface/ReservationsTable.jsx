"use client";
import React from "react";

const ReservationsTable = ({ 
    recentBookings, 
    deleteActiveBooking 
}) => {
    return (
        <table className="border-collapse w-full border border-1 border-gray-300">
            <thead>
                <tr className="bg-orange1 font-bold text-white">
                    <th className="border border-1 border-gray-300 p-2 w-32">Order ID</th>
                    <th className="border border-1 border-gray-300 p-2 min-w-0">Customer</th>
                    <th className="border border-1 border-gray-300 p-2 w-32">Phone</th>
                    <th className="border border-1 border-gray-300 p-2 w-32">Services</th>
                    <th className="border border-1 border-gray-300 p-2 w-24">Date</th>
                    <th className="border border-1 border-gray-300 p-2 w-24">Time</th>
                    <th className="border border-1 border-gray-300 p-2 w-32">Barber ID</th>
                    <th className="border border-1 border-gray-300 p-2 w-24">Actions</th>
                </tr>
            </thead>
            <tbody>
                {recentBookings.length > 0 ? (
                    recentBookings.map((reservation, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-1 border-gray-300 p-2">{reservation.orderId || '-'}</td>
                            <td className="border border-1 border-gray-300 p-2">{reservation.name || '-'}</td>
                            <td className="border border-1 border-gray-300 p-2">{reservation.phoneNumber || '-'}</td>
                            <td className="border border-1 border-gray-300 p-2">
                                {Array.isArray(reservation.serviceIds) ? reservation.serviceIds.join(', ') : '-'}
                            </td>
                            <td className="border border-1 border-gray-300 p-2">{reservation.date || '-'}</td>
                            <td className="border border-1 border-gray-300 p-2">{reservation.time || '-'}</td>
                            <td className="border border-1 border-gray-300 p-2">{reservation.barberId || '-'}</td>
                            <td className="border border-1 border-gray-300 p-2">
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
                        <td colSpan="8" className="text-center p-4 text-gray-500">No reservations available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ReservationsTable;
