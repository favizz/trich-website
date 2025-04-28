"use client";
import { useState, useEffect } from "react";

import { Services, handleRewardMatch } from "./Services";
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

export const promoPricing = (name) => {
    const nowDate = new Date();
    if (name === "The Cutting Edge") {
        if (nowDate.getDay() >= 1 && nowDate.getDay() <= 4) {
            if (nowDate.getHours() >= 10 && nowDate.getHours() < 13) {
                return true;
            }
        }
    }
    return false;
};

export const handleActualPromoPricing = (service, actualPrice) => {
    const nowDate = new Date();
    // GANTI KALO UDH PERLU
    if (service === "sbdjsdbs") {
        if (nowDate.getHours() >= 10 && nowDate.getHours() < 13) {
            return (
                <>
                    <span className="line-through">85.000</span>
                    <span> - 65.000</span>
                </>
            );
        }
    }
    return formatPrice(actualPrice);
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
    const [chosenServices, setChosenServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [totalDuration, setDuration] = useState(null);
    const [isMember, setMember] = useState(false);
    const [isLoading, toggleLoading] = useState(false);

    const handleServiceChange = (service) => {
        let updatedServices;

        if (chosenServices.includes(service)) {
            updatedServices = chosenServices.filter((s) => s !== service);
        } else {
            if (service === "The Trich Experience") {
                updatedServices = [
                    "The Trich Experience",
                    ...chosenServices.filter(
                        (s) =>
                            s !== "The Cutting Edge" &&
                            s !== "Trim & Treat" &&
                            s !== "Mask Off",
                    ),
                ];
            } else if (service === "Korean Perm") {
                updatedServices = [
                    "Korean Perm",
                    ...chosenServices.filter(
                        (s) => s !== "Root Lift" && s !== "Down Perm",
                    ),
                ];
            } else if (
                service === "The Cutting Edge" ||
                service === "Trim & Treat" ||
                service === "Mask Off"
            ) {
                if (chosenServices.includes("The Trich Experience")) {
                    ToastManager.notify(
                        "Trich Experience already includes these services",
                        "error",
                    );
                    return;
                }
                updatedServices = [...chosenServices, service];
            } else if (service === "Root Lift" || service === "Down Perm") {
                // Check if "Korean Perm" is already selected
                if (chosenServices.includes("Korean Perm")) {
                    ToastManager.notify(
                        "Korean Perm already includes these services",
                        "error",
                    );
                    return;
                }
                updatedServices = [...chosenServices, service];
            } else {
                updatedServices = [...chosenServices, service];
            }
        }

        setChosenServices(updatedServices);

        setTotalPrice(
            updatedServices.reduce((total, serviceName) => {
                let serviceObj = Services.find((s) => s.name === serviceName);

                if (!serviceObj) {
                    Services.forEach((parentService) => {
                        if (
                            parentService.is_list &&
                            parentService.services.length > 0
                        ) {
                            const nestedService = parentService.services.find(
                                (nested) => nested.name === serviceName,
                            );
                            if (nestedService) {
                                serviceObj = nestedService;
                            }
                        }
                    });
                }
                if (isMember && serviceName === "The Cutting Edge") {
                    serviceObj.nominal = 0;
                }

                const tempTotalPrice = handleRewardMatch(
                    queryParam, 
                    serviceObj.query_code,
                    serviceObj.nominal,
                    points
                )
                return total + tempTotalPrice;
            }, 0),
        );

        setTotalActualPrice(
            updatedServices.reduce((total, serviceName) => {
                let serviceObj = Services.find((s) => s.name === serviceName);

                if (!serviceObj) {
                    Services.forEach((parentService) => {
                        if (
                            parentService.is_list &&
                            parentService.services.length > 0
                        ) {
                            const nestedService = parentService.services.find(
                                (nested) => nested.name === serviceName,
                            );
                            if (nestedService) {
                                serviceObj = nestedService;
                            }
                        }
                    });
                }
                if (isMember && serviceName === "The Cutting Edge") {
                    serviceObj.actual_price = 0;
                }
                
                const tempActualPrice = handleRewardMatch(
                    queryParam,
                    serviceObj.query_code,
                    serviceObj.actual_price,
                    points
                )
                return total + tempActualPrice;
            }, 0),
        );

        setDuration(
            updatedServices.reduce((total, serviceName) => {
                let serviceObj = Services.find((s) => s.name === serviceName);

                if (!serviceObj) {
                    Services.forEach((parentService) => {
                        if (
                            parentService.is_list &&
                            parentService.services.length > 0
                        ) {
                            const nestedService = parentService.services.find(
                                (nested) => nested.name === serviceName,
                            );
                            if (nestedService) {
                                serviceObj = nestedService;
                            }
                        }
                    });
                }

                return total + (serviceObj ? serviceObj.duration : 0);
            }, 0),
        );
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
        (async () => {
            toggleLoading(true);
            const res = await getUser(phoneNumber);
            toggleLoading(false);
        
            if (!res.success) {
                console.error(res.error);
                return;
            }
        
            if (res.user) {
                setPoints(res.user.point);
            }
        })();
      }, []);

    useEffect(() => {
        toggleLoading(true);

        const handleMembershipPricing = async () => {
            const response = await getMembership(phoneNumber);

            if (response.error) {
                console.error(response.error);
                return;
            }

            if (response.membership) {
                setMember(true);
            }
            toggleLoading(false);
            return;
        };

        handleMembershipPricing();
    }, []);

    return (
        <div className="w-full space-y-2">
            {Services.map((service, idx) => {
                return (
                    <div key={idx} className="pt-1">
                        {/* non-drop down services */}
                        {!service.is_list && (
                            <div 
                                onClick={() => handleServiceChange(service.name)}
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
                                                ? service.actual_price
                                                : isMember &&
                                                    service.name ===
                                                        "The Cutting Edge"
                                                  ? "Free"
                                                  : formatPrice(
                                                        handleRewardMatch(
                                                            queryParam,
                                                            service.query_code,
                                                            service.actual_price,
                                                            points
                                                        )
                                                    )
                                            }
                                            {
                                                service.actual_price !== handleRewardMatch(
                                                    queryParam,
                                                    service.query_code,
                                                    service.actual_price,
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
                                            {service.duration * 60}
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
                                    checked={chosenServices.includes(
                                        service.name,
                                    )}
                                    onChange={() =>
                                        handleServiceChange(service.name)
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
                                                                ? s.actual_price
                                                                : formatPrice(
                                                                      s.actual_price,
                                                                  )}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-500 font-semibold text-sm lg:text-sm xl:text-base 2xl:text-lg">
                                                        duration:{" "}
                                                        <span className="font-bold">
                                                            {s.duration * 60}
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
                        const tempService = chosenServices.join(", ");
                        handleService(tempService);
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
