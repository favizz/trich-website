import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { getConfigQuotas } from "./quota";

function generateOperationalTimes(date) {
    const allOperationalTimes = [];
    const startHour = 10;
    const endHour = 20;

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

export async function getOperationalTimes(dateInput, pickedService) {
    const today = new Date();
    if (new Date(dateInput.toDateString()) < new Date(today.toDateString())) {
        return { error: "DATE_IN_PAST", times: [] };
    }

    let times = generateOperationalTimes(dateInput);

    if (dateInput.getDay() === 5) {
        times = times.filter(t => t !== "12:00");
    }

    let isMorningEdge = false;
    if (pickedService?.includes("Morning Edge")) {
        if ([5, 6, 0].includes(dateInput.getDay())) {
            times = [];
            isMorningEdge = true;
        } else {
            times = times.filter(t => t <= "12:00");
            isMorningEdge = true;
        }
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    }).format(dateInput);

    const qBookings = query(
        collection(db, "active_booking"),
        where("date", "==", formattedDate)
    );
    const qQuota    = query(
        collection(db, "reservation_quota"),
        where("date", "==", formattedDate)
    );

    const [{ quota_base, quota_wd } = {}, ..._] = [(await getConfigQuotas())] || [{}];
    const [quotaDoc] = (await getDocs(qQuota)).docs.map(d => d.data());
    const specificQuota = quotaDoc?.quota ?? null;
    const defaultQuota = ([1,2,3,4].includes(dateInput.getDay()))
        ? quota_wd
        : quota_base;
    const quota = (specificQuota !== null) ? specificQuota : defaultQuota;

    const bookingDocs = (await getDocs(qBookings)).docs;
    const counts = bookingDocs.reduce((acc, d) => {
        const t = d.data().time;
        acc[t] = (acc[t] || 0) + 1;
        return acc;
    }, {});

    const available = times.filter(t => (counts[t] || 0) < quota);

    return { 
        times: available,
        formattedDate,
        isMorningEdge,
    };
}