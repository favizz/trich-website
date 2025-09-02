const BASE_URL = process.env.NEXT_PUBLIC_SPRINGBOOT_URL;

export const API_ROUTES = {
    GET_SERVICES: `${BASE_URL}/website/services`,
    GET_SERVICES_BY_USER: (phone_number) =>  `${BASE_URL}/website/services/user/${phone_number}`,

    GET_USER_BY_PHONE: (phone_number) => `${BASE_URL}/website/user/${phone_number}`,
    GET_AVAILABLE_TIMES: (date, service_ids) => {
        const idsQuery = service_ids.map(id => `serviceIds=${encodeURIComponent(id)}`).join("&");
        return `${BASE_URL}/website/quota?date=${date}&${idsQuery}`;
    },

    GET_AVAILABLE_TIMES_WITH_BARBER: (date, service_ids, barberId) => {
        const idsQuery = service_ids.map(id => `serviceIds=${encodeURIComponent(id)}`).join("&");
        return `${BASE_URL}/website/quota?date=${date}&${idsQuery}&barberId=${encodeURIComponent(barberId)}`;
    },

    GET_BARBERS: `${BASE_URL}/website/barber`,
    CREATE_RESERVATION: `${BASE_URL}/website/reservations`
};
