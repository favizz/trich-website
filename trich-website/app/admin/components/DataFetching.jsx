"use client";
import React from "react";
import ToastManager from "../../components/toaster";

// Data fetching functions
export const fetchActiveBookings = async (setBookings) => {
    try {
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

export const fetchServices = async (setServices) => {
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

export const fetchBarbers = async (setBarbers) => {
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

export const fetchQuotas = async (setQuotas) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota`);
        if (!res.ok) throw new Error("Failed to fetch quotas");
        const result = await res.json();
        setQuotas(result);
    } catch (error) {
        console.error("Failed to fetch quotas:", error);
        ToastManager.notify("Failed to fetch quotas", "error");
    }
};

export const fetchRecentBookings = async (n, setRecentBookings) => {
    try {
        if (!n || n === "") {
            ToastManager.notify("Please enter a number first", "warning");
            return;
        }
        
        const validN = parseInt(n);
        if (isNaN(validN) || validN < 1 || validN > 100) {
            throw new Error("Invalid number: must be between 1 and 100");
        }
        
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

export const fetchBookingsByDate = async (date, setRecentBookings) => {
    try {
        if (!date) {
            ToastManager.notify("Please select a date first", "warning");
            return;
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/date/${date}`);
        if (!res.ok) {
            if (res.status === 400) {
                throw new Error(`Bad request: Invalid date '${date}'`);
            }
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setRecentBookings(result);
    } catch (error) {
        console.error("Failed to fetch bookings by date:", error);
        ToastManager.notify(`Failed to fetch bookings by date: ${error.message}`, "error");
        setRecentBookings([]);
    }
};

export const fetchCurrentQuotas = async (setWdQuotaValue, setBaseQuotaValue) => {
    try {
        // Fetch WD Quota
        const wdRes = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/wd`);
        if (wdRes.ok) {
            const wdData = await wdRes.json();
            setWdQuotaValue(wdData.quota || "");
            console.log(wdData);
        }
        
        // Fetch Default Quota
        const defaultRes = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/default`);
        if (defaultRes.ok) {
            const defaultData = await defaultRes.json();
            setBaseQuotaValue(defaultData.quota || "");
        }
    } catch (error) {
        console.error("Failed to fetch current quotas:", error);
    }
};

export const searchUser = async (searchUserPhone, setSearchedUser, setSearchError) => {
    if (!searchUserPhone || searchUserPhone.trim() === "") {
        ToastManager.notify("Please enter a phone number to search", "warning");
        return;
    }
    
    try {
        setSearchError("");
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/user/${searchUserPhone}`);
        if (!res.ok) {
            if (res.status === 404) {
                setSearchError("User not found");
                setSearchedUser(null);
                return;
            }
            throw new Error("Failed to fetch user");
        }
        const user = await res.json();
        setSearchedUser(user);
        ToastManager.notify("User found successfully!", "success");
    } catch (error) {
        console.error("Failed to search user:", error);
        setSearchError("Failed to search user");
        setSearchedUser(null);
    }
};
