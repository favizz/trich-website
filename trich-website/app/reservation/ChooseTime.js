"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { API_ROUTES } from "@/constants/routes";
import { getAvailableBarbers } from "@/utils/barber";

import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";
import { Calendar } from "@/components/ui/calendar";
import Spinner from "../components/Spinner";

import LeftArrow from "@/public/reservationAssets/leftarrow.svg";
import RightArrow from "@/public/reservationAssets/rightarrow.svg";

const ChooseTime = ({
    pickedService,
    date,
    selectedBarber,
    handleDate,
    handleTime,
    handlePage,
    handleBarber,
}) => {
    const [pickedDate, pickDate] = useState("");
    const [pickedTime, pickTime] = useState(0);
    const [operationalTimes, setOperationalTimes] = useState([]);
    const [isDateValid, toggleDateValid] = useState(true);
    const [isMorningEdge, setMorningEdge] = useState(false);
    const [barbers, setBarbers] = useState([]);
    const [isLoading, toggleLoading] = useState(false);

    const handleTimePick = (input) => {
        if (input === -1 && pickedTime > 0) pickTime(pickedTime - 1);
        if (input === 1 && pickedTime < operationalTimes.length - 1) pickTime(pickedTime + 1);
    };

    useEffect(() => {
        if (!pickedDate) return;
        const fetchBarbersForDay = async () => {
            toggleLoading(true);
            try {
                const dayNames = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
                const pickedDay = dayNames[new Date(pickedDate).getDay()];
                const list = await getAvailableBarbers(pickedDay);
                setBarbers(list);
                if (selectedBarber && !list.find(b => b.id === selectedBarber.id)) {
                    handleBarber(null);
                }
            } catch (err) {
                console.error("Failed to fetch barbers:", err);
                setBarbers([]);
            } finally {
                toggleLoading(false);
            }
        };
        fetchBarbersForDay();
    }, [pickedDate]);

    useEffect(() => {
        if (!pickedDate) return;

        const fetchAvailableTimes = async () => {
            toggleLoading(true);
            try {
                const dayNames = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
                const pickedDay = dayNames[new Date(pickedDate).getDay()];

                const violates = pickedService.some(s =>
                    Array.isArray(s.availableDays) && s.availableDays.length > 0 && !s.availableDays.includes(pickedDay)
                );

                if (violates) {
                    toggleDateValid(false);
                    setOperationalTimes([]);
                    return;
                }

                const pad = (n) => String(n).padStart(2, "0");
                const iso_date = `${new Date(pickedDate).getFullYear()}-${pad(new Date(pickedDate).getMonth() + 1)}-${pad(new Date(pickedDate).getDate())}`;

                const serviceIds = pickedService.map(s => s.id).filter(Boolean);

                let apiUrl;
                if (selectedBarber?.id) {
                    apiUrl = API_ROUTES.GET_AVAILABLE_TIMES_WITH_BARBER(encodeURIComponent(iso_date), serviceIds, selectedBarber.id);
                    console.log("with barber");
                } else {
                    apiUrl = API_ROUTES.GET_AVAILABLE_TIMES(encodeURIComponent(iso_date), serviceIds);
                    console.log("without barber");
                }

                const res = await fetch(apiUrl, { method: "GET" });
                const data = await res.json();

                if (!res.ok || data?.error) {
                    toggleDateValid(false);
                    setOperationalTimes([]);
                    return;
                }

                const times = Array.isArray(data.times) ? data.times : [];
                const formattedDate = data.formattedDate ?? iso_date;
                const morningEdge = !!data.morningEdge;

                toggleDateValid(true);
                handleDate(formattedDate);
                setMorningEdge(morningEdge);
                setOperationalTimes(times);
                pickTime(0);
            } catch (err) {
                console.error("fetchAvailableTimes failed:", err);
                toggleDateValid(false);
                setOperationalTimes([]);
            } finally {
                toggleLoading(false);
            }
        };

        fetchAvailableTimes();
    }, [pickedDate, selectedBarber]);

    const handleDateChange = (dateInput) => {
        pickDate(dateInput);
    };

    const handleContinue = () => {
        if (!date) {
            ToastManager.notify("Please Pick a Date!", "error");
            return;
        }
        if (!isDateValid) {
            ToastManager.notify("Please Pick a Valid Date!", "error");
            return;
        }
        if (operationalTimes.length === 0) {
            ToastManager.notify("Please Pick Another Date!", "error");
            return;
        }
        handlePage(3);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center lg:text-sm xl:text-base 2xl:text-lg">
            <Calendar
                mode="single"
                selected={pickedDate}
                onSelect={handleDateChange}
                className="my-4 rounded-md border"
            />

            <div className="w-full h-[0.5px] bg-gray-600 mb-8"></div>
            <div className={`space-y-4 ${pickedDate === "" ? 'invisible' : 'flex flex-col'} items-center`}>
                <p className="font-bold text-center">
                    <span className="text-[#545454]">
                        Selected Date:
                        <br className="block sm:hidden" />
                    </span>{" "}
                    {date}
                </p>
                <p className="font-extrabold text-[#545454]">
                    {isDateValid ? (
                        "Select Available Time"
                    ) : (
                        <span className="text-orange1">Please select another date!</span>
                    )}
                </p>

                {isMorningEdge && operationalTimes.length === 0 && <p>Morning Edge is not available!</p>}

                {isLoading ? (
                    <Spinner isLoading={isLoading} />
                ) : (
                    <>
                        {operationalTimes.length === 0 && pickedDate && isDateValid ? (
                            <p className="text-red-600 font-bold mt-4 text-center">
                                No available times on this date.<br /> Please pick another date.
                            </p>
                        ) : (
                            operationalTimes.length !== 0 && isDateValid && (
                                <>
                                    <div className="flex flex-row space-x-8">
                                        <Image
                                            onClick={() => handleTimePick(-1)}
                                            src={LeftArrow}
                                            alt="left-arrow"
                                        />
                                        <div className="text-black font-bold bg-white border border-1 border-black rounded px-6 py-2">
                                            {operationalTimes[pickedTime]}
                                        </div>
                                        <Image
                                            onClick={() => handleTimePick(1)}
                                            src={RightArrow}
                                            alt="right-arrow"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="font-extrabold text-[#545454]">Select Barber</p>
                                        <select
                                            id="barber-select"
                                            value={selectedBarber?.id ?? ""}
                                            onChange={(e) => handleBarber(barbers.find(b => b.id === e.target.value) ?? null)}
                                            className="w-full max-w-sm p-3 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Any</option>
                                            {barbers.map(b => (
                                                <option key={b.id} value={b.id}>
                                                    {b.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleContinue}
                                        className="border border-1 border-orange1 text-orange1 font-bold px-12 py-2 rounded mt-4"
                                    >
                                        Pay
                                    </button>
                                </>
                            )
                        )}
                    </>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default ChooseTime;
