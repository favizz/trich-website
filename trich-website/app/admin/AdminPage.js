"use client"
import React, { useEffect, useState } from 'react';
import { db } from "@/config/firebase";
import { collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore';

import withAuth from './withAuth';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchBookings();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userData);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
        setLoading(false);
    };

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "bookings"));
            const bookingData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookings(bookingData);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
        setLoading(false);
    };

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            await updateDoc(bookingRef, { status: newStatus });
            fetchBookings(); // Refresh bookings data
        } catch (error) {
            console.error("Failed to update booking:", error);
        }
    };

    return (
        <div className="p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
            <div>
                <h2 className="text-lg font-semibold">Users</h2>
                {users.map(user => (
                    <div key={user.id} className="p-2">
                        {user.first_name} {user.last_name} - {user.email}
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-lg font-semibold">Bookings</h2>
                {bookings.map(booking => (
                    <div key={booking.id} className="p-2">
                        <p>{booking.service} on {booking.date} at {booking.time}</p>
                        <p>Status: {booking.status} - <button onClick={() => updateBookingStatus(booking.id, 1)}>Set Status to 1</button></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withAuth(AdminDashboard, "igbQMReYImfAwDqwuqVWnylY0Kr1");
