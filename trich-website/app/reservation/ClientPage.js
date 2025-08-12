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
    const [fullName, setFullName] = useState("Adli");
    const [phoneNumber, setPhoneNumber] = useState("812-3456-789");
    const [points, setPoints] = useState(100);

    const [currPage, setPage] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [isConfirm, toggleConfirm] = useState(false);
    const [pickedService, setService] = useState([]);
    const [pickedDate, setDate] = useState(null);
    const [pickedTime, setTime] = useState(null);
    const [totalDuration, setDuration] = useState(null);
    const [orderid, setOrderId] = useState(0);
    const [selectedBarber, setSelectedBarber] = useState({});

    const [pendingBooking, setPendingBooking] = useState({});
    const [bookingResponse, setBookingResponse] = useState({});

    const searchParams = useSearchParams();
    const encrypted = searchParams.get('q');

    const queryParam = encrypted ? unhashQuery(encrypted) : null;
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
                        selectedBarber={selectedBarber}
                        handleDate={setDate}
                        handleTime={setTime}
                        handlePage={setPage}
                        handleBarber={setSelectedBarber}
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
                        barber={selectedBarber}
                        setOrderId={setOrderId}
                        handlePage={setPage}
                        setBookingResponse={setBookingResponse}
                    />
                )}
                {currPage === 4 && (
                    <Checkout
                        first_name={fullName}
                        phone_number={`+62${phoneNumber.replace(/-/g, "")}`}
                        pickedService={bookingResponse.serviceNames || pendingBooking.service}
                        totalPrice={bookingResponse.amount || pendingBooking.amount}
                        orderId={bookingResponse.orderId ||  pendingBooking.orderId}
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
