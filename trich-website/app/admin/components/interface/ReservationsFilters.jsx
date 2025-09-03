"use client";
import React from "react";

const ReservationsFilters = ({ 
    selectedDate, 
    setSelectedDate, 
    lastNBookings, 
    setLastNBookings,
    fetchRecentBookings,
    fetchBookingsByDate
}) => {
    return (
        <div className="mb-4 flex gap-4 items-center">
            <div className="flex gap-2 items-center">
                <label className="text-sm font-medium">Last N bookings:</label>
                <input
                    type="number"
                    placeholder="20"
                    className="border border-1 border-gray-300 p-2 rounded w-20 text-sm"
                    value={lastNBookings}
                    onChange={(e) => setLastNBookings(e.target.value)}
                    min="1"
                    max="100"
                />
                <button
                    onClick={() => fetchRecentBookings(lastNBookings)}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                    Get Recent
                </button>
            </div>
            <div className="flex gap-2 items-center">
                <label className="text-sm font-medium">Date:</label>
                <input
                    type="date"
                    className="border border-1 border-gray-300 p-2 rounded text-sm"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button
                    onClick={() => fetchBookingsByDate(selectedDate)}
                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                    Get By Date
                </button>
            </div>
        </div>
    );
};

export default ReservationsFilters;
