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
import { v4 as uuidv4 } from "uuid";

import withAuthAdmin from "./withAuthAdmin";
import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";

const timeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const AdminDashboard = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchEmail, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState();

  const [quotas, setQuotas] = useState([]);
  const [quotaDate, setQuotaDate] = useState(null);
  const [quotaTime, setQuotaTime] = useState(null);
  const [quotaQuota, setQuotaQuota] = useState(null);

  const [lastFetched, setLastFetched] = useState(null);
  const refreshSpan = 30 * 60 * 1000;

  useEffect(() => {
    if (!bookings.length || Date.now() - lastFetched > refreshSpan) {
      fetchUser();
      fetchBookings();
      fetchQuotas();
      setLastFetched(Date.now());
    }
  }, [bookings]);

  const fetchUserByName = async (firstName) => {
    try {
      const usersRef = collection(db, "user");
      const q = query(usersRef, where("first_name", "==", firstName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      } else {
        setSearchedUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchUser = async () => {
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
      const querySnapshot = await getDocs(collection(db, "active_booking"));
      let bookingData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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
        try {
          const bookingCollectionRef = collection(db, "past_booking");
          const tempBooking = bookings.find(
            (docs) => docs.booking_id == bookingId
          );
          await addDoc(bookingCollectionRef, {
            create_booking_date: tempBooking.create_booking_date,
            user_id: tempBooking.user_id,
            service: tempBooking.service,
            date: tempBooking.date,
            time: tempBooking.time,
            notes: tempBooking.notes,
            status: 3,
            booking_id: tempBooking.booking_id,
          });

          await deleteBooking(bookingId);
        } catch (error) {
          console.log(error);
          ToastManager.notify("Status gagal diupdate", "error");
        }
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
      const bookingRef = doc(db, "active_booking", bookingDoc.id);

      await updateDoc(bookingRef, { status: newStatus });
      ToastManager.notify(
        "Booking ID: " + bookingId + " diupdate menjadi " + newStatus + "!",
        "success"
      );
      console.log("Booking status updated successfully");
    } catch (error) {
      ToastManager.notify("Status gagal diubah!", "error");
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
      const bookingRef = doc(db, "active_booking", bookingDoc.id);

      await deleteDoc(bookingRef);
      setBookings(
        bookings.filter((booking) => booking.booking_id !== booking_id)
      );

      ToastManager.notify(
        "Booking ID: " + booking_id + " berhasil dihapus!",
        "success"
      );
    } catch (error) {
      ToastManager.notify("Booking gagal dihapus!", "error");
      console.error("Error deleting booking:", error);
    }
  };

  const getNameFromBooking = (userId) => {
    const user = users.find((u) => u.user_id === userId);
    if (user) {
      return user.first_name;
    } else {
      return "User not found";
    }
  };

  const fetchQuotas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reservation_quota"));
      const quotaData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuotas(quotaData);
    } catch (error) {
      console.error("Failed to fetch quotas: ", error);
    }
  };

  const addQuota = async () => {
    try {
      const reservationQuotaRef = collection(db, "reservation_quota");

      const quotaData = {
        quota_id: uuidv4(),
        date: quotaDate,
        time: quotaTime,
        quota: quotaQuota,
      };

      await addDoc(reservationQuotaRef, quotaData);

      ToastManager.notify("Quota berhasil ditambahkan", "success");
      console.log("Quota added successfully");
    } catch (error) {
      ToastManager.notify("Quota gagal ditambahkan", "error");
      console.error("Failed to add quota: ", error);
    }
  };

  const deleteQuota = async (quotaId) => {
    try {
      const quotaCollectionRef = collection(db, "reservation_quota");
      const q = query(quotaCollectionRef, where("quota_id", "==", quotaId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error(`No quota found`);
      }
      const quotaDoc = querySnapshot.docs[0];
      const quotaRef = doc(db, "reservation_quota", quotaDoc.id);

      await deleteDoc(quotaRef);

      setQuotas(quotas.filter((quota) => quota.quota_id !== quotaId));

      ToastManager.notify(
        "Quota ID: " + quotaId + " berhasil dihapus!",
        "success"
      );
    } catch (error) {
      ToastManager.notify("Quota gagal dihapus!", "error");
      console.error("Failed to delete quota: ", error);
    }
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
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
                First Name
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
                  {booking.name
                    ? booking.name
                    : getNameFromBooking(booking.user_id)}
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
        <h2 className="text-lg font-semibold">Set Quota</h2>
        <div className="flex flex-row space-x-2 pb-3">
          <input
            type="date"
            className="border border-1 border-orange1"
            onChange={(e) => setQuotaDate(formatDate(e.target.value))}
          />
          <form>
            <select
              id="timeSlots"
              name="timeSlots"
              value={quotaTime}
              onChange={(e) => setQuotaTime(e.target.value)}
            >
              <option value="" disabled>
                Select a time
              </option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </form>
          <input
            type="number"
            placeholder="quota"
            className="border border-1 border-orange1"
            onChange={(e) => {
              setQuotaQuota(e.target.value);
            }}
          />
          <button
            onClick={() => addQuota()}
            className="px-4 bg-orange1 text-white"
          >
            Set Quota
          </button>
        </div>
        <table className="w-1/2">
          <thead>
            <tr className="bg-orange1 font-bold text-white">
              <th className="border border-1 border-solid border-black">
                Date
              </th>
              <th className="border border-1 border-solid border-black">
                Time
              </th>
              <th className="border border-1 border-solid border-black">
                Quota
              </th>
            </tr>
          </thead>
          <tbody>
            {quotas.length > 0
              ? quotas.map((quota, idx) => (
                  <tr key={idx}>
                    <td className="border border-1 border-solid border-black flex flex-row justify-between">
                      {quota.date ? quota.date : "-"}
                      <button
                        onClick={() => deleteQuota(quota.quota_id)}
                        className="text-white bg-orange1"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="border border-1 border-solid border-black">
                      {quota.time ? quota.time : "-"}
                    </td>
                    <td className="border border-1 border-solid border-black">
                      {quota.quota ? quota.quota : "-"}
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>

      <div className="pt-12">
        <h2 className="text-lg font-semibold">
          Users{" "}
          <span className="text-red-600 font-base">
            (Search with First Name!)
          </span>
        </h2>
        <div className="flex flex-row space-x-2 pb-3">
          <input
            type="text"
            placeholder="search customer"
            className="border border-1 border-orange1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            onClick={() => fetchUserByName(searchEmail)}
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
            <tr>
              <td className="border border-1 border-solid border-black">
                {searchedUser ? searchedUser.phone_number : "No user found"}
              </td>
              <td className="border border-1 border-solid border-black">
                {searchedUser
                  ? searchedUser.first_name +
                    " " +
                    searchedUser.last_name +
                    "-" +
                    searchedUser.email
                  : "-"}
              </td>
              <td className="border border-1 border-solid border-black">
                {searchedUser ? searchedUser.email : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default withAuthAdmin(AdminDashboard, "igbQMReYImfAwDqwuqVWnylY0Kr1");
