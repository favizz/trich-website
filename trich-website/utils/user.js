import { auth, db } from "@/config/firebase";
import { collection, query, where, getDoc, getDocs, deleteDoc, addDoc, updateDoc, increment } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const computePoint = (service) => {
    let total = 0;
    if (service.includes("The Trich Experience")) total += 15;
    if (service.includes("The Cutting Edge")) total += 10;
    if (["Trim & Treat", "Mask Off", "Creambath"].some(s => service.includes(s))) total += 5;
    if (["Korean Perm", "Root Lift", "Down Perm"].some(s => service.includes(s))) total += 40;
    return total;
}

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
        const userBookingRef = collection(db, "active_booking");
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
            collection(db, "active_booking"),
            where("phone_number", "==", phoneNumber),
            where("status", "==", 1)
        );

        const querySnapshot = await getDocs(bookingsQuery);

        if (querySnapshot.empty) {
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

export const getUserBookings = async (phoneNumber) => {
    if (!phoneNumber) {
        return { success: false, error: "No Phone Number!" };
    }
    const q = query(
        collection(db, "active_booking"),
        where("phone_number", "==", phoneNumber),
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        let bookings = querySnapshot.docs.map((doc) => doc.data());
        bookings = bookings.sort((a, b) => a.status - b.status);

        return { success: true, bookings: bookings };
    }
    return { success: true, error: "No bookings with the provided phone number." };
};

export const handleUser = async (firstName, phoneNumber) => {
    if (!firstName || !phoneNumber) {
        throw new Error("Missing required fields: firstName or phoneNumber");
    }

    let normalized = phoneNumber.replace(/\D+/g, "");
    if (!normalized.startsWith("62")) normalized = "62" + normalized;
    normalized = "+" + normalized;

    const usersRef = collection(db, "non_auth_user");
    const q = query(usersRef, where("phone_number", "==", normalized));
    const snap = await getDocs(q);

    const delta = computePoint(service);

    if (!snap.empty) {
        const userDoc = snap.docs[0];
        await updateDoc(userDoc.ref, { point: increment(delta) });
        const updated = await getDoc(userDoc.ref);
        const data = updated.data();
        return {
            success: true,
            message: "Existing user: points updated.",
            data: {
            first_name: data.first_name,
            phone_number: data.phone_number,
            points: data.point
            }
        };
    } else {
        const newUser = {
            first_name: firstName,
            phone_number: normalized,
            point: delta
        };
        const newRef = await addDoc(usersRef, newUser);
        return {
            success: true,
            message: "New user created with initial points.",
            data: {
            id: newRef.id,
            first_name: newUser.first_name,
            phone_number: newUser.phone_number,
            points: newUser.point
            }
        };
    }
}

export async function removeExpiredBooking(orderId) {
    try {
        const orderQuery = query(collection(db, "active_booking"), where("order_id", "==", orderId));
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

export const handleUserPoints = async (orderId) => {
    try {
        const orderQuery = query(
            collection(db, "active_booking"),
            where("order_id", "==", orderId)
        );
    
        const querySnapshot = await getDocs(orderQuery);
    
        if (querySnapshot.empty) {
            console.log("No matching order found for orderId:", orderId);
            return;
        }

        const docSnapshot = querySnapshot.docs[0];
        const orderData = docSnapshot.data();
        const service = orderData.service || "";
        const userId = orderData.userId;
    
        let deduction = 0;
        if (service.includes("(Free Trich Experience)")) {
            deduction += 100;
        }
        if (service.includes("(50% Small Service)")) {
            deduction += 20;
        }
        if (service.includes("(Free Small Service)")) {
            deduction += 50;
        }
    
        if (deduction > 0 && userId) {
            const userRef = doc(db, "non_auth_user", userId);

            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
                console.log("User document not found for userId:", userId);
                return;
            }
            const currentPoints = userDoc.data().point || 0;

            const newPoints = currentPoints - deduction;

            await updateDoc(userRef, { point: newPoints });
            console.log(
                `Deducted ${deduction} points from user with id ${userId}. New point total: ${newPoints}.`
            );
        } else {
            console.log("No matching service string found or userId is missing.");
        }
    } catch (error) {
      console.error("Error updating user points:", error);
    }
}
