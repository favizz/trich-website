"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
    const [isMember, setMembership] = useState(false);

    const [currPage, setPage] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
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

    const router = useRouter();

    useEffect(() => {
        router.replace("/");
    }, [router]);


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
                        setPoints={setPoints}
                        setMembership={setMembership}
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
                        isMember={isMember}
                        handlePage={setPage}
                        handleService={setService}
                        handleTotalPrice={setTotalPrice}
                        handleDuration={setDuration}
                        toggleConfirm={toggleConfirm}
                        queryParam={queryParam}
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
                        totalPrice={totalPrice}
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
                        pickedService={bookingResponse.serviceNames || pendingBooking.serviceNames}
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
