"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import ClientCard from "./ClientCard";
import ClientStats from "./ClientStats";
import ClientBookings from "./ClientBookings";
import ClientInfo from "./ClientInfo";

const ClientPage = () => {
  const [userData, setUserData] = useState(null);
  const [currPage, setPage] = useState(1);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const currentUserID = auth?.currentUser?.uid;
      if (!currentUserID) {
        console.error("Current user ID is undefined.");
        return;
      }
      const q = query(
        collection(db, "user"),
        where("user_id", "==", currentUserID)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming you want the first matching document
        const userInfo = querySnapshot.docs[0].data();
        setUserData(userInfo);
      } else {
        console.log("No user found with the provided user ID.");
      }
    };

    getUserData();
  }, []);

  return (
    <section className="max-w-screen-2xl my-16 lg:my-36 pt-16 lg:pt-0 lg:px-16 lg:py-36">
      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        <ClientCard
          name={userData?.first_name + " " + userData?.last_name}
          email={userData?.email}
          handlePaging={setPage}
          currPage={currPage}
        />
        {currPage == 1 && <ClientStats bookingData={bookingData} handlePage={setPage}/>}
        {currPage == 2 && <ClientBookings handleBookingData={setBookingData}/>}
        {currPage == 3 && (
          <ClientInfo
            first_name={userData?.first_name}
            last_name={userData?.last_name}
            email={userData?.email}
            address={userData?.address}
            phone_number={userData?.phone_number}
          />
        )}
      </section>
    </section>
  );
};

export default ClientPage;
