"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
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

import { getBooking, deleteBooking } from "@/utils/booking";
import { getQuota, addQuota, deleteQuota } from "@/utils/quota";

import { formatDate } from "@/hooks/time";

import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";
import TableHead from "./components/TableHead";
import TableRow from "./components/TableRow";
import QuotaConfig from "./components/QuotaConfig";
import UserTable from "./components/UserTable";

const AdminDashboard = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const queryParam = searchParams.get("query");
    
    const [searchedUser, setSearchedUser] = useState(null);
    const [searchEmail, setEmail] = useState("");
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState();

    const [quotas, setQuotas] = useState([]);
    const [quotaDate, setQuotaDate] = useState(null);
    const [quotaQuota, setQuotaQuota] = useState(0);

    useEffect(() => {
        if (pathname === "/admin" && queryParam !== "123456") {
            router.replace("https://trich.id");
            // router.replace("http://localhost:3000");
        }
      }, [pathname, queryParam, router]);

    useEffect(() => {
        fetchActiveBookings();
        fetchQuotas();
    }, []);

    const fetchUserByName = async (firstName) => {
        try {
            const usersRef = collection(db, "user");

            // Convert firstName to uppercase before querying
            const upperCaseFirstName = firstName.toUpperCase();

            const q = query(
                usersRef,
                where("first_name", "==", upperCaseFirstName),
            );
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
                (tempBooking) => tempBooking.status == "3",
            );

            for (const tempBooking of finishedBookings) {
                try {
                    // Tambahkan ke koleksi 'past_booking'
                    // await addDoc(bookingRef, {
                    //     phone_number: tempBooking.phone_number,
                    //     service: tempBooking.service,
                    //     order_id: tempBooking.order_id,
                    //     booking_id: tempBooking.booking_id,
                    //     status: 3,
                    //     amount: tempBooking.amount,
                    //     name: tempBooking.name,
                    //     date: tempBooking.date,
                    //     time: tempBooking.time,
                    //     create_booking_date: tempBooking.create_booking_date,
                    // });

                    // Hapus dari koleksi 'active_booking'
                    await deleteActiveBooking(tempBooking.id);

                    console.log(
                        "Booking successfully moved and deleted:",
                        tempBooking.booking_id,
                    );
                } catch (error) {
                    console.error("Error moving booking:", error);
                    console.log(tempBooking);
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
                        (docs) => docs.booking_id == bookingId,
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
                where("booking_id", "==", bookingId),
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error(
                    `No booking found with booking_id: ${bookingId}`,
                );
            }

            const bookingDoc = querySnapshot.docs[0];
            const bookingRef = doc(db, "active_booking", bookingDoc.id);

            await updateDoc(bookingRef, { status: newStatus });
            ToastManager.notify(
                "Booking ID: " +
                    bookingId +
                    " diupdate menjadi " +
                    newStatus +
                    "!",
                "success",
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
                    bookings.filter(
                        (booking) => booking.id !== booking_id,
                    ),
                );

                ToastManager.notify(
                    "Booking ID: " + booking_id + " berhasil dihapus!",
                    "success",
                );
            } else {
                ToastManager.notify(
                    "Booking ID: " + booking_id + " gagal dihapus!",
                    "error",
                );
            }
        } catch (error) {
            ToastManager.notify("Booking gagal dihapus!", "error");
            console.log(booking_id);
            console.error("Error deleting booking:", error);
        }
    };

    const fetchQuotas = async () => {
        try {
            const response = await getQuota();

            if (response.success) {
                setQuotas(response.data);
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
            const q = query(
                quotaCollectionRef,
                where("quota_id", "==", quotaId),
            );
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
                "success",
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
                <button
                    onClick={MoveFinishedBookings}
                    className="bg-orange1 font-semibold px-4 py-1 rounded-md text-white hover:bg-orange-400"
                >
                    Clear Finished Bookings
                </button>

                <h2 className="text-lg font-semibold">Bookings</h2>
                <table className="border-collapse w-full">
                    <TableHead />
                    <tbody>
                        {bookings.map((booking, index) => (
                            <TableRow
                                booking={booking}
                                key={index}
                                deleteBooking={deleteActiveBooking}
                                status={status}
                                setStatus={setStatus}
                                updateStatus={updateBookingStatusByBookingId}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pt-12">
                <h2 className="text-lg font-semibold">Set Quota</h2>

                <QuotaConfig />

                <div className="flex flex-row space-x-2 pb-3">
                    <input
                        type="date"
                        className="border border-1 border-orange1"
                        onChange={(e) =>
                            setQuotaDate(formatDate(e.target.value))
                        }
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
                                              onClick={() =>
                                                  handleDeleteQuota(
                                                      quota.quota_id,
                                                  )
                                              }
                                              className="text-white bg-orange1"
                                          >
                                              Delete
                                          </button>
                                      </td>
                                      <td className="border border-1 border-solid border-black">
                                          {quota.quota}
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
                        (Search with Full Name!)
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
                <UserTable user={searchedUser} />
            </div>
            <ToastContainer />
        </div>
    );
};

// Email
// export default withAuthAdmin(AdminDashboard, "CLi6HLdICCdmFUpLsXIjfZICNam2");
export default AdminDashboard;