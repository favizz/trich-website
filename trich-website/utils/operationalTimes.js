import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { getConfigQuotas } from "./quota";

function generateOperationalTimes(date) {
    const allOperationalTimes = [];
    const startHour = 10;
    const endHour = 17;

    const currentTime = new Date();

    if (date.getDate() == currentTime.getDate()) {
        let currentHour = currentTime.getHours();

        if (currentTime.getMinutes() > 0) {
            currentHour += 1;
        }

        currentHour = Math.max(currentHour, startHour);

        for (let hour = currentHour; hour <= endHour; hour++) {
            const timeString = `${hour.toString().padStart(2, "0")}:00`;
            allOperationalTimes.push(timeString);
        }
    } else {
        for (let hour = startHour; hour <= endHour; hour++) {
            const timeString = `${hour.toString().padStart(2, "0")}:00`;
            allOperationalTimes.push(timeString);
        }
    }

    return allOperationalTimes;
}

function formatLocalDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export async function getOperationalTimes(dateInput, pickedServices) {
    const today = new Date();
    const formattedDate = formatLocalDate(dateInput);

    const ids = (pickedServices || []).map(s => s.id);
    const serviceQuery = ids.map(id => `serviceIds=${id}`).join("&");

    console.log(serviceQuery);

    const url = `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota?date=${formattedDate}&${serviceQuery}`;

    const res = await fetch(url);
    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    console.log(data);

    return Array.isArray(data.times) ? data.times : [];
}
