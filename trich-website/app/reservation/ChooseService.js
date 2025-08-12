"use client";
import { useState, useEffect } from "react";

import { Services, handleRewardMatch } from "./Services";
import { API_ROUTES } from "@/constants/routes";
import { getMembership } from "@/utils/user";
import { getUser } from "@/utils/non-auth-user";

import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";

export const formatPrice = (number) => {
    const numberString = number.toString();
    const [integerPart, decimalPart = ""] = numberString.split(".");
    const reversedInteger = integerPart.split("").reverse().join("");

    let formattedInteger = "";
    for (let i = 0; i < reversedInteger.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedInteger += ".";
        }
        formattedInteger += reversedInteger[i];
    }

    formattedInteger = formattedInteger.split("").reverse().join("");
    const formattedNumber = `${formattedInteger}${
        decimalPart ? "." + decimalPart : ""
    }`;
    return formattedNumber;
};

const ChooseService = ({
    phoneNumber,
    points,
    setPoints,
    handlePage,
    handleService,
    handleTotalPrice,
    handleTotalActualPrice,
    handleDuration,
    toggleConfirm,
    queryParam
}) => {
    const [services, setServices] = useState([]);
    const [chosenServices, setChosenServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [totalDuration, setDuration] = useState(null);
    const [isMember, setMember] = useState(false);
    const [isLoading, toggleLoading] = useState(false);

    const byName = (name) => (s) => s.name === name;
    const hasName = (arr, name) => arr.some(byName(name));
    const withoutNames = (arr, names) => arr.filter(s => !names.includes(s.name));
    const withoutName = (arr, name) => arr.filter(s => s.name !== name);

    const TRICH = "The Trich Experience";
    const TRICH_CHILDREN = ["The Cutting Edge", "Trim & Treat", "Mask Off"];
    const KOREAN = "Korean Perm";
    const KOREAN_CHILDREN = ["Root Lift", "Down Perm"];

    function computeNextChosen(prev, service) {
        // Toggle off if already selected
        if (prev.some(s => s.name === service.name)) {
            return withoutName(prev, service.name);
        }

        // Selecting a bundle removes its children
        if (service.name === TRICH) {
            return [service, ...withoutNames(prev, TRICH_CHILDREN)];
        }
        if (service.name === KOREAN) {
            return [service, ...withoutNames(prev, KOREAN_CHILDREN)];
        }

        // Selecting a child when bundle active → block
        if (TRICH_CHILDREN.includes(service.name) && hasName(prev, TRICH)) {
            ToastManager.notify("Trich Experience already includes these services", "error");
            return prev;
        }
        if (KOREAN_CHILDREN.includes(service.name) && hasName(prev, KOREAN)) {
            ToastManager.notify("Korean Perm already includes these services", "error");
            return prev;
        }

        // Otherwise add
        return [...prev, service];
    }

    function computeTotals(selected, { services, isMember, points, queryParam }) {
        // Derive price & duration from selected objects directly (no strings).
        const price = selected.reduce((total, svc) => {
            // Do NOT mutate svc.nominal; compute a local effective price
            const base = (isMember && svc.name === "The Cutting Edge") ? 0 : (svc.nominal ?? 0);
            const adjusted = handleRewardMatch(
            queryParam,
            svc.query_code,
            base,
            points
            );
            return total + (adjusted ?? 0);
        }, 0);

        const duration = selected.reduce((total, svc) => {
            return total + (svc?.duration ?? 0);
        }, 0);

        return { price, duration };
    }

    const handleServiceChange = (service) => {
        // 1) compute next list from current state (no async yet)
        const nextChosen = computeNextChosen(chosenServices, service);

        // 2) commit state
        setChosenServices(nextChosen);

        // 3) derive totals from the SAME array to avoid race conditions
        const { price, duration } = computeTotals(nextChosen, {
            services,         // if you need all services for anything later
            isMember,
            points,
            queryParam,
        });

        setTotalPrice(price);
        setDuration(duration);
    };
    
    const handleSubmit = () => {
        if (chosenServices.length == 0) {
            ToastManager.notify("Please select a service!", "error");
            return;
        }
        if (
            chosenServices.length < 2 &&
            (chosenServices.includes("Mask Off") ||
                chosenServices.includes("Wax Mining") ||
                chosenServices.includes("Trim & Treat") ||
                chosenServices.includes("Creambath"))
        ) {
            ToastManager.notify("Please add another service!", "error");
            return;
        }
        toggleConfirm(true);
        handlePage(2);
    };

    useEffect(() => {
        let isMounted = true;
        const ac = new AbortController();

        const run = async () => {
            toggleLoading(true);
            try {
                const servicesReq = fetch(API_ROUTES.GET_SERVICES, { method: "GET", signal: ac.signal })
                    .then(async (r) => {
                            if (!r.ok) {
                                console.log("Server error", r.status, r.statusText);
                                return null;
                            }
                            return r.json();
                        })
                    .catch((err) => {
                        if (err.name !== "AbortError") console.error("fetch services failed:", err);
                        return null;
                });

                const userReq = fetch(API_ROUTES.GET_USER_BY_PHONE(phoneNumber), { method: "GET", signal: ac.signal })
                    .then(async (res) => {
                            if (!res.ok) {
                                console.error(res?.error);
                                return null;
                            }
                            return res.json();
                        })
                    .catch((err) => {
                        console.error("getUser failed:", err);
                        return null;
                    });
                
                const membershipReq = getMembership(phoneNumber)
                    .then((res) => {
                        if (res?.error) {
                            console.error(res.error);
                            return null;
                        }
                        return res.membership ?? null;
                        })
                        .catch((err) => {
                        console.error("getMembership failed:", err);
                        return null;
                    });

                const [servicesData, user, membership] = await Promise.all([
                    servicesReq,
                    userReq,
                    membershipReq,
                ]);

                if (!isMounted) return;

                if (servicesData) setServices(servicesData);
                if (user) setPoints(user.point);
                if (membership) setMember(true);
            } finally {
                if (isMounted) toggleLoading(false);
            }
        };

        run();

        return () => {
            isMounted = false;
            ac.abort();
        };
    }, []);

    return (
        <div className="w-full space-y-2">
            {services.length > 0 && services.map((service, idx) => {
                return (
                    <div key={idx} className="pt-1">
                        {/* non-drop down services */}
                        {!service.is_list && (
                            <div 
                                onClick={() => handleServiceChange(service)}
                                className="flex flex-row items-center justify-between font-bold px-4 lg:px-6 xl:px-10">
                                <div className="flex flex-col space-y-0">
                                    <p className="font-bold text-sm lg:text-sm xl:text-base 2xl:text-lg">
                                        {service.name} -{" "}
                                        <span className="text-orange1 font-semibold">
                                            {service.is_promo &&
                                            service.name ==
                                                "Root Lift & Down Perm" ? (
                                                <span className="line-through">
                                                    300.000
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                            {service.is_promo &&
                                            service.name == "Morning Edge" ? (
                                                <span className="line-through">
                                                    85.000
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                            {"  "}
                                            {service.is_range
                                                ? service.price
                                                : isMember &&
                                                    service.name ===
                                                        "The Cutting Edge"
                                                  ? "Free"
                                                  : formatPrice(
                                                        handleRewardMatch(
                                                            queryParam,
                                                            service?.query_code,
                                                            service.price,
                                                            points
                                                        )
                                                    )
                                            }
                                            {
                                                service.price !== handleRewardMatch(
                                                    queryParam,
                                                    service?.query_code,
                                                    service.price,
                                                    points
                                                ) ?
                                                " (Discount!)"
                                                :
                                                ""
                                            }
                                        </span>
                                    </p>
                                    {service.is_range && (
                                        <p className="text-green2 font-semibold text-xs xl:text-sm 2xl:text-base w-3/4">
                                            *final price will be determined once
                                            the service is done
                                        </p>
                                    )}
                                    <p className="text-gray-500 font-semibold text-sm lg:text-sm xl:text-base 2xl:text-lg">
                                        duration:{" "}
                                        <span className="font-bold">
                                            {service.duration}
                                        </span>{" "}
                                        minutes
                                    </p>
                                    <p className="text-green2 font-semibold text-xs xl:text-sm 2xl:text-base w-3/4">
                                        {service.name == "The Trich Experience"
                                            ? "*  The Trich Experience includes The Cutting Edge and 2 additional services"
                                            : ""}
                                        {service.name === "The Cutting Edge" &&
                                        isMember
                                            ? "Enjoy your membership deal!"
                                            : ""}
                                        {service.name == "Korean Perm"
                                            ? "*  Korean Perm includes Root Lift & Down Perm"
                                            : ""}
                                        {service.name ==
                                            "Back To School Promo!" ||
                                        service.name == "Morning Edge"
                                            ? "Please refer to the provided t&c"
                                            : ""}
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="md:w-6 md:h-6 rounded-xl accent-orange1"
                                    checked={chosenServices.some(s => s.name === service.name)}
                                    onChange={() =>
                                        handleServiceChange(service)
                                    }
                                />
                            </div>
                        )}

                        {/* Dropdown services */}
                        {service.is_list && (
                            <div className="flex flex-col font-bold px-4 lg:px-6 xl:px-10">
                                <p className="font-bold text-base xl:text-lg 2xl:text-xl">
                                    {service.name}
                                </p>
                                {service.is_range && (
                                    <p className="text-green2 font-semibold text-xs xl:text-sm 2xl:text-base w-3/4">
                                        *final price will be determined once the
                                        service is done
                                    </p>
                                )}
                                <div className="pt-2 pl-4 lg:pl-6 xl:pl-10 space-y-2">
                                    {service.services.map((s, id) => {
                                        return (
                                            <div
                                                key={id}
                                                className="flex flex-row items-center space-x-4"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="md:w-6 md:h-6 rounded-xl accent-orange1"
                                                    checked={chosenServices.includes(
                                                        s.name,
                                                    )}
                                                    onChange={() =>
                                                        handleServiceChange(
                                                            s.name,
                                                        )
                                                    }
                                                />
                                                <div className="flex flex-col">
                                                    <p className="font-bold text-xs xl:text-base 2xl:text-lg">
                                                        {s.name} -{" "}
                                                        <span className="text-orange1 font-semibold">
                                                            {service.is_range
                                                                ? s.price
                                                                : formatPrice(
                                                                      s.price,
                                                                  )}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-500 font-semibold text-sm lg:text-sm xl:text-base 2xl:text-lg">
                                                        duration:{" "}
                                                        <span className="font-bold">
                                                            {s.duration}
                                                        </span>{" "}
                                                        minutes
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="w-full h-[0.5px] mt-1 bg-gray-600"></div>
                    </div>
                );
            })}

            <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                <div
                    onClick={() => {
                        handleService(chosenServices);
                        handleTotalPrice(totalPrice);
                        handleTotalActualPrice(totalActualPrice);
                        handleDuration(totalDuration);
                        handleSubmit();
                    }}
                    className="text-center border hover:border-orange1 hover:bg-white bg-orange1 hover:text-orange1 text-white font-bold  px-12 py-2 rounded"
                >
                    Continue
                </div>
                <p className="text-center text-black font-extrabold">
                    You can choose more than 1 service
                </p>
            </div>

            <div className="w-0 h-0">
                <ToastContainer />
            </div>
        </div>
    );
};

export default ChooseService;
