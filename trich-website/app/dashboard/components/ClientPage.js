"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/authContext/AuthProvider";
import { useRouter } from "next/navigation";

import ClientCard from "./ClientCard";
// import ClientStats from "./ClientStats";

import ClientPoints from "./ClientPoints";
import ClientInfo from "./ClientInfo";
import PointsGuide from "./PointsGuide";
import LoyaltyRewards from "./LoyaltyRewards";
import Membership from "./Membership";
import ClientBookings from "./ClientBookings";

import BannerBG from "@/public/dashboardAssets/bannerBg.png";

const ClientPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [currPage, setPage] = useState(2);
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/sign-in')
        }
    }, []);

    return (
        <section className="relative max-w-screen-2xl my-16 lg:my-36 px-4 pt-16 lg:pt-0 lg:px-16 lg:py-36">
            <div 
                style={{ backgroundImage: `url(${BannerBG.src})` }}
                className="absolute inset-x-0 top-0 h-48 px-4 py-6 md:px-16 md:py-8 md:text-left mt-5 lg:mt-0"
                >
                <div className="px-2 sm:px-4 md:px-6 mt-6 lg:mt-0">
                    <p className="font-extrabold text-white tracking-widest text-[15px] md:text-2xl lg:text-3xl lg:text-left">
                        EARN REWARDS WHILE YOU GROOM IN STYLE!
                    </p>
                    <p className="text-white font-light leading-tight tracking-wider opacity-50 text-base md:text-xl lg:text-2xl lg:text-left">
                        Unlock exclusive benefits with every visit to TRICH Barberspace.
                    </p>
                </div>

            </div>
            <section className="relative z-10 pt-36 flex flex-col lg:flex-row items-center lg:items-start justify-center space-y-5 lg:space-y-0 lg:space-x-8 mt-5 lg:mt-0">
                <ClientCard
                    name={user?.first_name}
                    handlePaging={setPage}
                    currPage={currPage}
                />
                {currPage == 1 &&                     
                    (<div className="space-y-5">
                        <ClientPoints 
                            point={user?.points}
                        />
                        <PointsGuide />
                        <LoyaltyRewards />
                        <Membership />
                    </div>)}
                {currPage == 2 && (
                    <div className="space-y-5">
                        <ClientPoints />
                        <ClientBookings handleBookingData={setBookingData} />
                    </div>
                )}
                {currPage == 3 && (
                    <div className="space-y-5">
                        <ClientInfo
                            first_name={user?.first_name}
                            phone_number={user?.phone_number}
                        />
                    </div>
                )}
            </section>
        </section>
    );
};

export default ClientPage;
