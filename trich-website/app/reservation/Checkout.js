"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import ToastManager from "../components/toaster";

import LoadingSpinner from "../components/animation/Spinner";
import SuccessIcon from "@/public/signInAssets/success.svg";
import Image from "next/image";
import Link from "next/link";

/**
 * Function to fetch, increment, and return the current order_id.
 *
 * @returns {Promise<{order_id: number}>} - Returns the current order_id before it was incremented.
 */
async function fetchAndIncrementOrderId() {
  try {
    const orderIdCollection = collection(db, "order_id");

    const querySnapshot = await getDocs(orderIdCollection);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const data = docSnapshot.data();
      const currentOrderId = data.order_id;

      const newOrderId = currentOrderId + 1;

      const documentRef = doc(db, "order_id", docSnapshot.id);

      await updateDoc(documentRef, { order_id: newOrderId });

      return currentOrderId;
    } else {
      throw new Error("No order_id found");
    }
  } catch (error) {
    console.error("Error fetching and updating order_id:", error);
    throw new Error("Error fetching and updating order_id");
  }
}

/**
 * Async function to fetch user data based on currentUserID.
 *
 * @param {string} currentUserID - The user ID to query the database with.
 * @returns {Promise<Object>} - Returns user data or an error message if not found.
 */
async function fetchUserData() {
  try {
    const currentUserID = auth?.currentUser?.uid;
    if (!currentUserID) {
      throw new Error("User ID is required");
    }

    const q = query(
      collection(db, "user"),
      where("user_id", "==", currentUserID)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userInfo = querySnapshot.docs[0].data();
      return userInfo;
    } else {
      throw new Error("No user found with the provided user ID");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Error fetching user data");
  }
}

const Checkout = ({ pickedService, totalPrice }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reqBody, setReqBody] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pickedService = "The Trich Experience, The Cutting Edge";
        const totalPrice = 100000;

        const orderId = await fetchAndIncrementOrderId();
        const userData = await fetchUserData();

        const body = {
          transaction_details: {
            order_id: `TB-${orderId.order_id}`,
            gross_amount: totalPrice,
          },
          item_details: pickedService.split(",").map((service, idx) => ({
            name: service.trim(),
            price: totalPrice / 2,
            quantity: 1,
            id: `TS-${idx}`,
          })),
          customer_details: {
            first_name: `${userData?.first_name} ${userData?.last_name}`,
            email: userData?.email,
          },
        };

        setReqBody(body);
        console.log(body);
      } catch (error) {
        console.error(error);
        setPaymentStatus(2);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchToken() {
      setLoading(true);
      try {
        const response = await fetch("/api/dokuHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "order-123",
            productName: "Test Product",
            price: 100000,
            quantity: 2,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();
        setToken(data.token);
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            setPaymentStatus(1);
            console.log("berhasil")
          },

          onError: function (result) {
            setPaymentStatus(2);
          },
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.CLIENT_KEY;
    const script = document.createElement("script");

    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  return (
    <section className="pt-4 space-y-4 flex flex-col items-center justify-center">
      <p className="font-extrabold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
        {paymentStatus === 0 && "Please Wait"}
        {paymentStatus === 1 && (
          <span className="text-green-400">Payment Success</span>
        )}
        {paymentStatus === 2 && (
          <span className="text-red-400">Payment Failed</span>
        )}
      </p>

      {/* Loading */}
      {loading ? (
        <LoadingSpinner
          toggleShow={loading && paymentStatus !== 1 && paymentStatus !== 2}
        />
      ) : (
        ""
      )}

      {/* Icons */}
      {paymentStatus === 1 && (
        <Image src={SuccessIcon} alt="Payment-success-icon" width={100} />
      )}
      {paymentStatus === 2 && (
        <Link href="/">
          <button className="px-6 py-2 font-semibold bg-orange1 text-white rounded-[10px]">
            Homepage
          </button>
        </Link>
      )}
    </section>
  );
};

export default Checkout;
