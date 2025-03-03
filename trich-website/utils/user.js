import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const getUserData = async () => {
    const currentUserID = auth?.currentUser?.uid;
    if (!currentUserID) {
        return { success: false, error: "Not logged in!" };
    }
    const q = query(
        collection(db, "non_auth_user"),
        where("user_id", "==", currentUserID),
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const userInfo = querySnapshot.docs[0].data();
        return { success: true, user: userInfo };
    } else {
        return { success: false, error: "no user found!" };
    }
};

export const createBooking = async (
        fullName,
        userPhone,
        pickedService,
        pickedTime,
        pickedDate,
        totalPrice,
        order_id,
    ) => {
        const userBookingRef = collection(db, "non_auth_booking");
        try {
            await addDoc(userBookingRef, {
                create_booking_date: new Date(),
                name: fullName,
                phone_number: userPhone,
                service: pickedService,
                amount: totalPrice,
                date: pickedDate,
                time: pickedTime,
                status: 1,
                booking_id: uuidv4(),
                order_id: order_id.toString(),
            }).catch((e) => {
                console.error(e);
            });
        } catch (error) {
            console.error(error);
        }
};

export const getPendingBookings = async (phoneNumber) => {
    try {
        const bookingsQuery = query(
            collection(db, "non_auth_booking"),
            where("phone_number", "==", phoneNumber),
            where("status", "==", 1)
        );

        const querySnapshot = await getDocs(bookingsQuery);

        if (querySnapshot.empty) {
            console.log(`No pending bookings found for phone number: ${phoneNumber}`);
            return null;
        }

        const doc = querySnapshot.docs[0];

        return { docRef: doc.ref, data: doc.data() };
    } catch (error) {
        console.error("Error fetching pending bookings:", error);
        return null;
    }
};

export const deleteBooking = async (docRef) => {
    try {
        if (!docRef) {
            console.error("Invalid document reference");
            return false;
        }

        await deleteDoc(docRef);
        console.log("Booking successfully deleted.");
        return true;
    } catch (error) {
        console.error("Error deleting booking:", error);
        return false;
    }
};

export const getMembership = async (phoneNumber) => {
    if (!phoneNumber.startsWith("+62")) {
        return { success: true, error: "Wrong phone format!" };
    }

    console.log(phoneNumber);

    const q = query(
        collection(db, "membership"),
        where("phone_number", "==", phoneNumber),
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { success: true, membership: true };
    } else {
        return { success: true, error: "No user found with the provided phone number." };
    }
};

export const getUserBookings = async () => {
    const currentUserID = auth?.currentUser?.uid;
    if (!currentUserID) {
        console.error("Current user ID is undefined.");
        return;
    }

    const q = query(
        collection(db, "active_booking"),
        where("user_id", "==", currentUserID),
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        let bookings = querySnapshot.docs.map((doc) => doc.data());
        bookings = bookings.sort((a, b) => a.status - b.status);

        return bookings;
    }
    return;
};
