// In-memory mock backend for the demo build. Stands in for the Spring Boot
// API that the real app talks to. `mockFetch` is a drop-in replacement for
// the browser `fetch()` used at every call site, so callers don't change.

const DELAY_MS = 350;
const ALL_DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const WEEKDAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

// tiny 1x1 gray PNG, reused as a stand-in for uploaded haircut-session photos
const PLACEHOLDER_PHOTO_B64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

function delay(ms = DELAY_MS) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function ok(data, status = 200) {
    return { ok: true, status, json: async () => data };
}

function fail(status = 404, data = { message: "Not found" }) {
    return { ok: false, status, json: async () => data };
}

function todayIso() {
    const now = new Date();
    const jakarta = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
    return jakarta.toISOString().split("T")[0];
}

function addDaysIso(isoDate, days) {
    const [y, m, d] = isoDate.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d + days)).toISOString().split("T")[0];
}

function seededRandom(seedString) {
    let h = 1779033703 ^ seedString.length;
    for (let i = 0; i < seedString.length; i++) {
        h = Math.imul(h ^ seedString.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return function next() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    };
}

const TODAY = todayIso();

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

let services = [
    { id: "svc-1", name: "The Trich Experience", price: 350000, discount: 0, duration: 90, point: 15, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-2", name: "The Cutting Edge", price: 150000, discount: 0, duration: 45, point: 10, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-3", name: "Trim & Treat", price: 100000, discount: 0, duration: 30, point: 5, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-4", name: "Mask Off", price: 80000, discount: 0, duration: 30, point: 5, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-5", name: "Creambath", price: 120000, discount: 0.1, duration: 40, point: 5, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-6", name: "Korean Perm", price: 450000, discount: 0, duration: 120, point: 40, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-7", name: "Root Lift", price: 300000, discount: 0, duration: 90, point: 40, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-8", name: "Down Perm", price: 300000, discount: 0, duration: 90, point: 40, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-9", name: "Permification", price: 400000, discount: 0, duration: 100, point: 40, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-10", name: "Colors", price: 250000, discount: 0, duration: 80, point: 40, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
    { id: "svc-11", name: "Smooth Operator", price: 280000, discount: 0, duration: 80, point: 40, useAI: false, startTime: "10:00", endTime: "17:00", availableDays: [...ALL_DAYS] },
];
let nextServiceSeq = services.length + 1;

let barbers = [
    { id: "barber-1", name: "Andi", chairNumber: 1, availableDays: [...ALL_DAYS] },
    { id: "barber-2", name: "Budi", chairNumber: 2, availableDays: [...WEEKDAYS] },
    { id: "barber-3", name: "Citra", chairNumber: 3, availableDays: ["WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] },
];
let nextBarberSeq = barbers.length + 1;

// demo phone-based accounts (non-auth users) + email/password sign-up accounts
let users = [
    { phoneNumber: "+6281234567890", name: "Budi Santoso", email: "demo@trich.id", point: 65, member: true, memberExpirationDate: "2026-12-31" },
    { phoneNumber: "+6289876543210", name: "Siti Aminah", email: null, point: 15, member: false, memberExpirationDate: null },
];

let reservations = [
    { reservationId: "res-1", orderId: "TB-1001AB", name: "Budi Santoso", phoneNumber: "+6281234567890", serviceIds: ["svc-1"], serviceNames: ["The Trich Experience"], date: addDaysIso(TODAY, -3), time: "11:00:00", duration: 90, barberId: "barber-1", barberName: "Andi", status: "paid", amount: 350000 },
    { reservationId: "res-2", orderId: "TB-1002CD", name: "Budi Santoso", phoneNumber: "+6281234567890", serviceIds: ["svc-3"], serviceNames: ["Trim & Treat"], date: TODAY, time: "14:00:00", duration: 30, barberId: "barber-2", barberName: "Budi", status: "unpaid", amount: 100000 },
    { reservationId: "res-3", orderId: "TB-1003EF", name: "Siti Aminah", phoneNumber: "+6289876543210", serviceIds: ["svc-2", "svc-4"], serviceNames: ["The Cutting Edge", "Mask Off"], date: addDaysIso(TODAY, -1), time: "10:00:00", duration: 75, barberId: "barber-3", barberName: "Citra", status: "half", amount: 230000 },
    { reservationId: "res-4", orderId: "TB-1004GH", name: "Walk-in Customer", phoneNumber: "+6281111222333", serviceIds: ["svc-6"], serviceNames: ["Korean Perm"], date: addDaysIso(TODAY, -2), time: "13:00:00", duration: 120, barberId: "barber-1", barberName: "Andi", status: "paid", amount: 450000 },
];
let nextReservationSeq = reservations.length + 1;

let quotaConfig = { wd: 8, default: 5 };
let customQuotas = [
    { quota_id: "quota-1", date: addDaysIso(TODAY, 5), quota: 12 },
    { quota_id: "quota-2", date: addDaysIso(TODAY, 12), quota: 6 },
];

let haircutSessions = Array.from({ length: 7 }).map((_, i) => ({
    id: `session-${i + 1}`,
    phoneNumber: i % 2 === 0 ? "+6281234567890" : "+6289876543210",
    frontCut: ["Fade", "Crop", "Pompadour", "Buzz Cut"][i % 4],
    sideCut: ["Taper", "Undercut", "Skin Fade"][i % 3],
    date: addDaysIso(TODAY, -Math.floor(i / 2)),
    frontPhoto: PLACEHOLDER_PHOTO_B64,
    backPhoto: PLACEHOLDER_PHOTO_B64,
    rightPhoto: PLACEHOLDER_PHOTO_B64,
    leftPhoto: PLACEHOLDER_PHOTO_B64,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizePhone(raw) {
    if (!raw) return raw;
    let digits = String(raw).replace(/\D/g, "");
    if (digits.startsWith("0")) digits = "62" + digits.slice(1);
    else if (!digits.startsWith("62")) digits = "62" + digits;
    return "+" + digits;
}

function findUserByPhone(phone) {
    const target = normalizePhone(phone);
    return users.find((u) => normalizePhone(u.phoneNumber) === target) || null;
}

function serviceNamesFromIds(ids) {
    return (ids || []).map((id) => services.find((s) => s.id === id)?.name).filter(Boolean);
}

function amountFromIds(ids) {
    return (ids || []).reduce((sum, id) => {
        const svc = services.find((s) => s.id === id);
        return sum + (svc ? Math.round(svc.price * (1 - svc.discount)) : 0);
    }, 0);
}

function durationFromIds(ids) {
    return (ids || []).reduce((sum, id) => {
        const svc = services.find((s) => s.id === id);
        return sum + (svc ? svc.duration : 0);
    }, 0);
}

function toHms(time) {
    if (!time) return "00:00:00";
    return time.split(":").length === 3 ? time : `${time}:00`;
}

function monthAnalytics(month) {
    const rand = seededRandom(month || TODAY.slice(0, 7));
    const [year, mon] = (month || TODAY.slice(0, 7)).split("-").map(Number);
    const daysInMonth = new Date(year || 2026, mon || 1, 0).getDate();

    const daily = {};
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${String(year || 2026).padStart(4, "0")}-${String(mon || 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        daily[dateStr] = Math.floor(rand() * 12) + 2;
    }

    const barberNames = barbers.map((b) => b.name);
    const barbersData = {};
    barberNames.forEach((name) => {
        const count = Math.floor(rand() * 60) + 10;
        barbersData[name] = { count, totalRevenue: count * (Math.floor(rand() * 100000) + 100000) };
    });

    const servicesData = {};
    services.forEach((s) => {
        servicesData[s.name] = Math.floor(rand() * 40) + 1;
    });

    const totalCustomers = Math.floor(rand() * 200) + 50;
    const newCustomers = Math.floor(totalCustomers * (0.3 + rand() * 0.3));
    const recurringCustomers = totalCustomers - newCustomers;

    const busyHours = {};
    for (let h = 10; h <= 17; h++) {
        busyHours[`${String(h).padStart(2, "0")}:00`] = Math.floor(rand() * 30) + 1;
    }

    const recurringGap = {
        total_recurring_gaps: Math.floor(rand() * 150) + 20,
        distribution: {
            "0-7 days": Math.floor(rand() * 40) + 5,
            "8-14 days": Math.floor(rand() * 40) + 5,
            "15-30 days": Math.floor(rand() * 30) + 5,
            "31+ days": Math.floor(rand() * 20) + 1,
        },
    };

    return {
        daily,
        barbersData,
        servicesData,
        customers: {
            total_customers: totalCustomers,
            new_customers: newCustomers,
            recurring_customers: recurringCustomers,
            recurring_rate: recurringCustomers / totalCustomers,
        },
        busyHours,
        recurringGap,
    };
}

function availableTimesFor(query) {
    const date = query.get("date");
    const barberId = query.get("barberId");
    const slots = [];
    for (let h = 10; h <= 17; h++) slots.push(`${String(h).padStart(2, "0")}:00`);

    const taken = new Set(
        reservations
            .filter((r) => r.date === date && (!barberId || r.barberId === barberId))
            .map((r) => r.time.slice(0, 5))
    );

    if (date === TODAY) {
        const now = new Date();
        const currentHour = now.getMinutes() > 0 ? now.getHours() + 1 : now.getHours();
        return slots.filter((s) => Number(s.split(":")[0]) >= Math.max(currentHour, 10) && !taken.has(s));
    }

    return slots.filter((s) => !taken.has(s));
}

// ---------------------------------------------------------------------------
// mockFetch — drop-in replacement for fetch()
// ---------------------------------------------------------------------------

export async function mockFetch(url, options = {}) {
    await delay();

    const method = (options.method || "GET").toUpperCase();
    const body = options.body ? JSON.parse(options.body) : null;
    const qIndex = url.indexOf("?");
    const path = qIndex >= 0 ? url.slice(0, qIndex) : url;
    const query = new URLSearchParams(qIndex >= 0 ? url.slice(qIndex + 1) : "");

    // ---- services -----------------------------------------------------
    if (method === "GET" && path.includes("/website/services/user/")) {
        return ok(services);
    }
    if (method === "GET" && path.endsWith("/website/services")) {
        return ok(services);
    }
    if (method === "POST" && path.endsWith("/website/services")) {
        const created = { id: `svc-${nextServiceSeq++}`, ...body, discount: 0 };
        services = [...services, created];
        return ok(created);
    }
    if (method === "PUT" && path.includes("/website/services/")) {
        const id = path.split("/website/services/")[1];
        services = services.map((s) => (String(s.id) === String(id) ? { ...s, ...body } : s));
        return ok(services.find((s) => String(s.id) === String(id)));
    }
    if (method === "DELETE" && path.includes("/website/services/")) {
        const id = path.split("/website/services/")[1];
        services = services.filter((s) => String(s.id) !== String(id));
        return ok(true);
    }

    // ---- barbers --------------------------------------------------------
    if (method === "GET" && path.endsWith("/website/barber")) {
        return ok(barbers);
    }
    if (method === "POST" && path.endsWith("/website/barber")) {
        const created = { id: `barber-${nextBarberSeq++}`, availableDays: [], ...body };
        barbers = [...barbers, created];
        return ok(created);
    }
    if (method === "PUT" && path.includes("/website/barber/")) {
        const id = path.split("/website/barber/")[1];
        barbers = barbers.map((b) => (String(b.id) === String(id) ? { ...b, ...body } : b));
        return ok(barbers.find((b) => String(b.id) === String(id)));
    }
    if (method === "DELETE" && path.includes("/website/barber/")) {
        const id = path.split("/website/barber/")[1];
        barbers = barbers.filter((b) => String(b.id) !== String(id));
        return ok(true);
    }

    // ---- reservations -----------------------------------------------------
    if (method === "POST" && path.endsWith("/website/reservations")) {
        const created = {
            reservationId: `res-${nextReservationSeq++}`,
            orderId: String(body.orderId),
            name: body.name,
            phoneNumber: normalizePhone(body.phoneNumber),
            serviceIds: body.serviceIds,
            serviceNames: serviceNamesFromIds(body.serviceIds),
            date: body.date,
            time: toHms(body.time),
            duration: durationFromIds(body.serviceIds),
            barberId: body.barberId,
            barberName: barbers.find((b) => String(b.id) === String(body.barberId))?.name || "",
            status: "unpaid",
            amount: amountFromIds(body.serviceIds),
        };
        reservations = [...reservations, created];
        return ok(created);
    }
    if (method === "GET" && path.includes("/website/reservations/last/")) {
        const n = Number(path.split("/website/reservations/last/")[1]) || 20;
        return ok([...reservations].slice(-n).reverse());
    }
    if (method === "GET" && path.includes("/website/reservations/date/")) {
        const date = path.split("/website/reservations/date/")[1];
        return ok(reservations.filter((r) => r.date === date));
    }
    if (method === "PUT" && path.endsWith("/website/reservations/status")) {
        reservations = reservations.map((r) =>
            String(r.reservationId) === String(body.reservationId) ? { ...r, status: body.status } : r
        );
        return ok(true);
    }
    if (method === "DELETE" && path.includes("/website/reservations/")) {
        const id = path.split("/website/reservations/")[1];
        reservations = reservations.filter((r) => String(r.reservationId) !== String(id));
        return ok(true);
    }
    if (method === "GET" && path.includes("/website/reservations/")) {
        const phone = normalizePhone(decodeURIComponent(path.split("/website/reservations/")[1]));
        return ok(reservations.filter((r) => normalizePhone(r.phoneNumber) === phone));
    }

    // ---- quota --------------------------------------------------------
    if (method === "GET" && path.endsWith("/website/quota")) {
        if (query.has("date")) {
            return ok({ times: availableTimesFor(query) });
        }
        return ok(customQuotas);
    }
    if (method === "GET" && path.endsWith("/website/quota/wd")) {
        return ok({ quota: quotaConfig.wd });
    }
    if (method === "POST" && path.endsWith("/website/quota/wd")) {
        quotaConfig.wd = Number(query.get("value")) || quotaConfig.wd;
        return ok({ quota: quotaConfig.wd });
    }
    if (method === "GET" && path.endsWith("/website/quota/default")) {
        return ok({ quota: quotaConfig.default });
    }
    if (method === "POST" && path.endsWith("/website/quota/default")) {
        quotaConfig.default = Number(query.get("value")) || quotaConfig.default;
        return ok({ quota: quotaConfig.default });
    }
    if (method === "POST" && path.endsWith("/website/quota/custom")) {
        const created = { quota_id: body.quota_id, date: body.date, quota: body.quota };
        customQuotas = [...customQuotas, created];
        return ok(created);
    }
    if (method === "DELETE" && path.includes("/website/quota/")) {
        const id = path.split("/website/quota/")[1];
        customQuotas = customQuotas.filter((q) => String(q.quota_id) !== String(id));
        return ok(true);
    }

    // ---- user / membership / discount ---------------------------------
    if (method === "GET" && path.includes("/website/user/membership/")) {
        const phone = decodeURIComponent(path.split("/website/user/membership/")[1]);
        const user = findUserByPhone(phone);
        if (user?.member) {
            return ok({ status: true, expirationDate: user.memberExpirationDate });
        }
        return fail(404, {});
    }
    if (method === "GET" && path.includes("/website/user/")) {
        const phone = decodeURIComponent(path.split("/website/user/")[1]);
        const user = findUserByPhone(phone);
        if (user) return ok(user);
        return fail(404, {});
    }
    if (method === "POST" && path.endsWith("/website/discount")) {
        let user = findUserByPhone(body.phoneNumber);
        if (!user) user = mockUpsertNonAuthUser("Guest", body.phoneNumber);
        user.point = Math.max(0, user.point - body.points);
        return ok(true);
    }

    // ---- analytics ------------------------------------------------------
    if (method === "GET" && path.includes("/website/analytics/")) {
        const month = query.get("month");
        const data = monthAnalytics(month);
        if (path.endsWith("/analytics/reservations")) return ok(data.daily);
        if (path.endsWith("/analytics/barbers")) return ok(data.barbersData);
        if (path.endsWith("/analytics/services")) return ok(data.servicesData);
        if (path.endsWith("/analytics/customers")) return ok(data.customers);
        if (path.endsWith("/analytics/busy-hours")) return ok(data.busyHours);
        if (path.endsWith("/analytics/recurring-gap")) return ok(data.recurringGap);
    }

    // ---- haircut review sessions ---------------------------------------
    if (method === "GET" && path.includes("/operational/session/date/")) {
        const date = path.split("/operational/session/date/")[1];
        const page = Number(query.get("page")) || 0;
        const size = Number(query.get("size")) || 3;
        const daySessions = haircutSessions.filter((s) => s.date === date);
        const start = page * size;
        return ok(daySessions.slice(start, start + size));
    }

    return fail(404, { message: `No mock handler for ${method} ${url}` });
}

// ---------------------------------------------------------------------------
// Mock auth store — used by config/firebase.js replacement, sign-up form,
// and the demo-code OTP flow (utils/non-auth-user.js)
// ---------------------------------------------------------------------------

export function mockFindUserByEmail(email) {
    return users.find((u) => u.email && u.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export function mockSignUp({ first_name, email, phone_number }) {
    const created = {
        phoneNumber: normalizePhone(phone_number),
        name: first_name.toUpperCase(),
        email,
        point: 0,
        member: false,
        memberExpirationDate: null,
    };
    users = [...users, created];
    return created;
}

export function mockUpsertNonAuthUser(first_name, phone_number) {
    const existing = findUserByPhone(phone_number);
    if (existing) return existing;
    const created = { phoneNumber: normalizePhone(phone_number), name: first_name, email: null, point: 0, member: false, memberExpirationDate: null };
    users = [...users, created];
    return created;
}
