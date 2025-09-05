"use client";
import React from "react";
import ReservationsFilters from "./interface/ReservationsFilters";
import ReservationsTable from "./interface/ReservationsTable";

const ReservationsManagement = ({ 
    recentBookings,
    setRecentBookings,
    selectedDate, 
    setSelectedDate, 
    lastNBookings, 
    setLastNBookings,
    fetchRecentBookings,
    fetchBookingsByDate,
    deleteActiveBooking
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-orange1 text-white px-6 py-2 rounded-t-lg">
                <h2 className="text-xl font-semibold">Reservations Management</h2>
            </div>
            <div className="p-6">
                <ReservationsFilters 
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    lastNBookings={lastNBookings}
                    setLastNBookings={setLastNBookings}
                    fetchRecentBookings={fetchRecentBookings}
                    fetchBookingsByDate={fetchBookingsByDate}
                />
                <ReservationsTable 
                    recentBookings={recentBookings}
                    deleteActiveBooking={deleteActiveBooking}
                    setRecentBookings={setRecentBookings}
                />
            </div>
        </div>
    );
};

export default ReservationsManagement;
