"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/profile/${firstName}`);
            if (!res.ok) throw new Error("User not found");
            const json = await res.json();
            setSearchedUser(json);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            ToastManager.notify("User tidak ditemukan", "error");
        }
    };

    const fetchActiveBookings = async () => {
        const res = await fetch(`${SPRING_URL}/website/reservations`);
        const result = await res.json();
        setBookings(result);
    };

    const MoveFinishedBookings = async () => {
        try {
            // Filter hanya bookings dengan status 3
            const finishedBookings = bookings.filter(
                (tempBooking) => tempBooking.status == "3",
            );

            for (const tempBooking of finishedBookings) {
                try {
                    // Hapus dari koleksi 'active_booking'
                    await deleteActiveBooking(tempBooking.booking_id);

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
        const res = await fetch(`${SPRING_URL}/website/reservations`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservationId: bookingId, status: newStatus }),
        });
        if (!res.ok) throw new Error();
        ToastManager.notify(`Booking ID: ${bookingId} updated to ${newStatus}!`);
    };

    const deleteActiveBooking = async (bookingId) => {
        try {
            const res = await fetch(`${SPRING_URL}/website/reservations/${bookingId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            setBookings(bookings.filter(b => b.booking_id !== bookingId));
            ToastManager.notify("Booking ID: " + bookingId + " berhasil dihapus!", "success");
        } catch (err) {
            ToastManager.notify("Booking gagal dihapus!", "error");
            console.error(err);
        }
    };

    const fetchQuotas = async () => {
        try {
            const res = await fetch(`${SPRING_URL}/website/quota`);
            const json = await res.json();
            setQuotas(json);
        } catch (error) {
            console.error("Failed to fetch quotas: ", error);
        }
    };

    const handleAddQuota = async () => {
        try {
            const res = await fetch(`${SPRING_URL}/website/quota/custom`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: quotaDate, quota: parseInt(quotaQuota) }),
            });
            if (!res.ok) throw new Error();
            ToastManager.notify("Quota added!");
            fetchQuotas();
        } catch (error) {
            ToastManager.notify("Quota gagal ditambahkan", "error");
            console.error("Failed to add quota: ", error);
        }
    };

    const handleDeleteQuota = async (quotaId) => {
        try {
            const res = await fetch(`${SPRING_URL}/website/quota/${quotaId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            setQuotas(quotas.filter(q => q.quota_id !== quotaId));
            ToastManager.notify("Quota deleted!");
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