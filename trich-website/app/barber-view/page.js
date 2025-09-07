"use client";
import React, { useEffect, useState } from "react";
import ReservationsTableViewOnly from "./reservationsTableViewOnly";
import { fetchRecentBookings } from "../admin/components/DataFetching";
import ToastManager from "../components/toaster";

const RecentBookingsPage = () => {
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        fetchRecentBookings(20, setRecentBookings).catch((err) => {
            console.error("Failed to fetch bookings on page load:", err);
            ToastManager.notify("Failed to load recent bookings", "error");
        });
    }, []);

    return (
        <div className="p-4 mt-32 mb-12 mx-12">
            <h1 className="text-2xl font-bold mb-4">Recent Bookings</h1>
            <ReservationsTableViewOnly recentBookings={recentBookings} />
        </div>
    );
};

export default RecentBookingsPage;
