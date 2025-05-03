import { db } from "@/config/firebase";
import {
    collection,
    query,
    getDoc,
    getDocs,
    addDoc,
    where,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { parseDateString, parseTimeString } from "@/hooks/time";

export const getBooking = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "active_booking"));

        let bookingData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        bookingData = bookingData.sort((a, b) => {
            const dateA = parseDateString(a.date);
            const dateB = parseDateString(b.date);

            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;

            const timeA = parseTimeString(a.time);
            const timeB = parseTimeString(b.time);

            if (timeA > timeB) return -1;
            if (timeA < timeB) return 1;

            return a.status - b.status;
        });

        return { success: true, data: bookingData };
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return { success: false};
    }
};

export const updatePaidBooking = async (orderId) => {
    const q = query(
      collection(db, "active_booking"),
      where("order_id", "==", orderId)
    );
    const snap = await getDocs(q);
    if (snap.empty) throw new Error(`Order not found: ${orderId}`);
    const docRef = snap.docs[0].ref;
    const data = snap.docs[0].data();
    await updateDoc(docRef, { status: 2 });
    return data;
};

export const deleteBooking = async (booking_id) => {
    try {
        const bookingCollectionRef = collection(db, "active_booking");
        const q = query(
            bookingCollectionRef,
            where("booking_id", "==", booking_id)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`No booking found with booking_id: ${booking_id}`);
        }

        const bookingDoc = querySnapshot.docs[0];
        const bookingRef = doc(db, "active_booking", bookingDoc.id);

        await deleteDoc(bookingRef);

        return { success: true };
    } catch (error) {
        console.error("Error deleting booking:", error);
        return { success: false};
    }
};


export const logError = async (name, error_message) => {
    try {
        const errorCollectionRef = collection(db, "error_log");

        const indonesianDate = new Date();

        await addDoc(errorCollectionRef, {
            name: name,
            error_message: String(error_message),
            timestamp: indonesianDate
        });

        console.log('Error logged successfully');
    } catch (error) {
        console.error("Error logging error: ", error);
    }
};