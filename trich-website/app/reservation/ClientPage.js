"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/config/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import withAuth from "@/authContext/withAuth";

import ChooseService from "./ChooseService";
import ConfirmService from "./ConfirmService";
import ChooseTime from "./ChooseTime";
import ConfirmPay from "./ConfirmPay";
import Checkout from "./Checkout";

import { ToastContainer } from "react-toastify";
import ToastManager from "../components/toaster";
import LoadingSpinner from "../components/animation/Spinner";

import { formatPrice } from "./ChooseService";

import Qris from "@/public/reservationAssets/new-qris.jpg";

export const getUserNameById = async (userId) => {
  try {
    const usersRef = collection(db, "user");
    const q = query(usersRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const firstName = userData.first_name;
      const email = userData.email;
      return {firstName, email};
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};

const ClientPage = () => {
  const userBookingRef = collection(db, "active_booking");
  const router = useRouter();

  const handleBooking = async (e) => {
    try {
      e.preventDefault();
      const { firstName: fullName, email: userEmail } = await getUserNameById(auth?.currentUser?.uid);
      await addDoc(userBookingRef, {
        create_booking_date: new Date(),
        user_id: auth?.currentUser?.uid,
        email: userEmail,
        name: fullName,
        service: pickedService,
        amount: totalPrice,
        date: pickedDate,
        time: pickedTime,
        notes: notes,
        status: 1,
        booking_id: uuidv4(),
      })
        .then((response) => {
          ToastManager.notify("Booking Created!", "success");
          router.push("/dashboard");
        })
        .catch((e) => {
          ToastManager.notify("Booking Failed!", "error");
          console.error(e);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async (e) => {
    toggleLoading(true);
    try {
      await handleBooking(e);
    } catch (error) {
      console.error("Payment handling failed:", error);
    }
  };
  
  const [currPage, setPage] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalActualPrice, setTotalActualPrice] = useState(0);
  const [isConfirm, toggleConfirm] = useState(false);
  const [pickedService, setService] = useState(null);
  const [pickedDate, setDate] = useState(null);
  const [pickedTime, setTime] = useState(null);
  const [notes, setNotes] = useState(null);
  const [totalDuration, setDuration] = useState(null);
  const [isLoading, toggleLoading] = useState(false);

  return (
    <>
      <section className="flex flex-col items-center bg-white rounded-lg py-8 my-28 shadow-xl tracking-wider">
        <h2 className="font-extrabold mb-6 lg:text-xl xl:text-2xl">
          RESERVATION
        </h2>
        <div className="w-full h-[1px] bg-gray-600"></div>
        <div className="flex flex-row items-center justify-center space-x-3 md:space-x-8 px-3 lg:px-6 py-4">
          <div
            onClick={() => setPage(1)}
            className={`${
              currPage == 1 ? "bg-green1 text-white" : "text-black"
            } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
          >
            Service
          </div>
          <p>&gt;</p>
          <div
            onClick={() => setPage(pickedService ? 2 : null)}
            className={`${
              currPage == 2 ? "bg-green1 text-white" : "text-black"
            } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
          >
            Time
          </div>
          <p>&gt;</p>
          <div
            className={`${
              currPage == 3 ? "bg-green1 text-white" : "text-black"
            } rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
          >
            Confirm
          </div>
        </div>
        <div className="w-full h-[0.5px] mb-2 bg-gray-600"></div>
        {currPage == 1 && (
          <ChooseService
            handlePage={setPage}
            handleService={setService}
            handleTotalPrice={setTotalPrice}
            handleTotalActualPrice={setTotalActualPrice}
            handleDuration={setDuration}
            toggleConfirm={toggleConfirm}
          />
        )}
        {currPage == 1 && isConfirm && (
          <ConfirmService
            myService={pickedService}
            toggleConfirm={toggleConfirm}
            handlePage={setPage}
          />
        )}
        {currPage == 2 && (
          <ChooseTime
            pickedService={pickedService}
            date={pickedDate}
            handleDate={setDate}
            handleTime={setTime}
            handlePage={setPage}
          />
        )}
        {currPage == 3 && (
          <ConfirmPay
            date={pickedDate}
            time={pickedTime}
            service={pickedService}
            price={totalPrice}
            actualPrice={totalActualPrice}
            duration={totalDuration}
            handlePage={setPage}
          />
        )}
        {/* {currPage == 4 && (
          <div className="flex flex-col items-center justify-center pt-4 space-y-2">
            <p className="font-extrabold lg:text-xl ">
              Scan To Complete Your Payment 
            </p>
            <p className="font-semibold lg:text-sm">TRICH BARBERSPACE</p>
            <p className="font-extrabold text-orange1 lg:text-base xl:text-lg 2xl:text-xl">
              IDR{" "}
              {totalActualPrice >= 200000 ? "100.000" : formatPrice(totalPrice)}
            </p>
            <Image src={Qris} alt="Trich-QRIS" width={250} />
            <div
              className={`${
                isLoading ? "hidden" : ""
              } flex flex-row space-x-1 md:space-x-4 py-4 text-xs lg:text-sm`}
            >
              <button
                onClick={(e) => handlePayment(e)}
                className="bg-green2 text-white font-bold px-4 md:px-6 py-2 rounded"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setPage(3)}
                className="border border-1 border-orange1 text-orange1 font-bold px-4 md:px-6 py-2 rounded"
              >
                Cancel Payment
              </button>
            </div>
            <LoadingSpinner toggleShow={isLoading} />
          </div>
        )} */}
        {currPage == 4 && (
          <Checkout
            pickedService={pickedService}
            totalPrice={totalPrice}
            pickedDate={pickedDate}
            pickedTime={pickedTime}
          />
        )}
        <div className="w-0 h-0">
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default withAuth(ClientPage);
