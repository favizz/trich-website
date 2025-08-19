import { API_ROUTES } from "@/constants/routes"

export const getAvailableBarbers = async () => {
    try {
        const res = await fetch(API_ROUTES.GET_BARBERS, { method: "GET" });
        if (!res.ok) throw new Error(`GET_BARBERS failed: ${res.status} ${res.statusText}`);

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        return list.filter(b => b && b.available === true)
    } catch (err) {
        console.error("getAvailableBarbers error:", err);
        return [];
    }
};

/**
 * Get a barber by ID
 * @param {string} barberId - The ID of the barber to retrieve
 * @returns {Promise<Object>} The barber data
 */
export const getBarberById = async (barberId) => {
    try {
        const response = await fetch(API_ROUTES.GET_BARBER_BY_ID(barberId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch barber: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching barber:", error);
        throw error;
    }
};

/**
 * Create a new barber
 * @param {Object} barberData - The barber data to create
 * @returns {Promise<Object>} The created barber data
 */
export const createBarber = async (barberData) => {
    try {
        const response = await fetch(API_ROUTES.CREATE_BARBER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(barberData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create barber: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating barber:", error);
        throw error;
    }
};

/**
 * Update an existing barber
 * @param {string} barberId - The ID of the barber to update
 * @param {Object} barberData - The updated barber data
 * @returns {Promise<Object>} The updated barber data
 */
export const updateBarber = async (barberId, barberData) => {
    try {
        const response = await fetch(API_ROUTES.UPDATE_BARBER(barberId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(barberData)
        });

        if (!response.ok) {
            throw new Error(`Failed to update barber: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating barber:", error);
        throw error;
    }
};

/**
 * Delete a barber
 * @param {string} barberId - The ID of the barber to delete
 * @returns {Promise<boolean>} True if deletion was successful
 */
export const deleteBarber = async (barberId) => {
    try {
        const response = await fetch(API_ROUTES.DELETE_BARBER(barberId), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete barber: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting barber:", error);
        throw error;
    }
};