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

  useEffect(() => {
    const getUserData = async () => {
      const currentUserID = auth?.currentUser?.uid;
      if (!currentUserID) {
        console.error("Current user ID is undefined.");
        return; // Exit the function if currentUserID is undefined
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
  }, []); // Empty dependency array means this effect runs once on component mount

  useEffect(() => {
    if (userData) {
      console.log("Data:");
      console.log(userData);
    }
  }, [userData]); // This effect runs whenever userData changes

  return (
    <section className="max-w-screen-2xl lg:px-16 lg:py-36">
      <section className="flex flex-row items-start justify-center space-x-8">
        <ClientCard
          name={userData?.first_name + " " + userData?.last_name}
          email={userData?.email}
          handlePaging={setPage}
          currPage={currPage}
        />
        {currPage == 1 && <ClientStats />}
        {currPage == 2 && <ClientBookings/>}
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

{
  /* <p>Nama: {userData?.first_name + " " + userData?.last_name}</p>
<p>email: {userData?.email}</p>
<p>Phone Number: {userData?.phone_number}</p>
<p>Address: {userData?.address}</p> */
}
