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
    
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState();

    // Quota states
    const [quotas, setQuotas] = useState([]);
    const [quotaDate, setQuotaDate] = useState("");
    const [quotaQuota, setQuotaQuota] = useState("");

    // New states for additional tables
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [dateBookings, setDateBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(""); // No default value
    const [lastNBookings, setLastNBookings] = useState(""); // No default value

    // New form states
    const [newService, setNewService] = useState({ 
        name: "", 
        price: "", 
        duration: "", 
        point: "", 
        startTime: "", 
        endTime: "", 
        availableDays: [] 
    });
    const [newBarber, setNewBarber] = useState({ name: "", chairNumber: "", available: true });
    const [newUser, setNewUser] = useState({ name: "", phoneNumber: "", point: "" });
    const [editingService, setEditingService] = useState(null);
    const [editingBarber, setEditingBarber] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    // Quota management states
    const [wdQuotaValue, setWdQuotaValue] = useState("");
    const [baseQuotaValue, setBaseQuotaValue] = useState("");
    const [searchUserPhone, setSearchUserPhone] = useState("");

    // Helper function for day mapping
    const isDaySelected = (abbreviatedDay, availableDays) => {
        if (!availableDays || !Array.isArray(availableDays)) return false;
        
        const dayMapping = {
            'SUN': 'SUNDAY',
            'MON': 'MONDAY', 
            'TUE': 'TUESDAY',
            'WED': 'WEDNESDAY',
            'THU': 'THURSDAY',
            'FRI': 'FRIDAY',
            'SAT': 'SATURDAY'
        };
        
        const fullDayName = dayMapping[abbreviatedDay];
        return availableDays.includes(fullDayName);
    };

    useEffect(() => {
        if (pathname === "/admin" && queryParam !== "123456") {
            router.replace("https://trich.id");
            // router.replace("http://localhost:3000");
        }
      }, [pathname, queryParam, router]);

    useEffect(() => {
        fetchActiveBookings();
        fetchQuotas();
        fetchServices();
        fetchBarbers();
        fetchRecentBookings(20); // Get last 20 reservations automatically
        fetchCurrentQuotas(); // Fetch current WD and Default quotas on mount
    }, []); // Remove lastNBookings dependency to prevent infinite loop

    // Existing functions
    const fetchActiveBookings = async () => {
        try {
            // Simple fetch from last 50 reservations
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/last/50`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const result = await res.json();
                setBookings(result);
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
            ToastManager.notify("Failed to fetch reservations", "error");
                setBookings([]);
        }
    };

    // New API functions for services
    const fetchServices = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services`);
            if (!res.ok) throw new Error("Failed to fetch services");
            const result = await res.json();
                setServices(result);
        } catch (error) {
            console.error("Failed to fetch services:", error);
            ToastManager.notify("Failed to fetch services", "error");
        }
    };

    const createService = async () => {
        if (!newService.name || !newService.price || !newService.duration || 
            newService.point === undefined || !newService.startTime || 
            !newService.endTime || !newService.availableDays || newService.availableDays.length === 0) {
            ToastManager.notify("Please fill in all fields including at least one available day", "warning");
            return;
        }
        
        if (newService.name.trim() === "" || newService.price <= 0 || newService.duration <= 0) {
            ToastManager.notify("Please enter valid values for name, price, and duration", "warning");
            return;
        }
        
        try {
            // Map abbreviated day names to full day names for backend compatibility
            const dayMapping = {
                'SUN': 'SUNDAY',
                'MON': 'MONDAY', 
                'TUE': 'TUESDAY',
                'WED': 'WEDNESDAY',
                'THU': 'THURSDAY',
                'FRI': 'FRIDAY',
                'SAT': 'SATURDAY'
            };
            
            // Ensure all required fields are properly formatted
            const serviceData = {
                name: newService.name || '',
                price: parseFloat(newService.price) || 0,
                duration: parseInt(newService.duration) || 0,
                point: parseInt(newService.point) || 0,
                startTime: newService.startTime || '',
                endTime: newService.endTime || '',
                availableDays: (newService.availableDays || []).map(day => dayMapping[day] || day)
            };
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceData),
            });
            
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Service creation failed:", res.status, errorText);
                throw new Error(`Failed to create service: ${res.status}`);
            }
            
            ToastManager.notify("Service created successfully!", "success");
            setNewService({ 
                name: "", 
                price: "", 
                duration: "", 
                point: "", 
                startTime: "", 
                endTime: "", 
                availableDays: [] 
            });
            fetchServices();
        } catch (error) {
            console.error("Failed to create service:", error);
            ToastManager.notify("Failed to create service", "error");
        }
    };

    const updateService = async (serviceId) => {
        try {
            // Map abbreviated day names to full day names for backend compatibility
            const dayMapping = {
                'SUN': 'SUNDAY',
                'MON': 'MONDAY', 
                'TUE': 'TUESDAY',
                'WED': 'WEDNESDAY',
                'THU': 'THURSDAY',
                'FRI': 'FRIDAY',
                'SAT': 'SATURDAY'
            };
            
            // Ensure all required fields are present and valid
            const serviceData = {
                id: editingService.id,
                name: editingService.name || '',
                price: editingService.price || 0,
                duration: editingService.duration || 0,
                point: editingService.point || 0,
                startTime: editingService.startTime || '',
                endTime: editingService.endTime || '',
                availableDays: (editingService.availableDays || []).map(day => dayMapping[day] || day)
            };
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services/${serviceId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceData),
            });
            
            if (!res.ok) throw new Error("Failed to update service");
            ToastManager.notify("Service updated successfully!", "success");
            setEditingService(null);
            fetchServices();
        } catch (error) {
            console.error("Failed to update service:", error);
            ToastManager.notify("Failed to update service", "error");
        }
    };

    const deleteService = async (serviceId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services/${serviceId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete service");
            ToastManager.notify("Service deleted successfully!", "success");
            fetchServices();
        } catch (error) {
            console.error("Failed to delete service:", error);
            ToastManager.notify("Failed to delete service", "error");
        }
    };

    // New API functions for barbers
    const fetchBarbers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber`);
            if (!res.ok) throw new Error("Failed to fetch barbers");
            const result = await res.json();
                setBarbers(result);
        } catch (error) {
            console.error("Failed to fetch barbers:", error);
            ToastManager.notify("Failed to fetch barbers", "error");
        }
    };

    const createBarber = async () => {
        if (!newBarber.name || !newBarber.chairNumber || newBarber.available === undefined) {
            ToastManager.notify("Please fill in all fields before adding barber", "warning");
            return;
        }
        
        if (newBarber.name.trim() === "" || newBarber.chairNumber <= 0) {
            ToastManager.notify("Please enter valid values for name and chair number", "warning");
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBarber),
            });
            if (!res.ok) throw new Error("Failed to create barber");
            ToastManager.notify("Barber created successfully!", "success");
            setNewBarber({ name: "", chairNumber: "", available: true });
            fetchBarbers();
        } catch (error) {
            console.error("Failed to create barber:", error);
            ToastManager.notify("Failed to create barber", "error");
        }
    };

    const updateBarber = async (barberId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber/${barberId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingBarber),
            });
            if (!res.ok) throw new Error("Failed to update barber");
            ToastManager.notify("Barber updated successfully!", "success");
            setEditingBarber(null);
            fetchBarbers();
        } catch (error) {
            console.error("Failed to update barber:", error);
            ToastManager.notify("Failed to update barber", "error");
        }
    };

    const deleteBarber = async (barberId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber/${barberId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete barber");
            ToastManager.notify("Barber deleted successfully!", "success");
            fetchBarbers();
        } catch (error) {
            console.error("Failed to delete barber:", error);
            ToastManager.notify("Failed to delete barber", "error");
        }
    };

    // New API functions for users
    const createUser = async () => {
        if (!newUser.name || !newUser.phoneNumber || newUser.point === undefined) {
            ToastManager.notify("Please fill in all fields before adding user", "warning");
            return;
        }
        
        if (newUser.name.trim() === "" || newUser.phoneNumber.trim() === "") {
            ToastManager.notify("Name and phone number cannot be empty", "warning");
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            if (!res.ok) throw new Error("Failed to create user");
            ToastManager.notify("User created successfully!", "success");
            setNewUser({ name: "", phoneNumber: "", point: 0 });
        } catch (error) {
            console.error("Failed to create user:", error);
            ToastManager.notify("Failed to create user", "error");
        }
    };

    const updateUser = async (phoneNumber) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/user`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingUser),
            });
            if (!res.ok) throw new Error("Failed to update user");
            ToastManager.notify("User updated successfully!", "success");
            setEditingUser(null);
            // fetchUsers(); // This line was removed as per the edit hint
        } catch (error) {
            console.error("Failed to update user:", error);
            ToastManager.notify("Failed to update user", "error");
        }
    };

    const deleteUser = async (phoneNumber) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/user/${phoneNumber}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete user");
            ToastManager.notify("User deleted successfully!", "success");
            // fetchUsers(); // This line was removed as per the edit hint
        } catch (error) {
            console.error("Failed to delete user:", error);
            ToastManager.notify("Failed to delete user", "error");
        }
    };

    // New API functions for enhanced booking queries
    const fetchRecentBookings = async (n) => {
        try {
            // Debug logging
            console.log("fetchRecentBookings called with parameter:", n, "Type:", typeof n);
            
            // Ensure n is a valid number
            if (!n || n === "") {
                console.log("N validation failed - n:", n);
                ToastManager.notify("Please enter a number first", "warning");
                return;
            }
            
            const validN = parseInt(n);
            if (isNaN(validN) || validN < 1 || validN > 100) {
                throw new Error("Invalid number: must be between 1 and 100");
            }
            
            console.log("Making API call to:", `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/last/${validN}`);
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/last/${validN}`);
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error(`Bad request: Invalid parameter '${validN}'`);
                }
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const result = await res.json();
            setRecentBookings(result);
        } catch (error) {
            console.error("Failed to fetch recent bookings:", error);
            ToastManager.notify(`Failed to fetch recent bookings: ${error.message}`, "error");
            setRecentBookings([]);
        }
    };

    const fetchBookingsByDate = async (date) => {
        try {
            // Debug logging
            console.log("fetchBookingsByDate called with parameter:", date, "Type:", typeof date);
            
            // Ensure date is a valid string
            if (!date || typeof date !== 'string') {
                console.log("Date validation failed - date:", date, "type:", typeof date);
                ToastManager.notify("Please select a date first", "warning");
                return;
            }
            
            console.log("Making API call to:", `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/date/${date}`);
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/date/${date}`);
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error(`Bad request: Invalid date '${date}'`);
                }
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const result = await res.json();
            setRecentBookings(result); // Update the main table with date-filtered results
        } catch (error) {
            console.error("Failed to fetch date bookings:", error);
            ToastManager.notify(`Failed to fetch date bookings: ${error.message}`, "error");
            setRecentBookings([]);
        }
    };

    // Existing functions continue...
    const MoveFinishedBookings = async () => {
        try {
            // Filter hanya reservations dengan status 3
            const finishedReservations = bookings.filter(
                (tempReservation) => tempReservation.status == "3",
            );

            for (const tempReservation of finishedReservations) {
                try {
                    // Hapus dari koleksi 'active_reservations'
                    await deleteActiveBooking(tempReservation.reservationId || tempReservation.booking_id || tempReservation.id);

                } catch (error) {
                    console.error("Error moving reservation:", error);
                    console.log(tempReservation);
                    ToastManager.notify("Status gagal diupdate", "error");
                }
            }
        } catch (error) {
            console.error("Error updating reservations:", error);
        }
    };

    const updateBookingStatusByBookingId = async (bookingId, newStatus) => {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservationId: bookingId, status: newStatus }),
        });
        if (!res.ok) throw new Error();
        ToastManager.notify(`Booking ID: ${bookingId} updated to ${newStatus}!`);
            fetchActiveBookings(); // Refresh the list
        } catch (error) {
            ToastManager.notify("Failed to update booking status", "error");
            console.error(error);
        }
    };

    const deleteActiveBooking = async (bookingId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/${bookingId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            setBookings(bookings.filter(b => (b.reservationId || b.booking_id || b.id) !== bookingId));
            ToastManager.notify("Booking ID: " + bookingId + " berhasil dihapus!", "success");
        } catch (err) {
            ToastManager.notify("Booking gagal dihapus!", "error");
            console.error(err);
        }
    };

    const fetchQuotas = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota`);
            if (!res.ok) throw new Error("Failed to fetch quotas");
            const result = await res.json();
            setQuotas(result);
        } catch (error) {
            console.error("Failed to fetch quotas:", error);
            ToastManager.notify("Failed to fetch quotas", "error");
                setQuotas([]);
        }
    };

    const handleAddQuota = async () => {
        if (!quotaDate || !quotaQuota || quotaQuota <= 0) {
            ToastManager.notify("Please enter a valid date and quota value", "warning");
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/custom`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quota: parseInt(quotaQuota),
                    date: quotaDate,
                    quota_id: generateQuotaId() // Generate a unique ID
                }),
            });
            
            if (!res.ok) {
                if (res.status === 400) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.message || "Invalid quota data. Please check your input.");
                }
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            ToastManager.notify("Custom quota set successfully!", "success");
            setQuotaDate("");
            setQuotaQuota(0);
            fetchQuotas();
        } catch (error) {
            console.error("Failed to set custom quota:", error);
            ToastManager.notify(error.message || "Failed to set custom quota", "error");
        }
    };

    const generateQuotaId = () => {
        // Generate a proper UUID v4 format
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const handleDeleteQuota = async (quotaId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/${quotaId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            ToastManager.notify("Quota deleted!");
            fetchQuotas();
        } catch (error) {
            ToastManager.notify("Gagal menghapus quota", "error");
            console.error("Failed to delete quota: ", error);
        }
    };





    const fetchCurrentQuotas = async () => {
        try {
            // Fetch WD Quota
            const wdRes = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/wd`);
            if (wdRes.ok) {
                const wdResult = await wdRes.json();
                setWdQuotaValue(wdResult.quota || "");
            }
        } catch (error) {
            console.error("Failed to fetch WD quota:", error);
        }

        try {
            // Fetch Default Quota
            const defaultRes = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/default`);
            if (defaultRes.ok) {
                const defaultResult = await defaultRes.json();
                setBaseQuotaValue(defaultResult.quota || "");
            }
        } catch (error) {
            console.error("Failed to fetch Default quota:", error);
        }
    };



    const setWdQuota = async () => {
        if (!wdQuotaValue || wdQuotaValue <= 0) {
            ToastManager.notify("Please enter a valid WD quota value", "warning");
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/wd?value=${parseInt(wdQuotaValue)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            ToastManager.notify("WD Quota set successfully!", "success");
            fetchCurrentQuotas(); // Refresh the values
        } catch (error) {
            console.error("Failed to set WD quota:", error);
            ToastManager.notify("Failed to set WD quota", "error");
        }
    };

    const setBaseQuota = async () => {
        if (!baseQuotaValue || baseQuotaValue <= 0) {
            ToastManager.notify("Please enter a valid Default quota value", "warning");
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/default?value=${parseInt(baseQuotaValue)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            ToastManager.notify("Default Quota set successfully!", "success");
            fetchCurrentQuotas(); // Refresh the values
        } catch (error) {
            console.error("Failed to set Default quota:", error);
            ToastManager.notify("Failed to set Default quota", "error");
        }
    };



    const searchUser = async () => {
        if (!searchUserPhone || searchUserPhone.trim() === "") {
            ToastManager.notify("Please enter a phone number to search", "warning");
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/user/${searchUserPhone}`);
            if (!res.ok) {
                if (res.status === 404) {
                    ToastManager.notify("User not found", "warning");
                    setEditingUser(null);
                    return;
                }
                throw new Error("Failed to fetch user");
            }
            const user = await res.json();
            setEditingUser(user);
            ToastManager.notify("User found successfully!", "success");
        } catch (error) {
            console.error("Failed to search user:", error);
            ToastManager.notify("Failed to search user", "error");
            setEditingUser(null);
        }
    };

    return (
        <div className="pt-32 p-4 min-h-screen">
            
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

                {/* Main Management Container */}
                <div className="space-y-8">
                    
                    {/* Reservations Management Section */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="bg-orange1 text-white px-6 py-4 rounded-t-lg">
                            <h2 className="text-xl font-semibold">Reservations Management</h2>
                            <p className="text-orange-100 text-sm mt-1">Manage and monitor all reservations</p>
                </div>
                        <div className="p-6">
                            {/* Combined Reservations Table */}
                <table className="border-collapse w-full border border-1 border-gray-300">
                    <thead>
                        <tr className="bg-orange1 font-bold text-white">
                                        <th className="border border-1 border-gray-300 p-2 w-32">Order ID</th>
                                        <th className="border border-1 border-gray-300 p-2 min-w-0">Customer</th>
                                        <th className="border border-1 border-gray-300 p-2 w-32">Phone</th>
                                        <th className="border border-1 border-gray-300 p-2 w-32">Services</th>
                                        <th className="border border-1 border-gray-300 p-2 w-24">Date</th>
                                        <th className="border border-1 border-gray-300 p-2 w-24">Time</th>
                                        <th className="border border-1 border-gray-300 p-2 w-32">Barber ID</th>
                                        <th className="border border-1 border-gray-300 p-2 w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                                    {recentBookings.length > 0 ? (
                                        recentBookings.map((reservation, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                                <td className="border border-1 border-gray-300 p-2">{reservation.orderId || '-'}</td>
                                                <td className="border border-1 border-gray-300 p-2">{reservation.name || '-'}</td>
                                                <td className="border border-1 border-gray-300 p-2">{reservation.phoneNumber || '-'}</td>
                                                <td className="border border-1 border-gray-300 p-2">
                                                    {Array.isArray(reservation.serviceIds) ? reservation.serviceIds.join(', ') : '-'}
                                                </td>
                                                <td className="border border-1 border-gray-300 p-2">{reservation.date || '-'}</td>
                                                <td className="border border-1 border-gray-300 p-2">{reservation.time || '-'}</td>
                                                <td className="border border-1 border-gray-300 p-2">{reservation.barberId || '-'}</td>
                                                <td className="border border-1 border-gray-300 p-2">
                                                    <button
                                                        onClick={() => deleteActiveBooking(reservation.reservationId || reservation.id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                            <td colSpan="8" className="text-center p-4 text-gray-500">No reservations available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                        </div>
            </div>

                    {/* User Management Section */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="bg-orange1 text-white px-6 py-4 rounded-t-lg">
                            <h2 className="text-xl font-semibold">User Management</h2>
                            <p className="text-orange-100 text-sm mt-1">Manage and view user information</p>
                        </div>
                        <div className="p-6">
                            {/* Search User Form - Above Table */}
                            <div className="bg-gray-100 p-3 rounded-lg mb-2">
                                <div className="flex flex-row space-x-2">
                    <input
                                        type="text"
                                        placeholder="Phone Number (+62...)"
                                        className="border border-1 border-orange1 p-2 flex-1"
                                        value={searchUserPhone}
                                        onChange={(e) => setSearchUserPhone(e.target.value)}
                    />
                    <button
                                        onClick={() => searchUser()}
                                        className="px-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                                        Search User
                    </button>
                                </div>
                            </div>

                            {/* Users Table */}
                            <table className="border-collapse w-full">
                    <thead>
                        <tr className="bg-orange1 font-bold text-white">
                                        <th className="border border-1 border-solid border-black p-2 w-40">Phone Number</th>
                                        <th className="border border-1 border-solid border-black p-2 min-w-0">Name</th>
                                        <th className="border border-1 border-solid border-black p-2 w-24">Points</th>
                                        <th className="border border-1 border-solid border-black p-2 w-24">Actions</th>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-1 border-solid border-black p-2">
                    <input
                                                type="text"
                                                placeholder="Phone Number (+62...)"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newUser.phoneNumber}
                                                onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="text"
                                                placeholder="User Name"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newUser.name}
                                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="number"
                                                placeholder="Points"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newUser.point}
                                                onChange={(e) => setNewUser({...newUser, point: parseInt(e.target.value) || 0})}
                                                min="0"
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                    <button
                                                onClick={createUser}
                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                    >
                                                Add User
                    </button>
                                        </td>
                        </tr>
                    </thead>
                    <tbody>
                                    {editingUser ? (
                                        <tr className="border border-1 border-solid border-black bg-yellow-50">
                                            <td className="border border-1 border-solid border-black p-2">
                                                <input
                                                    type="text"
                                                    value={editingUser?.phoneNumber || ""}
                                                    onChange={(e) => setEditingUser({...editingUser, phoneNumber: e.target.value})}
                                                    className="w-full p-1"
                                                />
                                            </td>
                                            <td className="border border-1 border-solid border-black p-2">
                                                <input
                                                    type="text"
                                                    value={editingUser?.name || ""}
                                                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                                    className="w-full p-1"
                                                />
                                            </td>
                                            <td className="border border-1 border-solid border-black p-2">
                                                <input
                                                    type="number"
                                                    value={editingUser?.point || 0}
                                                    onChange={(e) => setEditingUser({...editingUser, point: parseInt(e.target.value)})}
                                                    className="w-full p-1"
                                                />
                                            </td>
                                            <td className="border border-1 border-solid border-black p-2">
                                                <div className="flex space-x-1 w-full">
                                        <button
                                                        onClick={() => updateUser(editingUser.phoneNumber)}
                                                        className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                        title="Save Changes"
                                        >
                                                        💾
                                        </button>
                                                    <button
                                                        onClick={() => setEditingUser(null)}
                                                        className="flex-1 px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                        title="Cancel"
                                                    >
                                                        ❌
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(editingUser.phoneNumber)}
                                                        className="flex-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                        title="Delete User"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                    </td>
                                </tr>
                                    ) : null}
                                    {editingUser ? (
                                        <tr>
                                            <td colSpan="4" className="text-center p-2 text-gray-500 bg-gray-50">
                                                Editing user: {editingUser.name}
                                            </td>
                                        </tr>
                        ) : (
                            <tr>
                                            <td colSpan="4" className="text-center p-4 text-gray-500 bg-gray-50">
                                                Search for a user to view/edit their information
                                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                        </div>
            </div>

                    {/* Services Management Section */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="bg-orange1 text-white px-6 py-4 rounded-t-lg">
                            <h2 className="text-xl font-semibold">Services Management</h2>
                            <p className="text-orange-100 text-sm mt-1">Manage and add new services</p>
                        </div>
                        <div className="p-6">
            {/* Services Table */}
                            <table className="border-collapse w-full">
                    <thead>
                        <tr className="bg-orange1 font-bold text-white">
                                            <th className="border border-1 border-solid border-black p-2 w-32">ID</th>
                                            <th className="border border-1 border-solid border-black p-2 min-w-0">Name</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Price</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Duration</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Points</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Start Time</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">End Time</th>
                                            <th className="border border-1 border-solid border-black p-2 w-32">Available Days</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Actions</th>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-1 border-solid border-black p-2"></td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="text"
                                                placeholder="Service Name"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newService.name}
                                                onChange={(e) => setNewService({...newService, name: e.target.value})}
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="number"
                                                placeholder="Price ($)"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newService.price}
                                                onChange={(e) => setNewService({...newService, price: e.target.value})}
                                                min="0"
                                                step="0.01"
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="number"
                                                placeholder="Duration (min)"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newService.duration}
                                                onChange={(e) => setNewService({...newService, duration: e.target.value})}
                                                min="1"
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="number"
                                                placeholder="Points"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newService.point}
                                                onChange={(e) => setNewService({...newService, point: e.target.value})}
                                                min="0"
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="time"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newService.startTime}
                                                onChange={(e) => setNewService({...newService, startTime: e.target.value})}
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <input
                                                type="time"
                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                value={newService.endTime}
                                                onChange={(e) => setNewService({...newService, endTime: e.target.value})}
                                            />
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <div className="flex flex-wrap gap-1">
                                                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                                                    <button
                                                        key={day}
                                                        type="button"
                                                        onClick={() => {
                                                            const currentDays = newService.availableDays || [];
                                                            const newDays = currentDays.includes(day)
                                                                ? currentDays.filter(d => d !== day)
                                                                : [...currentDays, day];
                                                            setNewService({...newService, availableDays: newDays});
                                                        }}
                                                        className={`px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                                            newService.availableDays && newService.availableDays.includes(day)
                                                                ? 'bg-orange1 text-white hover:bg-orange-600'
                                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                        }`}
                                                    >
                                                        {day.slice(0, 3)}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="border border-1 border-solid border-black p-2">
                                            <button
                                                onClick={createService}
                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                                            >
                                                Add Service
                                            </button>
                                        </td>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                            <tr key={index} className="border border-1 border-solid border-black">
                                                <td className="border border-1 border-solid border-black p-2">{service.id || service.serviceId || '-'}</td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingService?.name || ""}
                                                            onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        service.name || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <input
                                                            type="number"
                                                            value={editingService?.price || ""}
                                                            onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        service.price || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <input
                                                            type="number"
                                                            value={editingService?.duration || ""}
                                                            onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        service.duration || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <input
                                                            type="number"
                                                            value={editingService?.point || ""}
                                                            onChange={(e) => setEditingService({...editingService, point: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        service.point || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <input
                                                            type="time"
                                                            value={editingService?.startTime || ""}
                                                            onChange={(e) => setEditingService({...editingService, startTime: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        service.startTime || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <input
                                                            type="time"
                                                            value={editingService?.endTime || ""}
                                                            onChange={(e) => setEditingService({...editingService, endTime: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        service.endTime || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <div className="flex flex-col space-y-2">
                                                            <div className="text-sm font-medium text-gray-700 mb-1">Click days to toggle:</div>
                                                                                                                    <div className="flex flex-wrap gap-1">
                                                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => {
                                                                const dayMapping = {
                                                                    'SUN': 'SUNDAY',
                                                                    'MON': 'MONDAY', 
                                                                    'TUE': 'TUESDAY',
                                                                    'WED': 'WEDNESDAY',
                                                                    'THU': 'THURSDAY',
                                                                    'FRI': 'FRIDAY',
                                                                    'SAT': 'SATURDAY'
                                                                };
                                                                const fullDayName = dayMapping[day];
                                                                const isSelected = isDaySelected(day, editingService.availableDays);
                                                                
                                                                return (
                                        <button
                                                                        key={day}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const currentDays = editingService.availableDays || [];
                                                                            const newDays = currentDays.includes(fullDayName)
                                                                                ? currentDays.filter(d => d !== fullDayName)
                                                                                : [...currentDays, fullDayName];
                                                                            setEditingService({...editingService, availableDays: newDays});
                                                                        }}
                                                                        className={`px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                                                                            isSelected
                                                                                ? 'bg-orange1 text-white hover:bg-orange-600'
                                                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                                        }`}
                                                                    >
                                                                        {day.slice(0, 3)}
                                        </button>
                                                                );
                                                            })}
                                                        </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-wrap gap-1">
                                                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                                                                <span key={day} className={`text-xs px-2 py-1 rounded cursor-pointer transition-colors ${
                                                                    isDaySelected(day, service.availableDays)
                                                                        ? 'bg-orange1 text-white'
                                                                        : 'bg-gray-200 text-gray-600'
                                                                }`}>
                                                                    {day.slice(0, 3)}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                    </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingService?.id === service.id ? (
                                                        <div className="flex space-x-1 w-full">
                                                            <button
                                                                onClick={() => updateService(service.id)}
                                                                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                                title="Save Changes"
                                                            >
                                                                💾
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingService(null)}
                                                                className="flex-1 px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                                title="Cancel"
                                                            >
                                                                ❌
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex space-x-1 w-full">
                                                            <button
                                                                onClick={() => setEditingService({
                                                                    id: service.id || service.serviceId,
                                                                    name: service.name || '',
                                                                    price: service.price || '',
                                                                    duration: service.duration || '',
                                                                    point: service.point || '',
                                                                    startTime: service.startTime || '',
                                                                    endTime: service.endTime || '',
                                                                    availableDays: service.availableDays || []
                                                                })}
                                                                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                                title="Edit Service"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                onClick={() => deleteService(service.id || service.serviceId)}
                                                                className="flex-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                                title="Delete Service"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                    <td colSpan="9" className="text-center p-4 text-gray-500 bg-gray-50">
                                        No services available
                                    </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                        </div>
            </div>

                    {/* Barbers Management Section */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="bg-orange1 text-white px-6 py-4 rounded-t-lg">
                            <h2 className="text-xl font-semibold">Barbers Management</h2>
                            <p className="text-orange-100 text-sm mt-1">Manage and add new barbers</p>
                        </div>
                        <div className="p-6">
            {/* Barbers Table */}
                            <table className="border-collapse w-full">
                    <thead>
                        <tr className="bg-orange1 font-bold text-white">
                                            <th className="border border-1 border-solid border-black p-2 w-32">ID</th>
                                            <th className="border border-1 border-solid border-black p-2 min-w-0">Name</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Chair Number</th>
                                            <th className="border border-1 border-solid border-black p-2 w-24">Available</th>
                                            <th className="border border-1 border-solid border-black p-2 w-12">Actions</th>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="border border-1 border-solid border-black p-2"></td>
                                            <td className="border border-1 border-solid border-black p-2">
                                                <input
                                                    type="text"
                                                    placeholder="Barber Name"
                                                    className="border border-1 border-orange1 p-1 w-full text-sm"
                                                    value={newBarber.name}
                                                    onChange={(e) => setNewBarber({...newBarber, name: e.target.value})}
                                                />
                                            </td>
                                            <td className="border border-1 border-solid border-black p-2">
                                                <input
                                                    type="number"
                                                    placeholder="Chair #"
                                                    className="border border-1 border-orange1 p-1 w-full text-sm"
                                                    value={newBarber.chairNumber}
                                                    onChange={(e) => setNewBarber({...newBarber, chairNumber: e.target.value})}
                                                    min="1"
                                                />
                                            </td>
                                            <td className="border border-1 border-solid border-black p-2">
                                                <select
                                                    className="border border-1 border-orange1 p-1 w-full text-sm"
                                                    value={newBarber.available}
                                                    onChange={(e) => setNewBarber({...newBarber, available: e.target.value === 'true'})}
                                                >
                                                    <option value={true}>Available</option>
                                                    <option value={false}>Not Available</option>
                                                </select>
                                            </td>
                                            <td className="border border-1 border-solid border-black p-2">
                <button
                                                    onClick={createBarber}
                                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                >
                                                    Add Barber
                </button>
                                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {barbers.length > 0 ? (
                            barbers.map((barber, index) => (
                                            <tr key={index} className="border border-1 border-solid border-black">
                                                <td className="border border-1 border-solid border-black p-2">{barber.id || barber.barberId || '-'}</td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingBarber?.id === barber.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingBarber?.name || ""}
                                                            onChange={(e) => setEditingBarber({...editingBarber, name: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        barber.name || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingBarber?.id === barber.id ? (
                                                        <input
                                                            type="number"
                                                            value={editingBarber?.chairNumber || ""}
                                                            onChange={(e) => setEditingBarber({...editingBarber, chairNumber: e.target.value})}
                                                            className="w-full p-1"
                                                        />
                                                    ) : (
                                                        barber.chairNumber || '-'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingBarber?.id === barber.id ? (
                                                        <select
                                                            value={editingBarber?.available || true}
                                                            onChange={(e) => setEditingBarber({...editingBarber, available: e.target.value === 'true'})}
                                                            className="w-full p-1"
                                                        >
                                                            <option value={true}>Available</option>
                                                            <option value={false}>Not Available</option>
                                                        </select>
                                                    ) : (
                                                        barber.available ? 'Available' : 'Not Available'
                                                    )}
                                                </td>
                                                <td className="border border-1 border-solid border-black p-2">
                                                    {editingBarber?.id === barber.id ? (
                                                        <div className="flex space-x-1 w-full">
                                        <button
                                                                onClick={() => updateBarber(barber.id || barber.barberId)}
                                                                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                                title="Save Changes"
                                        >
                                                                💾
                                        </button>
                                                            <button
                                                                onClick={() => setEditingBarber(null)}
                                                                className="flex-1 px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                                title="Cancel"
                                                            >
                                                                ❌
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex space-x-1 w-full">
                                                            <button
                                                                onClick={() => setEditingBarber({
                                                                    id: barber.id || barber.barberId,
                                                                    name: barber.name || '',
                                                                    chairNumber: barber.chairNumber || '',
                                                                    available: barber.available !== undefined ? barber.available : true
                                                                })}
                                                                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                                title="Edit Barber"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                onClick={() => deleteBarber(barber.id || barber.barberId)}
                                                                className="flex-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                                title="Delete Barber"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500 bg-gray-50">
                                    No barbers available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                        </div>
            </div>

                    {/* Enhanced Quota Management Section */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="bg-orange1 text-white px-6 py-4 rounded-t-lg">
                            <h2 className="text-xl font-semibold">Enhanced Quota Management</h2>
                            <p className="text-orange-100 text-sm mt-1">Manage all quota settings and configurations</p>
                        </div>
                        <div className="p-6">

                            {/* Quota Management Tabs */}
                            <div className="border border-gray-200 rounded-lg">
                                <div className="p-4">
                                    {/* Header with WD and Default Quota Controls */}
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold text-lg">Quota Management</h3>
                                        <div className="flex space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-gray-700">WD Quota:</span>
                    <input
                                                    type="number"
                                                    placeholder="Value"
                                                    className="border border-1 border-orange1 p-2 w-20 text-sm"
                                                    min="1"
                                                    value={wdQuotaValue}
                                                    onChange={(e) => setWdQuotaValue(e.target.value)}
                                                />
                <button
                                                    onClick={() => setWdQuota()}
                                                    className="px-3 py-2 bg-orange1 text-white text-sm rounded hover:bg-orange-600"
                >
                                                    Set
                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-gray-700">Default Quota:</span>
                    <input
                        type="number"
                                                    placeholder="Value"
                                                    className="border border-1 border-orange1 p-2 w-20 text-sm"
                                                    min="1"
                                                    value={baseQuotaValue}
                                                    onChange={(e) => setBaseQuotaValue(e.target.value)}
                    />
                    <button
                                                    onClick={() => setBaseQuota()}
                                                    className="px-3 py-2 bg-orange1 text-white text-sm rounded hover:bg-orange-600"
                    >
                                                    Set
                    </button>
                </div>
                                        </div>
            </div>

                                    {/* Custom Quotas Table */}
                                    <div>
                                        <h4 className="font-semibold mb-2">Custom Quotas</h4>
                                        <p className="text-sm text-gray-600 mb-3">Add specific date-based quota overrides</p>
                                        <table className="w-full">
                    <thead>
                        <tr className="bg-orange1 font-bold text-white">
                                                                                                <th className="border border-1 border-solid border-black p-2 w-32">Quota ID</th>
                                        <th className="border border-1 border-solid border-black p-2 w-24">Date</th>
                                        <th className="border border-1 border-solid border-black p-2 w-24">Quota</th>
                                        <th className="border border-1 border-solid border-black p-2 w-12">Actions</th>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-1 border-solid border-black p-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Auto-generated"
                                                                className="border border-1 border-gray-300 p-1 w-full text-sm bg-gray-100"
                                                                disabled
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td className="border border-1 border-solid border-black p-2">
                    <input
                        type="date"
                                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                                value={quotaDate}
                                                                onChange={(e) => setQuotaDate(e.target.value)}
                                                                placeholder="Select Date"
                                                            />
                                                        </td>
                                                        <td className="border border-1 border-solid border-black p-2">
                    <input
                        type="number"
                                                                placeholder="Quota Value"
                                                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                                                value={quotaQuota}
                                                                onChange={(e) => setQuotaQuota(e.target.value)}
                                                                min="1"
                                                            />
                                                        </td>
                                                        <td className="border border-1 border-solid border-black p-2">
                    <button
                                                                onClick={handleAddQuota}
                                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                    >
                                                                Add Custom Quota
                    </button>
                                                        </td>
                        </tr>
                    </thead>
                    <tbody>
                        {quotas.length > 0 ? (
                            quotas.map((quota, idx) => (
                                  <tr key={idx}>
                                    <td className="border border-1 border-solid border-black p-2">
                                        {quota.quota_id || '-'}
                                    </td>
                                    <td className="border border-1 border-solid border-black p-2">
                                          {quota.date ? quota.date : "-"}
                                    </td>
                                    <td className="border border-1 border-solid border-black p-2">
                                        {quota.quota}
                                    </td>
                                    <td className="border border-1 border-solid border-black p-2">
                                          <button
                                              onClick={() =>
                                                  handleDeleteQuota(
                                                      quota.quota_id,
                                                  )
                                              }
                                              className="w-full px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                               title="Delete"
                                          >
                                               🗑️
                                          </button>
                                      </td>
                                  </tr>
                              ))
                        ) : (
                                <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500 bg-gray-50">
                                    No custom quotas available
                                </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
                </div>
            </div>
                        </div>
                    </div>

            <ToastContainer />
                </div>
            </div>
        </div>
    );
};

// Email
// export default withAuthAdmin(AdminDashboard, "CLi6HLdICCdmFUpLsXIjfZICNam2");
export default AdminDashboard;