"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import withAuthAdmin from "./withAuthAdmin";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    fetchUserByEmail();
    fetchBookings();
  }, [users, bookings]);

  const fetchUserByEmail = async (email) => {
    try {
      const usersRef = collection(db, "user"); // Replace 'users' with your collection name
      const q = query(usersRef, where("email", "==", email)); // Case-sensitive equality check
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      } else {
        setUsers(querySnapshot.docs[0].data());
      }
      // const querySnapshot = await getDocs(collection(db, "user"));
      // const userData = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "active_booking"));
      let bookingData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

      const parseDateString = (dateString) => {
        const [dayOfWeek, monthDay, year] = dateString.split(", ");
        return new Date(`${monthDay}, ${year}`);
      };

      const parseTimeString = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      };

      bookingData = bookingData.sort((a, b) => {
        const dateA = parseDateString(a.date);
        const dateB = parseDateString(b.date);

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;

        const timeA = parseTimeString(a.time);
        const timeB = parseTimeString(b.time);

        if (timeA > timeB) return -1;
        if (timeA < timeB) return 1;

        return a.status - b.status;
      });

      setBookings(bookingData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const updateBookingStatusByBookingId = async (bookingId, newStatus) => {
    try {
      if (newStatus == 3) {
        const bookingCollectionRef = collection(db, "past_booking");
        await addDoc(bookingCollectionRef, {
          create_booking_date: new Date(),
          user_id: auth?.currentUser?.uid,
          service: pickedService.name,
          date: pickedDate,
          time: pickedTime,
          amount: pickedService.price,
          notes: notes,
          status: 1,
          booking_id: uuidv4(),
        });

        await deleteBooking(bookingId);
      }
      const bookingCollectionRef = collection(db, "active_booking");
      const q = query(
        bookingCollectionRef,
        where("booking_id", "==", bookingId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`No booking found with booking_id: ${bookingId}`);
      }

      const bookingDoc = querySnapshot.docs[0];
      const bookingRef = doc(db, "booking", bookingDoc.id);

      await updateDoc(bookingRef, { status: newStatus });

      console.log("Booking status updated successfully");
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const deleteBooking = async (booking_id) => {
    try {
      const bookingCollectionRef = collection(db, "active_booking");
      const q = query(
        bookingCollectionRef,
        where("booking_id", "==", booking_id)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`No booking found with booking_id: ${booking_id}`);
      }

      const bookingDoc = querySnapshot.docs[0];
      const bookingRef = doc(db, "booking", bookingDoc.id);

      await deleteDoc(bookingRef);
      console.log(`Booking with ID ${booking_id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting booking:", error);
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

  const migrateBooking = async () => {
    const bookingCollectionRef = collection(db, "booking");
    const activeBookingCollectionRef = collection(db, "active_booking");
    const pastBookingCollectionRef = collection(db, "past_booking");

    const bookingData = bookingCollectionRef.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
    for (docs in bookingData) {
      
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
                <td className="flex flex-row justify-between border border-1 border-solid border-black">
                  <p>{booking.date}</p>
                  <button
                    onClick={() => deleteBooking(booking.booking_id)}
                    className="text-white bg-orange1"
                  >
                    Delete
                  </button>
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
                  type="number"
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
        <div className="flex flex-row space-x-2 pb-12">
          <input
            type="text"
            placeholder="search customer"
            className="border border-1 border-orange1"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(searchEmail);
            }}
          />
          <button
            onClick={() => fetchUserByEmail(searchEmail)}
            className="px-4 bg-orange1 text-white"
          >
            Search
          </button>
        </div>
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
