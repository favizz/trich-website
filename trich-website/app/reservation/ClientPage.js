"use client";
import { useState } from "react";

import ClientForm from "./ClientForm";
import ClientPendings from "./ClientPendings";
import ChooseService from "./ChooseService";
import ConfirmService from "./ConfirmService";
import ChooseTime from "./ChooseTime";
import ConfirmPay from "./ConfirmPay";
import Checkout from "./Checkout";

import { ToastContainer } from "react-toastify";

const ClientPage = () => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [currPage, setPage] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [isConfirm, toggleConfirm] = useState(false);
    const [pickedService, setService] = useState(null);
    const [pickedDate, setDate] = useState(null);
    const [pickedTime, setTime] = useState(null);
    const [totalDuration, setDuration] = useState(null);
    const [orderid, setOrderId] = useState(0);

    const [pendingBooking, setPendingBooking] = useState({
        booking_ref: null,
        booking_data: null
    });

    return (
        <>
            <section className="flex flex-col bg-white rounded-lg py-8 my-32 shadow-xl tracking-wider">


                <h2 className="font-extrabold mb-6 lg:text-xl xl:text-2xl text-center">
                    RESERVATION
                </h2>
                <div className="w-full h-[1px] bg-gray-600 "></div>
                <div
                    className="flex flex-row items-center justify-center space-x-3 md:space-x-8 px-3 lg:px-6 py-4 "
                >
                    <div
                        onClick={() => setPage(0)}
                        className={`${
                            currPage == 0
                                ? "bg-green1 text-white"
                                : "text-black"
                        } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2 `}
                    >
                        Info
                    </div>
                    <p>&gt;</p>
                    <div
                        onClick={() => phoneNumber !== "" && fullName !== "" && setPage(1)}
                        className={`${
                            currPage == 1
                                ? "bg-green1 text-white"
                                : "text-black"
                        } ${phoneNumber === ""? "opacity-50 cursor-not-allowed" : ""} rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                    >
                        Service
                    </div>
                    <p>&gt;</p>
                    <div
                        onClick={() => pickedService ? setPage(2) : null}
                        className={`${
                            currPage == 2
                                ? "bg-green1 text-white"
                                : "text-black"
                        } ${!pickedService ? "opacity-50 cursor-not-allowed" : ""} 
                        rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                    >
                        Time
                    </div>

                </div>
                <div className="w-full h-[0.5px] mb-2 bg-gray-600 "></div>
                {currPage === 0 && (
                    <ClientForm
                        fullName={fullName}
                        setFullName={setFullName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        setPage={setPage}
                        setPendingBooking={setPendingBooking}
                    />
                )}
                {currPage === 5 && (
                    <ClientPendings 
                        pendingBooking={pendingBooking}
                        setPendingBooking={setPendingBooking}
                        setPage={setPage}
                    />
                )}
                {currPage === 1 && (
                    <ChooseService
                        phoneNumber={`+62${phoneNumber.replace(/-/g, "")}`}
                        handlePage={setPage}
                        handleService={setService}
                        handleTotalPrice={setTotalPrice}
                        handleTotalActualPrice={setTotalActualPrice}
                        handleDuration={setDuration}
                        toggleConfirm={toggleConfirm}
                    />
                )}
                {currPage === 1 && isConfirm && (
                    <ConfirmService
                        myService={pickedService}
                        toggleConfirm={toggleConfirm}
                        handlePage={setPage}
                    />
                )}
                {currPage === 2 && (
                    <ChooseTime
                        pickedService={pickedService}
                        date={pickedDate}
                        handleDate={setDate}
                        handleTime={setTime}
                        handlePage={setPage}
                    />
                )}
                {currPage === 3 && (
                    <ConfirmPay
                        user={{first_name: fullName, phone_number: `+62${phoneNumber.replace(/-/g, "")}`}}
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
                {currPage === 4 && (
                    <Checkout
                        first_name={fullName}
                        phone_number={`+62${phoneNumber.replace(/-/g, "")}`}
                        pickedService={pickedService || pendingBooking.booking_data.service}
                        totalPrice={totalPrice || pendingBooking.booking_data.amount}
                        orderId={orderid ||  pendingBooking.booking_data.order_id}
                    />
                )}
                <div className="w-0 h-0">
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default ClientPage;
