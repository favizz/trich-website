"use client";
import React, { useEffect, useState } from "react";
import withAuth from "@/authContext/withAuth";

import { useAuth } from "@/authContext/AuthProvider";

// import { getUserData } from "@/utils/user";

import ClientCard from "./ClientCard";
// import ClientStats from "./ClientStats";
import ClientBookings from "./ClientBookings";
import ClientInfo from "./ClientInfo";
import Membership from "./Membership";

import BannerBG from "@/public/dashboardAssets/bannerBg.png";

const ClientPage = () => {
    const { user } = useAuth();
    console.log(user);
    // const [userData, setUserData] = useState(user);
    const [currPage, setPage] = useState(2);
    const [bookingData, setBookingData] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await getUserData();
    //             if (response.success) {
    //                 setUserData(response.user);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     })();
    // }, []);

    return (
        <section className="relative max-w-screen-2xl my-16 lg:my-36 pt-16 lg:pt-0 lg:px-16 lg:py-36">
            <div
                style={{ backgroundImage: `url(${BannerBG.src})` }}
                className="absolute inset-x-0 top-0 h-48 lg:px-16 lg:py-8"
            >
                <h3 className="font-extrabold text-white tracking-wider lg:text-3xl">
                    EARN REWARDS WHILE YOU GROOM IN STYLE!
                </h3>
                <p className="text-white leading-7 tracking-wider opacity-50 lg:text-xl">
                    Unlock exclusive benefits with every visit to TRICH
                    Barbershop.
                </p>
            </div>
            <section className="relative z-10 pt-36 flex flex-col lg:flex-row items-center lg:items-start justify-center space-y-8 lg:space-y-0 lg:space-x-8">
                <ClientCard
                    name={user?.first_name}
                    email={user?.email}
                    handlePaging={setPage}
                    currPage={currPage}
                />
                {/* {currPage == 1 && <ClientStats bookingData={bookingData} handlePage={setPage}/>} */}
                {currPage == 2 && (
                    <div className="space-y-8">
                        <Membership />
                        <ClientBookings handleBookingData={setBookingData} />
                    </div>
                )}
                {currPage == 3 && (
                    <ClientInfo
                        first_name={user?.first_name}
                        email={user?.email}
                        phone_number={user?.phone_number}
                    />
                )}
            </section>
        </section>
    );
};

export default withAuth(ClientPage);
