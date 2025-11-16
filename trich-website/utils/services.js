import { API_ROUTES } from "@/constants/routes";

export const getServices = async () => {
    try {
        const response = await fetch(API_ROUTES.GET_SERVICES, {
            method: "GET"
        })
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return null;
    }
};

export const getServicesByUser = async (phoneNumber) => {
    try {
        const response = await fetch(API_ROUTES.GET_SERVICES_BY_USER(phoneNumber), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        })
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return null;
    }
};