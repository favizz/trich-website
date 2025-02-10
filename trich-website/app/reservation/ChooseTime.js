import Image from "next/image";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";

import { Calendar } from "@/components/ui/calendar";

import LeftArrow from "@/public/reservationAssets/leftarrow.svg";
import RightArrow from "@/public/reservationAssets/rightarrow.svg";

const ChooseTime = ({
    pickedService,
    date,
    handleDate,
    handleTime,
    handlePage,
}) => {
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

    const allOperationalTimes = [];

    const [pickedDate, pickDate] = useState("");
    const [pickedTime, pickTime] = useState(0);
    const [operationalTimes, setOperationalTimes] =
        useState(allOperationalTimes);
    const [isDateValid, toggleDateValid] = useState(true);
    const [isMorningEdge, setMorningEdge] = useState(false);

    const handleTimePick = (input) => {
        if (input === -1) {
            if (pickedTime > 0) {
                pickTime(pickedTime - 1);
            }
        } else if (input === 1) {
            if (pickedTime < operationalTimes.length - 1) {
                pickTime(pickedTime + 1);
            }
        }
    };

    useEffect(() => {
        handleTime(operationalTimes[pickedTime] || null);
    }, [pickedDate, pickedTime, operationalTimes]);

    const handleDateChange = async (dateInput) => {
        pickDate(dateInput);
        const inputDate = dateInput;
        const currentDate = new Date();

        inputDate.setHours(8, 0, 0, 0);
        currentDate.setHours(8, 0, 0, 0);

        if (inputDate < currentDate) {
            toggleDateValid(!isDateValid);
            return;
        }

        toggleDateValid(true);

        inputDate.setMinutes(
            inputDate.getMinutes() + inputDate.getTimezoneOffset(),
        );

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            inputDate,
        );

        handleDate(formattedDate);

        let availableTimes = generateOperationalTimes(inputDate);

        if (inputDate.getDay() === 5) {
            availableTimes = availableTimes.filter((time) => time !== "12:00");
        }

        if (pickedService && pickedService.includes("Morning Edge")) {
            if (
                inputDate.getDay() === 6 ||
                inputDate.getDay() === 0 ||
                inputDate.getDay() === 5
            ) {
                setOperationalTimes([]);
                availableTimes = [];
                setMorningEdge(true);
            }
            availableTimes = availableTimes.filter((time) => time <= "12:00");
        } else setMorningEdge(false);

        try {
            const q = query(
                collection(db, "active_booking"),
                where("date", "==", formattedDate),
            );

            const rq = query(
                collection(db, "reservation_quota"),
                where("date", "==", formattedDate),
            );

            const querySnapshot = await getDocs(q);
            const reservationQuerySnapshot = await getDocs(rq);
            const bookings = querySnapshot.docs.map((doc) => doc.data());
            const quotas = reservationQuerySnapshot.docs.map((doc) =>
                doc.data(),
            );

            let fullyBookedTimes = bookings.reduce((acc, booking) => {
                acc[booking.time] = (acc[booking.time] || 0) + 1;
                return acc;
            }, {});

            quotas.forEach((quota) => {
                availableTimes.forEach((time) => {
                    if (!fullyBookedTimes[time]) {
                        fullyBookedTimes[time] = 0;
                    }
                    if (fullyBookedTimes[time] >= quota.quota) {
                        if (inputDate.getDay() > 0 && inputDate.getDay() < 5) {
                            fullyBookedTimes[time] = 2;
                        } else {
                            fullyBookedTimes[time] = 2; // DEFAULT 2
                        }
                    }
                });
            });

            if (inputDate.getDay() > 0 && inputDate.getDay() < 5) {
                availableTimes = availableTimes.filter(
                    (time) =>
                        !fullyBookedTimes[time] || fullyBookedTimes[time] < 1, // UBAH JADI 2 LAGI
                );
            } else {
                availableTimes = availableTimes.filter(
                    (time) =>
                        !fullyBookedTimes[time] || fullyBookedTimes[time] < 2, // DEFAULT 2
                );
            }

            setOperationalTimes(availableTimes);
            // console.log(pickedDate)
        } catch (error) {
            console.error(error);
        }

        pickTime(0);
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
            <div className="space-y-4 flex flex-col items-center">
                <p className="font-bold">
                    <span className="text-[#545454]">Selected Date:</span>{" "}
                    {date}
                </p>
                <p className="font-extrabold">
                    {isDateValid ? (
                        "Select Available Time"
                    ) : (
                        <span className="text-orange1">
                            Please select another date!
                        </span>
                    )}
                </p>

                {isMorningEdge && operationalTimes.length === 0 ? (
                    <p>Morning Edge is not available!</p>
                ) : (
                    ""
                )}

                {operationalTimes.length !== 0 && (
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
                        <button
                            onClick={() => handleContinue()}
                            className="border border-1 border-orange1 text-orange1 font-bold px-12 py-2 rounded"
                        >
                            Pay
                        </button>
                    </>
                )}
            </div>

            <div className="w-0 h-0">
                <ToastContainer />
            </div>
        </div>
    );
};

export default ChooseTime;
