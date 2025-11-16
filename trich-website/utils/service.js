import { API_ROUTES } from "../constants/routes";

/**
 * Get a service by ID
 * @param {string} serviceId - The ID of the service to retrieve
 * @returns {Promise<Object>} The service data
 */
export const getServiceById = async (serviceId) => {
    try {
        const response = await fetch(API_ROUTES.GET_SERVICE_BY_ID(serviceId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch service: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching service:", error);
        throw error;
    }
};

/**
 * Create a new service
 * @param {Object} serviceData - The service data to create
 * @returns {Promise<Object>} The created service data
 */
export const createService = async (serviceData) => {
    try {
        const response = await fetch(API_ROUTES.CREATE_SERVICE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            },
            body: JSON.stringify(serviceData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create service: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};

/**
 * Update an existing service
 * @param {string} serviceId - The ID of the service to update
 * @param {Object} serviceData - The updated service data
 * @returns {Promise<Object>} The updated service data
 */
export const updateService = async (serviceId, serviceData) => {
    try {
        const response = await fetch(API_ROUTES.UPDATE_SERVICE(serviceId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            },
            body: JSON.stringify(serviceData)
        });

        if (!response.ok) {
            throw new Error(`Failed to update service: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
};

/**
 * Delete a service
 * @param {string} serviceId - The ID of the service to delete
 * @returns {Promise<boolean>} True if deletion was successful
 */
export const deleteService = async (serviceId) => {
    try {
        const response = await fetch(API_ROUTES.DELETE_SERVICE(serviceId), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete service: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};
