"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "@/utils/non-auth-user";
import { getUserBookings, getMembership } from "@/utils/user";
import { setCredentials } from "@/utils/cookieManager";

import ClientCard from "./ClientCard";
import Header from "./Header";
import ClientForm from "./ClientForm";
import ClientPoints from "./ClientPoints";
import ClientInfo from "./ClientInfo";
import PointsGuide from "./PointsGuide";
import LoyaltyRewards from "./LoyaltyRewards";
import Membership from "./Membership";
import ClientBookings from "./ClientBookings";

const ClientPage = () => {
    const [currPage, setPage] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [user, setUser] = useState(null);
    const [isMember, setMember] = useState(false);
    const [memberExpirationDate, setMemberExpirationDate] = useState(null);
    const [bookingData, setBookingData] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUser = async () => {
        toggleLoading(true);
        const formattedPhone = `+62${phoneNumber.replace(/-/g, "").replace(/^0/, "")}`;
        const res = await getUser(formattedPhone);

        if (res.success) {
        if (res.user) {
            setUser(res.user);
            setCredentials(phoneNumber, res.user.name);
            setMember(res.user.member);
            setMemberExpirationDate(res.user.memberExpirationDate);
        } else {
            setError("User not found. Please check your phone number or contact support.");
        }
        } else {
        console.log(res.error);
        setError("Unable to fetch user data. Please try again later.");
        }
    };

    const handleBooking = async () => {
        const res = await getUserBookings(phoneNumber);

        if (res.success) {
        setBookingData(res.bookings ?? []);
        } else {
        console.log(res.error);
        setBookingData([]);
        }
        toggleLoading(false);
    };

    const handleMembershipPricing = async () => {
        const response = await getMembership(phoneNumber);

        if (response.error) {
        console.error(response.error);
        setMember(false);
        setMemberExpirationDate(null);
        return;
        }

        if (response.membership) {
        setMember(true);
        setMemberExpirationDate(response.membership.expirationDate); // <-- store expiration date
        } else {
        setMember(false);
        setMemberExpirationDate(null);
        }
        toggleLoading(false);
    };

    useEffect(() => {
        setError(null);
        if (phoneNumber === "") return;

        handleUser();
        handleBooking();
        handleMembershipPricing();
        toggleLoading(false);
    }, [phoneNumber]);

    useEffect(() => {
        if (!error && user) {
        setPage(2);
        }
    }, [user]);

    return (
        <section className="relative max-w-screen-2xl my-16 lg:my-36 px-4 pt-16 lg:pt-0 lg:px-16 lg:py-36">
        {currPage !== 0 && <Header />}

        <section
            className={`relative z-10 ${
            currPage === 0 ? "" : "pt-36"
            } flex flex-col lg:flex-row items-center lg:items-start justify-center space-y-5 lg:space-y-0 lg:space-x-8 mt-5 lg:mt-0`}
        >
            {currPage !== 0 && (
            <ClientCard
                name={user?.name}
                phoneNumber={phoneNumber}
                isMember={isMember}
                handlePaging={setPage}
                currPage={currPage}
            />
            )}
            {currPage === 0 && (
            <ClientForm setPhoneNumber={setPhoneNumber} isLoading={isLoading} error={error} />
            )}
            {currPage === 1 && (
            <div className="space-y-5">
                <ClientPoints point={user?.point} />
                <PointsGuide />
                <LoyaltyRewards points={user?.point} phoneNumber={phoneNumber} />
                <Membership />
            </div>
            )}
            {currPage === 2 && (
            <div className="space-y-5">
                <ClientPoints point={user?.point} />
                <ClientBookings phoneNumber={user?.phoneNumber} />
            </div>
            )}
            {currPage === 3 && (
            <div className="space-y-5">
                <ClientInfo
                first_name={user?.name}
                phone_number={user?.phoneNumber}
                isMember={isMember}
                memberExpirationDate={memberExpirationDate}
                />
            </div>
            )}
        </section>
        </section>
    );
};

export default ClientPage;
