"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  getDoc,
  getDocs,
  addDoc,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { getBooking, deleteBooking } from "@/utils/booking";
import { getQuota, addQuota, deleteQuota } from "@/utils/quota";

import { formatDate } from "@/hooks/time";

import withAuthAdmin from "./withAuthAdmin";
import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchEmail, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState();

  const [quotas, setQuotas] = useState([]);
  const [quotaDate, setQuotaDate] = useState(null);
  const [quotaQuota, setQuotaQuota] = useState(0);

  const [lastFetched, setLastFetched] = useState(null);
  const refreshSpan = 30 * 60 * 1000;

  // const [selectedUser, setSelectedUser] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!bookings.length || Date.now() - lastFetched > refreshSpan) {
      fetchActiveBookings();
      fetchQuotas();
    }
  }, []);

  const fetchUserByName = async (firstName) => {
    try {
      const usersRef = collection(db, "user");

      // Convert firstName to uppercase before querying
      const upperCaseFirstName = firstName.toUpperCase();

      const q = query(usersRef, where("first_name", "==", upperCaseFirstName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      } else {
        const userData = querySnapshot.docs[0].data();
        console.log("User found:", userData);
        setSearchedUser(userData); // Set the user data in state
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchActiveBookings = async () => {
    try {
      const response = await getBooking();

      if (response.success) {
        setBookings(response.data);
      }
      
    } catch (error) {
      console.error("Failed to fetch bookings on client:", error);
    }
    return;
  };

  const MoveFinishedBookings = async () => {
    const bookingRef = collection(db, "past_booking");
    try {
      // Filter hanya bookings dengan status 3
      const finishedBookings = bookings.filter(
        (tempBooking) => tempBooking.status == "3"
      );

      for (const tempBooking of finishedBookings) {
        try {
          // Tambahkan ke koleksi 'past_booking'
          await addDoc(bookingRef, {
            create_booking_date: tempBooking.create_booking_date,
            amount: tempBooking.amount,
            name: tempBooking.name,
            email: tempBooking.email,
            phone_number: tempBooking.phone_number,
            user_id: tempBooking.user_id,
            service: tempBooking.service,
            date: tempBooking.date,
            time: tempBooking.time,
            status: 3,
            booking_id: tempBooking.booking_id,
          });

          // Hapus dari koleksi 'active_booking'
          await deleteActiveBooking(tempBooking.booking_id);

          console.log(
            "Booking successfully moved and deleted:",
            tempBooking.booking_id
          );
        } catch (error) {
          console.error("Error moving booking:", error);
          ToastManager.notify("Status gagal diupdate", "error");
        }
      }
    } catch (error) {
      console.error("Error updating bookings:", error);
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

          await deleteActiveBooking(bookingId);
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

  const deleteActiveBooking = async (booking_id) => {
    try {
      const response = await deleteBooking(booking_id);

      if (response.success) {
        setBookings(
          bookings.filter((booking) => booking.booking_id !== booking_id)
        );
  
        ToastManager.notify(
          "Booking ID: " + booking_id + " berhasil dihapus!",
          "success"
        );
      } else {
        ToastManager.notify(
          "Booking ID: " + booking_id + " gagal dihapus!",
          "error"
        );
      }

    } catch (error) {
      ToastManager.notify("Booking gagal dihapus!", "error");
      console.error("Error deleting booking:", error);
    }
  };

  const fetchQuotas = async () => {
    try {
      const response = await getQuota();

      if (response.success) {
        setQuotas(quotaData);
      }
    } catch (error) {
      console.error("Failed to fetch quotas: ", error);
    }
  };

  const handleAddQuota = async () => {
    try {
      const reservationQuotaRef = collection(db, "reservation_quota");

      const quotaData = {
        quota_id: uuidv4(),
        date: quotaDate,
        quota: parseInt(quotaQuota),
      };

      await addDoc(reservationQuotaRef, quotaData);

      ToastManager.notify("Quota berhasil ditambahkan", "success");
      console.log("Quota added successfully");
    } catch (error) {
      ToastManager.notify("Quota gagal ditambahkan", "error");
      console.error("Failed to add quota: ", error);
    }
  };

  const handleDeleteQuota = async (quotaId) => {
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

  return (
    <div className="pt-32 p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="w-full">
        {/* button to clear finished bookigns */}
        <button
          onClick={MoveFinishedBookings}
          className="bg-orange1 font-semibold px-4 py-1 rounded-md text-white hover:bg-orange-400"
        >
          Clear Finished Bookings
        </button>

        <h2 className="text-lg font-semibold">Bookings</h2>
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-orange1 font-bold text-white">
              <th className="border border-1 border-solid border-black">
                Date
              </th>
              <th className="border border-1 border-solid border-black">
                First Name (email)
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
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="flex flex-row justify-between border border-1 border-solid border-black">
                  <p>{booking.date}</p>
                  <button
                    onClick={() => deleteActiveBooking(booking.booking_id)}
                    className="text-white bg-orange1"
                  >
                    Delete
                  </button>
                </td>
                <td className="space-x-2 border border-1 border-solid border-black">
                  {booking.name} ({booking.email})
                  {/* <button
                    onClick={() => handleProfileClick(booking.user_id)}
                    className="text-white bg-orange1"
                  >
                    Info
                  </button> */}
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
                  {booking.phone_number}
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
          <input
            type="number"
            placeholder="quota"
            className="border border-1 border-orange1"
            onChange={(e) => {
              setQuotaQuota(e.target.value);
            }}
          />
          <button
            onClick={() => handleAddQuota()}
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
                        onClick={() => handleDeleteQuota(quota.quota_id)}
                        className="text-white bg-orange1"
                      >
                        Delete
                      </button>
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
                {searchedUser ? searchedUser.first_name : "-"}
              </td>
              <td className="border border-1 border-solid border-black">
                {searchedUser ? searchedUser.email : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal
      {showModal && selectedUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Verify User</h2>
            <p>
              <strong>Nama: </strong>
              {selectedUser.first_name ? selectedUser.first_name : ""}
              {selectedUser.last_name ? selectedUser.last_name : ""}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>No Telepon:</strong> {selectedUser.phone_number}
            </p>
            <p>
              <strong>Alamat:</strong>{" "}
              {selectedUser.address ? selectedUser.address : "-"}
            </p>

            <div className="mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}

      <ToastContainer />
    </div>
  );
};

export default withAuthAdmin(AdminDashboard, "1SwH5R8BhLQB0mI5SNXg2LiQDj22");

