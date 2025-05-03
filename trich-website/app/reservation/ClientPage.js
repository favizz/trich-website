"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { unhashQuery } from "@/utils/dateHash";

import Header from "./Header";
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
    const [points, setPoints] = useState(0);

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

    const searchParams = useSearchParams();
    const encrypted = searchParams.get('q');          
    const queryParam = unhashQuery(encrypted) 

    return (
        <>
            <section className="flex flex-col bg-white rounded-lg py-8 my-32 shadow-xl tracking-wider">
                <Header
                    currPage={currPage}
                />
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
                        points={points}
                        setPoints={setPoints}
                        handlePage={setPage}
                        handleService={setService}
                        handleTotalPrice={setTotalPrice}
                        handleTotalActualPrice={setTotalActualPrice}
                        handleDuration={setDuration}
                        toggleConfirm={toggleConfirm}
                        queryParam={queryParam}
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
                        queryParam={queryParam}
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
