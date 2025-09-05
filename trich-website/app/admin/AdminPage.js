"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

import ServicesManagement from "./components/ServicesManagement";
import BarbersManagement from "./components/BarbersManagement";
import UserManagement from "./components/UserManagement";
import ReservationsManagement from "./components/ReservationsManagement";

import { 
    isDaySelected, 
    createService, 
    updateService, 
    deleteService,
    createBarber,
    updateBarber,
    deleteBarber,
    deleteActiveBooking,
    handleAddQuota,
    handleDeleteQuota,
    setWdQuota,
    setBaseQuota
} from "./components/ApiFunctions";

import {
    fetchActiveBookings,
    fetchServices,
    fetchBarbers,
    fetchQuotas,
    fetchRecentBookings,
    fetchBookingsByDate,
    fetchCurrentQuotas,
    searchUser
} from "./components/DataFetching";

const AdminDashboard = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const queryParam = searchParams.get("query");
    
    // State variables
    const [bookings, setBookings] = useState([]);
    const [quotas, setQuotas] = useState([]);
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [lastNBookings, setLastNBookings] = useState("");
    const [newService, setNewService] = useState({ name: "", price: "", duration: "", point: "", startTime: "", endTime: "", availableDays: [] });
    const [newBarber, setNewBarber] = useState({ name: "", chairNumber: "", available: true });
    const [editingService, setEditingService] = useState(null);
    const [editingBarber, setEditingBarber] = useState(null);
    const [searchUserPhone, setSearchUserPhone] = useState("");
    const [searchedUser, setSearchedUser] = useState(null);
    const [searchError, setSearchError] = useState("");

    // Effects
    useEffect(() => {
        if (pathname === "/admin" && queryParam !== "123456") {
            router.replace("https://trich.id");
        }
    }, [pathname, queryParam, router]);

    useEffect(() => {
        fetchActiveBookings(setBookings);
        fetchServices(setServices);
        fetchBarbers(setBarbers);
        fetchRecentBookings(20, setRecentBookings);
    }, []);

    // Wrapper functions for API calls
    const handleCreateService = () => createService(newService, setNewService, () => fetchServices(setServices));
    const handleUpdateService = (serviceId) => updateService(serviceId, editingService, setEditingService, () => fetchServices(setServices));
    const handleDeleteService = (serviceId) => deleteService(serviceId, () => fetchServices(setServices));
    const handleCreateBarber = () => createBarber(newBarber, setNewBarber, () => fetchBarbers(setBarbers));
    const handleUpdateBarber = (barberId) => updateBarber(barberId, editingBarber, setEditingBarber, () => fetchBarbers(setBarbers));
    const handleDeleteBarber = (barberId) => deleteBarber(barberId, () => fetchBarbers(setBarbers));
    const handleFetchRecentBookings = () => fetchRecentBookings(lastNBookings, setRecentBookings);
    const handleFetchBookingsByDate = () => fetchBookingsByDate(selectedDate, setRecentBookings);
    const handleSearchUser = () => searchUser(searchUserPhone, setSearchedUser, setSearchError);

    return (
        <div className="pt-32 p-4 min-h-screen">
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
                <div className="space-y-8">
                    <ReservationsManagement 
                        recentBookings={recentBookings}
                        setRecentBookings={setRecentBookings}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        lastNBookings={lastNBookings}
                        setLastNBookings={setLastNBookings}
                        fetchRecentBookings={handleFetchRecentBookings}
                        fetchBookingsByDate={handleFetchBookingsByDate}
                        deleteActiveBooking={deleteActiveBooking}
                    />
                    <UserManagement 
                        searchUserPhone={searchUserPhone}
                        setSearchUserPhone={setSearchUserPhone}
                        searchedUser={searchedUser}
                        searchError={searchError}
                        searchUser={handleSearchUser}
                    />
                    <ServicesManagement 
                        services={services}
                        newService={newService}
                        setNewService={setNewService}
                        editingService={editingService}
                        setEditingService={setEditingService}
                        createService={handleCreateService}
                        updateService={handleUpdateService}
                        deleteService={handleDeleteService}
                        isDaySelected={isDaySelected}
                    />
                    <BarbersManagement 
                        barbers={barbers}
                        newBarber={newBarber}
                        setNewBarber={setNewBarber}
                        editingBarber={editingBarber}
                        setEditingBarber={setEditingBarber}
                        createBarber={handleCreateBarber}
                        updateBarber={handleUpdateBarber}
                        deleteBarber={handleDeleteBarber}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;