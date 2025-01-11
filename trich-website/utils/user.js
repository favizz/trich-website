import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserData = async () => {
    const currentUserID = auth?.currentUser?.uid;
    if (!currentUserID) {
        return;
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
        console.log("No user found with the provided user ID.");
    }
    return;
};

export const getBookingData = async () => {
    const currentUserID = auth?.currentUser?.uid;
    if (!currentUserID) {
        console.error("Current user ID is undefined.");
        return;
    }
    
    const q = query(
        collection(db, "active_booking"),
        where("user_id", "==", currentUserID)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        let bookings = querySnapshot.docs.map((doc) => doc.data());
        bookings = bookings.sort((a, b) => a.status - b.status);
        
        return bookings;
    }
    return;
};
