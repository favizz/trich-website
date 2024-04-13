"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ClientPage = () => {
  const [userData, setUserData] = useState(null);

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
    <div>
      <p>Nama: {userData?.first_name + " " + userData?.last_name}</p>
      <p>email: {userData?.email}</p>
      <p>Phone Number: {userData?.phone_number}</p>
      <p>Address: {userData?.address}</p>
    </div>
  );
};

export default ClientPage;
