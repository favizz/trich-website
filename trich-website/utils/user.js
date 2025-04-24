import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
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

            console.log("Finish adding new points");
            return {
                success: true,
                message: "User exists, point incremented.",
                data: {
                    first_name: existingData.name,
                    phone_number: existingData.phone_number,
                    points: newPoints,
                }
            };
        } else {
            console.log("No user!");
            const newUserRef = await addDoc(collection(db, "non_auth_user"), { 
                first_name: name, 
                phone_number: phone_number,
                point: 1 
            });
            
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

export async function handleUserPoints(orderId) {
    try {
      // Query the active_booking collection for the document with the matching orderId
      const orderQuery = query(
        collection(db, "active_booking"),
        where("order_id", "==", orderId)
      );
  
      const querySnapshot = await getDocs(orderQuery);
  
      if (querySnapshot.empty) {
        console.log("No matching order found for orderId:", orderId);
        return;
      }
  
      // Access the first (and only) document returned by the query
      const docSnapshot = querySnapshot.docs[0];
      const orderData = docSnapshot.data();
      const service = orderData.service || "";
      const userId = orderData.userId; // Ensure that this field exists to identify the user
  
      // Determine the deduction amount based on the service string
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
  
      // If there is a deduction and a valid userId, proceed to update the user's points
      if (deduction > 0 && userId) {
        // Reference the user's document in the non_auth_user collection
        const userRef = doc(db, "non_auth_user", userId);
  
        // Retrieve the user's current points
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          console.log("User document not found for userId:", userId);
          return;
        }
        const currentPoints = userDoc.data().point || 0;
  
        // Calculate the new points by subtracting the deduction
        const newPoints = currentPoints - deduction;
  
        // Update the document with the new points value
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
