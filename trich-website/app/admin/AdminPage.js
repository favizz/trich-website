"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

import withAuthAdmin from "./withAuthAdmin";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "user"));
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "booking"));
      let bookingData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      bookingData = bookingData.sort((a, b) => a.status - b.status);
      setBookings(bookingData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const updateBookingStatusByBookingId = async (bookingId, newStatus) => {
    try {
      // Step 1: Query the booking collection to find the document with the matching booking_id
      const bookingCollectionRef = collection(db, "booking");
      const q = query(bookingCollectionRef, where("booking_id", "==", bookingId));
      const querySnapshot = await getDocs(q);
  
      // Check if any documents were found
      if (querySnapshot.empty) {
        throw new Error(`No booking found with booking_id: ${bookingId}`);
      }
  
      // Assuming booking_id is unique, get the first matching document
      const bookingDoc = querySnapshot.docs[0];
      const bookingRef = doc(db, "booking", bookingDoc.id);
  
      // Step 2: Update the status of the found document
      await updateDoc(bookingRef, { status: newStatus });
  
      console.log("Booking status updated successfully");
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const getNameFromBooking = (userId) => {
    const user = users.find((u) => u.user_id === userId);
    if (user) {
      return user.first_name + " " + user.last_name;
    } else {
      return "User not found";
    }
  };

  return (
    <div className="pt-32 p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="w-full">
        <h2 className="text-lg font-semibold">Bookings</h2>
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-orange1 font-bold text-white">
              <th className="border border-1 border-solid border-black">
                Date
              </th>
              <th className="border border-1 border-solid border-black">
                Name
              </th>
              <th className="border border-1 border-solid border-black">
                Service
              </th>
              <th className="border border-1 border-solid border-black">
                Time
              </th>
              <th className="border border-1 border-solid border-black">
                Amount
              </th>
              <th className="border border-1 border-solid border-black">
                Status
              </th>
              <th className="border border-1 border-solid border-black">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="border border-1 border-solid border-black">
                  {booking.date}
                </td>
                <td className="border border-1 border-solid border-black">
                  {getNameFromBooking(booking.user_id)}
                </td>
                <td className="border border-1 border-solid border-black">
                  {booking.service}
                </td>
                <td className="border border-1 border-solid border-black">
                  {booking.time}
                </td>
                <td className="border border-1 border-solid border-black">
                  {booking.amount}
                </td>
                <td className="flex flex-row border border-1 border-solid border-black">
                  <input
                    className="text-center w-full"
                    placeholder={"current status:  " + booking.status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <button
                  className="bg-orange1"
                    onClick={() =>
                      updateBookingStatusByBookingId(booking.booking_id, status)
                    }
                  >
                    edit
                  </button>
                </td>
                <td className="border border-1 border-solid border-black">
                  {booking.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-12">
        <h2 className="text-lg font-semibold">Users</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-orange1 font-bold text-white">
              <th className="border border-1 border-solid border-black">
                No Telepon
              </th>
              <th className="border border-1 border-solid border-black">
                Nama
              </th>
              <th className="border border-1 border-solid border-black">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td className="border border-1 border-solid border-black">
                  {user.phone_number}
                </td>
                <td className="border border-1 border-solid border-black">
                  {user.first_name} {user.last_name} - {user.email}
                </td>
                <td className="border border-1 border-solid border-black">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuthAdmin(AdminDashboard, "igbQMReYImfAwDqwuqVWnylY0Kr1");
