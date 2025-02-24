"use client";
import { useState, useEffect } from "react";
import withAuth from "@/authContext/withAuth";

import ClientForm from "./ClientForm";
import ChooseService from "./ChooseService";
import ConfirmService from "./ConfirmService";
import ChooseTime from "./ChooseTime";
import ConfirmPay from "./ConfirmPay";
import Checkout from "./Checkout";

import { ToastContainer } from "react-toastify";

const ClientPage = () => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [currPage, setPage] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [isConfirm, toggleConfirm] = useState(false);
    const [pickedService, setService] = useState(null);
    const [pickedDate, setDate] = useState(null);
    const [pickedTime, setTime] = useState(null);
    const [totalDuration, setDuration] = useState(null);

    const [orderid, setOrderId] = useState(0);

    return (
        <>
            <section className="flex flex-col items-center bg-white rounded-lg py-8 my-28 shadow-xl tracking-wider">
                <h2 className="font-extrabold mb-6 lg:text-xl xl:text-2xl">
                    RESERVATION
                </h2>
                <div className="w-full h-[1px] bg-gray-600"></div>
                <div
                    className={`${currPage === 0 ? "hidden" : "flex"} flex-row items-center justify-center space-x-3 md:space-x-8 px-3 lg:px-6 py-4`}
                >
                    <div
                        onClick={() => setPage(1)}
                        className={`${
                            currPage == 1
                                ? "bg-green1 text-white"
                                : "text-black"
                        } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                    >
                        Service
                    </div>
                    <p>&gt;</p>
                    <div
                        onClick={() => setPage(pickedService ? 2 : null)}
                        className={`${
                            currPage == 2
                                ? "bg-green1 text-white"
                                : "text-black"
                        } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                    >
                        Time
                    </div>
                    <p>&gt;</p>
                    <div
                        className={`${
                            currPage == 3
                                ? "bg-green1 text-white"
                                : "text-black"
                        } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                    >
                        Confirm
                    </div>
                </div>
                <div className="w-full h-[0.5px] mb-2 bg-gray-600"></div>
                {currPage === 0 && (
                    <ClientForm
                        fullName={fullName}
                        getFullName={setFullName}
                        phoneNumber={phoneNumber}
                        getPhoneNumber={setPhoneNumber}
                        setPage={setPage}
                    />
                )}
                {currPage === 1 && (
                    <ChooseService
                        handlePage={setPage}
                        handleService={setService}
                        handleTotalPrice={setTotalPrice}
                        handleTotalActualPrice={setTotalActualPrice}
                        handleDuration={setDuration}
                        toggleConfirm={toggleConfirm}
                    />
                )}
                {currPage == 1 && isConfirm && (
                    <ConfirmService
                        myService={pickedService}
                        toggleConfirm={toggleConfirm}
                        handlePage={setPage}
                    />
                )}
                {currPage == 2 && (
                    <ChooseTime
                        pickedService={pickedService}
                        date={pickedDate}
                        handleDate={setDate}
                        handleTime={setTime}
                        handlePage={setPage}
                    />
                )}
                {currPage == 3 && (
                    <ConfirmPay
                        date={pickedDate}
                        time={pickedTime}
                        service={pickedService}
                        price={totalPrice}
                        actualPrice={totalActualPrice}
                        duration={totalDuration}
                        setOrderId={setOrderId}
                        handlePage={setPage}
                    />
                )}
                {currPage == 4 && (
                    <Checkout
                        pickedService={pickedService}
                        totalPrice={totalPrice}
                        pickedDate={pickedDate}
                        pickedTime={pickedTime}
                        orderId={orderid}
                    />
                )}
                <div className="w-0 h-0">
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default withAuth(ClientPage);
