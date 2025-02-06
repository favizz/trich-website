import { db } from "@/config/firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

/**
 * @param {string} phone_number
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export const getNonAuthUser = async (phone_number) => {
    try {
        const usersRef = collection(db, "non_auth_user");
        const q = query(usersRef, where("phone_number", "==", phone_number));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: true, user: null };
        }

        const doc = querySnapshot.docs[0];
        const user = { id: doc.id, ...doc.data() };

        return { success: true, user };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, error: error.message };
    }
};

/**
 * @param {string} first_name
 * @param {string} phone_number
 * @param {number} points
 * @returns {Promise<{ success: boolean, already_exists: boolean }>}
 */
export const addNonAuthUser = async (first_name, phone_number) => {
    try {
        const usersRef = collection(db, "non_auth_user");

        const q = query(usersRef, where("phone_number", "==", phone_number));
        const existingUser = await getDocs(q);

        if (!existingUser.empty) {
            return { success: true, already_exists: true };
        }

        const user_id = uuidv4();
        const points = 0;

        await addDoc(usersRef, {
            first_name,
            user_id,
            phone_number,
            points,
        });

        return { success: true, already_exists: false };
    } catch (error) {
        console.error("Error adding user:", error);
        return { success: false, error: error.message };
    }
};
