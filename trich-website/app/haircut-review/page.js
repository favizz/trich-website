"use client";
import { useState, useEffect } from "react";

export default function HistoryPage() {
    const [date, setDate] = useState(() => {
        const now = new Date();
        const indonesianOffset = 7 * 60; // GMT+7
        const localOffset = now.getTimezoneOffset();
        const jakartaTime = new Date(now.getTime() + (indonesianOffset + localOffset) * 60000);
        return jakartaTime.toISOString().split("T")[0];
    });

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSessions = async (selectedDate) => {
        setLoading(true);
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/operational/session/date/${selectedDate}`);
        if (res.ok) {
            const data = await res.json();
            setSessions(data);
        } else {
            setSessions([]);
        }
        } catch (err) {
        console.error(err);
        setSessions([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSessions(date);
    }, [date]);

    return (
        <div className="p-6 min-h-screen bg-gray-100 mt-32">
        <h1 className="text-4xl font-bold mb-6 text-center">Session History</h1>

        <div className="mb-6 text-center">
            <label className="mr-2 font-medium">Select Date:</label>
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-3 py-2"
            />
        </div>

        {loading ? (
            <p className="text-center">Loading...</p>
        ) : sessions.length === 0 ? (
            <p className="text-center">No sessions found for {date}</p>
        ) : (
            <div className="space-y-64">
            {sessions.map((session) => {
                const photos = [
                session.frontPhoto,
                session.backPhoto,
                session.rightPhoto,
                session.leftPhoto,
                ].filter(Boolean);

                return (
                <div
                    key={session.id}
                    className="relative w-full rounded overflow-hidden shadow-lg"
                >
                    {/* 2x2 grid */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    {photos.map((photo, idx) => (
                        <div
                        key={idx}
                        className="w-full aspect-video"
                        >
                        <img
                            src={`${photo}`}
                            alt={`Session ${idx}`}
                            className="w-full h-full object-cover rounded"
                        />
                        </div>
                    ))}
                    {/* Fill empty slots if less than 4 photos */}
                    {Array.from({ length: 4 - photos.length }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="w-full aspect-video bg-gray-200 rounded"></div>
                    ))}
                    </div>

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                    <h2 className="text-xl font-semibold">{session.phoneNumber}</h2>
                    <p className="text-sm">
                        Front Cut: <span className="font-medium">{session.frontCut}</span> / Side Cut:{" "}
                        <span className="font-medium">{session.sideCut}</span>
                    </p>
                    <p className="text-sm">Date: {session.date}</p>
                    </div>
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
}
