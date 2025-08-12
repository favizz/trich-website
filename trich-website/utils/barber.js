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