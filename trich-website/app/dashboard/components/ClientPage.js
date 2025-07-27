"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "@/utils/non-auth-user";
import { getUserBookings } from "@/utils/user";
import { setCredentials } from "@/utils/cookieManager";
import { getMembership } from "@/utils/user";

import ClientCard from "./ClientCard";
// import ClientStats from "./ClientStats";

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
    const [bookingData, setBookingData] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUser = async () => {
        toggleLoading(true);
        const res = await getUser(`+62${phoneNumber.replace(/\D/g, "")}`);

        if (res.success) {
            if (res.user) {
                setUser(res.user);
                setCredentials(
                    phoneNumber, 
                    res.user.first_name
                )
            }
            else {
                setError("No user found!");
            }
        } else {
            console.log(res.error);
        }
    }

    const handleBooking = async () => {
        const res = await getUserBookings(`+62${phoneNumber.replace(/\D/g, "")}`);

        if (res.success) {
            if (res.bookings) {
                setBookingData(res.bookings);
            }
            else {
                console.error("No booking found!");
            }
        } else {
            console.log(res.error);
        }
        toggleLoading(false);
    }

    const handleMembershipPricing = async () => {
        const response = await getMembership(`+62${phoneNumber.replace(/\D/g, "")}`);

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

    useEffect(() => {
        setError(null);
        if (phoneNumber === "") {
            return;
        }

        handleUser();
        handleBooking();
        handleMembershipPricing();
        
        toggleLoading(false);
    }, [phoneNumber]);

    useEffect(() => {
        if (!error && user) {
            setPage(2);
        }
    }, [user])

    return (
        <section className="relative max-w-screen-2xl my-16 lg:my-36 px-4 pt-16 lg:pt-0 lg:px-16 lg:py-36">
            {currPage !== 0 && 
                <Header/> 
            }

            <section className={`relative z-10 ${currPage === 0 ? "" : "pt-36"} flex flex-col lg:flex-row items-center lg:items-start justify-center space-y-5 lg:space-y-0 lg:space-x-8 mt-5 lg:mt-0`}>
                {currPage !== 0 && 
                    <ClientCard
                        name={user.first_name}
                        phoneNumber={phoneNumber}
                        isMember={isMember}
                        handlePaging={setPage}
                        currPage={currPage}
                    />  
                }
                {currPage === 0 && 
                    <ClientForm
                        setPhoneNumber={setPhoneNumber}
                        isLoading={isLoading}
                        error={error}
                    />
                }
                {currPage == 1 &&                     
                    (<div className="space-y-5">
                        <ClientPoints 
                            point={user.point}
                        />
                        <PointsGuide />
                        <LoyaltyRewards 
                            points={user.point}
                        />
                        <Membership />
                    </div>)}
                {currPage == 2 && (
                    <div className="space-y-5">
                        <ClientPoints 
                            point={user.point}
                        />
                        <ClientBookings 
                            phoneNumber={user.phone_number} 
                        />
                    </div>
                )}
                {currPage == 3 && (
                    <div className="space-y-5">
                        <ClientInfo
                            first_name={user.first_name}
                            phone_number={user.phone_number}
                        />
                    </div>
                )}
            </section>
        </section>
    );
};

export default ClientPage;
