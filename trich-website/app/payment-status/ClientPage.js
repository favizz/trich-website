"use client"
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "@/config/firebase";

const ClientPage = () => {
  const params = useSearchParams();
  const orderId = params.get("order_id");
  const statusCode = params.get("status_code");
  const transactionStatus = params.get("transaction_status");

  useEffect(() => {
    const updateBookingStatus = async () => {
      // Only proceed if all query parameters are available
      if (orderId && statusCode == 200) {
        if (transactionStatus !== "settlement") return;

        try {
          const q = query(
            collection(db, 'active_booking'),
            where('order_id', '==', orderId)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref; // Reference to the first matching document

            // Update the status of the document
            await updateDoc(docRef, {
              status: 2,
            });

            console.log('Booking status updated successfully.');
          } else {
            console.log('No matching order found for order_id:', order_id);
          }
        } catch (error) {
          console.error('Error updating booking status:', error);
        }
      }
    };

    updateBookingStatus();

  }, [orderId, transactionStatus]);

  return (
    <div className="py-8 px-16 space-y-4 flex flex-col items-center justify-center bg-white rounded-[10px]">
      <p className="font-extrabold text-2xl xl:text-3xl 2xl:text-4xl">
        {statusCode == 200 ? <span>Payment Is Received</span> : <span>Payment Failed</span>}
      </p>
      <Link href="/dashboard">
          <button className="px-6 py-2 font-semibold bg-orange1 text-white rounded-[10px]">
            Go to Dashboard
          </button>
        </Link>
    </div>
  );
};

export default ClientPage;
