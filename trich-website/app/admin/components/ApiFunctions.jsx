"use client";
import React from "react";
import ToastManager from "../../components/toaster";

// Helper function for day mapping
export const isDaySelected = (abbreviatedDay, availableDays) => {
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

// API functions for services
export const createService = async (newService, setNewService, fetchServices) => {
    if (!newService.name || !newService.price || !newService.duration || 
        newService.point === undefined || !newService.startTime || 
        !newService.endTime || !newService.availableDays || newService.availableDays.length === 0) {
        ToastManager.notify("Please fill in all fields before adding service", "warning");
        return;
    }
    
    try {
        const dayMapping = {
            'SUN': 'SUNDAY',
            'MON': 'MONDAY', 
            'TUE': 'TUESDAY',
            'WED': 'WEDNESDAY',
            'THU': 'THURSDAY',
            'FRI': 'FRIDAY',
            'SAT': 'SATURDAY'
        };
        
        const mappedDays = newService.availableDays.map(day => dayMapping[day]);
        
        const serviceData = {
            name: newService.name,
            price: parseFloat(newService.price),
            duration: parseInt(newService.duration),
            point: parseInt(newService.point),
            useAI: newService.useAI,
            startTime: newService.startTime,
            endTime: newService.endTime,
            availableDays: mappedDays
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            },
            body: JSON.stringify(serviceData),
        });
        if (!res.ok) throw new Error("Failed to create service");
        ToastManager.notify("Service created successfully!", "success");
        setNewService({ name: "", price: "", duration: "", point: "", startTime: "", endTime: "", availableDays: [] });
        fetchServices();
    } catch (error) {
        console.error("Failed to create service:", error);
        ToastManager.notify("Failed to create service", "error");
    }
};

export const updateService = async (serviceId, editingService, setEditingService, fetchServices) => {
    try {
        const dayMapping = {
            'SUN': 'SUNDAY',
            'MON': 'MONDAY', 
            'TUE': 'TUESDAY',
            'WED': 'WEDNESDAY',
            'THU': 'THURSDAY',
            'FRI': 'FRIDAY',
            'SAT': 'SATURDAY'
        };
        
        const mappedDays = editingService.availableDays;
        
        const serviceData = {
            serviceId: editingService.serviceId,
            name: editingService.name,
            price: parseFloat(editingService.price),
            duration: parseInt(editingService.duration),
            point: parseInt(editingService.point),
            useAI: editingService.useAI,
            startTime: editingService.startTime,
            endTime: editingService.endTime,
            availableDays: mappedDays
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services/${serviceId}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`
                },
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

export const deleteService = async (serviceId, fetchServices) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/services/${serviceId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });
        if (!res.ok) throw new Error("Failed to delete service");
        ToastManager.notify("Service deleted successfully!", "success");
        fetchServices();
    } catch (error) {
        console.error("Failed to delete service:", error);
        ToastManager.notify("Failed to delete service", "error");
    }
};

// API functions for barbers
export const createBarber = async (newBarber, setNewBarber, fetchBarbers) => {
    if (!newBarber.name || !newBarber.chairNumber) {
        ToastManager.notify("Please fill in all fields before adding barber", "warning");
        return;
    }
    
    try {
        const barberData = {
            name: newBarber.name,
            chairNumber: parseInt(newBarber.chairNumber),
            available: newBarber.available
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            body: JSON.stringify(barberData),
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

export const updateBarber = async (barberId, editingBarber, setEditingBarber, fetchBarbers) => {
    try {
        const barberData = {
            barberId: editingBarber.id,
            name: editingBarber.name,
            chairNumber: parseInt(editingBarber.chairNumber),
            availableDays: editingBarber.availableDays 
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber/${barberId}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`
                },
            body: JSON.stringify(barberData),
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


export const deleteBarber = async (barberId, fetchBarbers) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/barber/${barberId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });
        if (!res.ok) throw new Error("Failed to delete barber");
        ToastManager.notify("Barber deleted successfully!", "success");
        fetchBarbers();
    } catch (error) {
        console.error("Failed to delete barber:", error);
        ToastManager.notify("Failed to delete barber", "error");
    }
};

// API functions for reservations
export const deleteActiveBooking = async (reservationId) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/reservations/${reservationId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });
        if (!res.ok) throw new Error("Failed to delete reservation");
        ToastManager.notify("Reservation deleted successfully!", "success");
    } catch (error) {
        console.error("Failed to delete reservation:", error);
        ToastManager.notify("Failed to delete reservation", "error");
    }
};

// API functions for quotas
export const generateQuotaId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const handleAddQuota = async (quotaDate, quotaQuota, setQuotaDate, setQuotaQuota, fetchQuotas) => {
    if (!quotaDate || !quotaQuota || quotaQuota <= 0) {
        ToastManager.notify("Please enter a valid date and quota value", "warning");
        return;
    }
    
    try {
        const quotaData = {
            quota_id: generateQuotaId(),
            date: quotaDate,
            quota: parseInt(quotaQuota)
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/custom`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            body: JSON.stringify(quotaData),
        });
        if (!res.ok) throw new Error("Failed to create custom quota");
        ToastManager.notify("Custom quota created successfully!", "success");
        setQuotaDate("");
        setQuotaQuota("");
        fetchQuotas();
    } catch (error) {
        console.error("Failed to create custom quota:", error);
        ToastManager.notify("Failed to create custom quota", "error");
    }
};

export const handleDeleteQuota = async (quotaId, fetchQuotas) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/${quotaId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });
        if (!res.ok) throw new Error("Failed to delete quota");
        ToastManager.notify("Quota deleted successfully!", "success");
        fetchQuotas();
    } catch (error) {
        console.error("Failed to delete quota:", error);
        ToastManager.notify("Failed to delete quota", "error");
    }
};

export const setWdQuota = async (wdQuotaValue, fetchCurrentQuotas) => {
    if (!wdQuotaValue || wdQuotaValue <= 0) {
        ToastManager.notify("Please enter a valid WD quota value", "warning");
        return;
    }
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/wd?value=${parseInt(wdQuotaValue)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        ToastManager.notify("WD Quota set successfully!", "success");
        fetchCurrentQuotas();
    } catch (error) {
        console.error("Failed to set WD quota:", error);
        ToastManager.notify("Failed to set WD quota", "error");
    }
};

export const setBaseQuota = async (baseQuotaValue, fetchCurrentQuotas) => {
    if (!baseQuotaValue || baseQuotaValue <= 0) {
        ToastManager.notify("Please enter a valid Default quota value", "warning");
        return;
    }
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/default?value=${parseInt(baseQuotaValue)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        ToastManager.notify("Default Quota set successfully!", "success");
        fetchCurrentQuotas();
    } catch (error) {
        console.error("Failed to set Default quota:", error);
        ToastManager.notify("Failed to set Default quota", "error");
    }
};
