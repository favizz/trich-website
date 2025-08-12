const BASE_URL = process.env.NEXT_PUBLIC_SPRINGBOOT_URL;

export const API_ROUTES = {
    GET_SERVICES: `${BASE_URL}/website/services`,
    GET_USER_BY_PHONE: (phoneNumber) => `${BASE_URL}/website/user/${phoneNumber}`,
    GET_AVAILABLE_TIMES: (date, serviceIds) => {
        const idsQuery = serviceIds.map(id => `serviceIds=${encodeURIComponent(id)}`).join("&");
        return `${BASE_URL}/website/quota/available?date=${date}&${idsQuery}`;
    },
    GET_BARBERS: `${BASE_URL}/website/barber`,
    CREATE_RESERVATION: `${BASE_URL}/website/reservations`
};