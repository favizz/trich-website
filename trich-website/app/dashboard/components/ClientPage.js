"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/authContext/AuthProvider";
import { useRouter } from "next/navigation";

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
    const { user } = useAuth();
    // const router = useRouter();

    const [currPage, setPage] = useState(0);
    const [bookingData, setBookingData] = useState([]);

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/sign-in')
    //     }
    // }, []);

    return (
        <section className="relative max-w-screen-2xl my-16 lg:my-36 px-4 pt-16 lg:pt-0 lg:px-16 lg:py-36">
            {currPage !== 0 && 
                <Header/> 
            }

            <section className={`relative z-10 ${currPage === 0 ? "" : "pt-36"} flex flex-col lg:flex-row items-center lg:items-start justify-center space-y-5 lg:space-y-0 lg:space-x-8 mt-5 lg:mt-0`}>
                {currPage !== 0 && 
                    <ClientCard
                        name={user?.first_name}
                        handlePaging={setPage}
                        currPage={currPage}
                    />  
                }
                {currPage === 0 && 
                    <ClientForm
                        setBookings={setBookingData}
                        setPage={setPage}
                    />
                }
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
                        <ClientBookings 
                            phoneNumber={user?.phone_number} 
                            bookingData={bookingData}
                        />
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
