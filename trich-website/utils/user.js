import { auth, db } from "@/config/firebase";
import { addDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";

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

export const handleUser = async (name, phone_number) => {
    if (!name || !phone_number) {
        console.error("Missing required fields: name or phone_number");
        return;
    }

    if (!phone_number.startsWith("+62")) {
        phone_number = `+62${phone_number.replace(/\D/g, "")}`;
    }

    try {
        const userQuery = query(collection(db, "non_auth_user"), where("phone_number", "==", phone_number));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            const existingData = querySnapshot.docs[0].data();
            const newPoints = existingData.point + 1;

            console.log("User found!");

            await updateDoc(docRef, { point: newPoints });

            console.log("Finish adding new points")
            ;
            return {
                success: true,
                message: "User exists, point incremented.",
                data: {
                    name: existingData.name,
                    phone_number: existingData.phone_number,
                    points: newPoints,
                }
            };
        } else {
            console.log("No user!");
            const newUserRef = await addDoc(collection(db, "non_auth_user"), { name, phone_number, point: 0 });
            
            console.log("Success adding user!");
            return {
                success: true,
                message: "New user added with 0 points.",
                data: { name, phone_number, points: 0, id: newUserRef.id }
            };
        }
    } catch (error) {
        console.error("Error processing user:", error);
    }
}

export async function removeExpiredBooking(orderId) {
    try {
        const orderQuery = query(collection(db, "non_auth_booking"), where("order_id", "==", orderId));
        const querySnapshot = await getDocs(orderQuery);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
            return { success: true, message: "Expired booking removed successfully." };
        } else {
            return { success: false, message: "No matching booking found." };
        }
    } catch (error) {
        console.error("Error removing expired booking:", error);
        throw new Error("Internal Server Error");
    }
}
