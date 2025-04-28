import { auth, db } from "@/config/firebase";
import { collection, query, where, 
         getDoc, getDocs, deleteDoc, 
         addDoc, updateDoc, increment,
         arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const computePoint = (service) => {
    let total = 0;
    if (service.includes("The Trich Experience")) {
        if (service.includes("(Free Trich Experience)"))    total -= 100;
        else                                                total += 15;
    }
    if (["Trim & Treat", "Mask Off", "Creambath"].
        some(s => service.includes(s))) 
        {
        
        if (service.includes("(50% Small Service)"))        total -= 20;
        else if (service.includes("(Free Small Service)"))  total -= 50;
        else                                                total += 5;
        
    }
    if (service.includes("The Cutting Edge"))               total += 10;
    if (["Korean Perm", "Root Lift", "Down Perm",
        "Permification", "Colors", "Smooth Operator"
    ].some(s => service.includes(s)))                       total += 40;
    
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

export const handleUser = async (firstName, phoneNumber, service) => {
    if (!firstName || !phoneNumber) {
        throw new Error("Missing required fields: firstName or phoneNumber");
    }

    let normalized = phoneNumber.replace(/\D+/g, "");
    if (!normalized.startsWith("62")) normalized = "62" + normalized;
    normalized = "+" + normalized;

    const delta = computePoint(service);
    const bookingData = {
        service: service.service,
        order_id: service.order.id,
        amount: service.amount,
        date: service.date,
        time: service.time,
        status: service.status,
        point: delta >= 0 ? delta : 0
    }

    const usersRef = collection(db, "non_auth_user");
    const q = query(usersRef, where("phone_number", "==", normalized));
    const snap = await getDocs(q);

    if (!snap.empty) {
        const userDoc = snap.docs[0];
        const data = userDoc.data();
        const updates = { point: increment(delta) };

        if (Array.isArray(data.bookings)) {
            updates.bookings = arrayUnion(bookingData);
        } else {
            updates.bookings = [bookingData];
        }

        await updateDoc(userDoc.ref, updates);
        const updated = await getDoc(userDoc.ref);
        const newData = updated.data();

        return {
            success: true,
            message: "Existing user: points and bookings updated.",
            data: {
                first_name:   newData.first_name,
                phone_number: newData.phone_number,
                points:       newData.point,
                bookings:     newData.bookings
            }
        };
    } else {
        const newUser = {
            first_name:   firstName,
            phone_number: normalized,
            point:        delta,
            bookings:     [bookingData]
        };
        const newRef = await addDoc(usersRef, newUser);

        return {
            success: true,
            message: "New user created with initial points and booking.",
            data: {
                id:           newRef.id,
                first_name:   newUser.first_name,
                phone_number: newUser.phone_number,
                points:       newUser.point,
                bookings:     newUser.bookings
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