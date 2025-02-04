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

const docId = "eN2iHGJx9UjoVklByUs1";

export const getQuota = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(db, "reservation_quota"),
        );

        const quotaData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { success: true, data: quotaData };
    } catch (error) {
        console.error("Failed to fetch quotas: ", error);
        return { success: false };
    }
};

export const addQuota = async (quota_date, quota) => {
    try {
        const reservationQuotaRef = collection(db, "reservation_quota");

        const quotaData = {
            quota_id: uuidv4(),
            date: quota_date,
            quota: parseInt(quota),
        };

        await addDoc(reservationQuotaRef, quotaData);

        console.log("Quota added successfully");
        return { success: true };
    } catch (error) {
        console.error("Failed to add quota: ", error);
        return { success: false };
    }
};

export const deleteQuota = async (quota_id) => {
    try {
        const quotaCollectionRef = collection(db, "reservation_quota");

        const q = query(quotaCollectionRef, where("quota_id", "==", quota_id));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`No quota found`);
        }

        const quotaDoc = querySnapshot.docs[0];
        const quotaRef = doc(db, "reservation_quota", quotaDoc.id);

        await deleteDoc(quotaRef);

        return { success: true };
    } catch (error) {
        console.error("Failed to delete quota: ", error);
        return { success: false };
    }
};

/**
 * Fetches quota_base and quota_wd from the Firestore document in the 'config' collection.
 * @returns {Promise<{ quota_base: number, quota_wd: number } | null>} The quota values or null if not found.
 */
export const getConfigQuotas = async () => {
    try {
        const docRef = doc(db, "config", docId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                quota_base: data.quota_base,
                quota_wd: data.quota_wd,
            };
        } else {
            console.error("Document does not exist");
            return;
        }
    } catch (error) {
        console.error("Error fetching config quotas:", error);
        return;
    }
};

/**
 * Updates a single field (quota_base or quota_wd) in the Firestore document.
 * @param {Object} updates - An object containing the field to update, e.g., { quota_base: 50 } or { quota_wd: 100 }.
 * @returns {Promise<boolean>} True if the update is successful, false otherwise.
 */
export const updateConfigQuota = async (updates) => {
    try {
        if (!updates || Object.keys(updates).length === 0) {
            console.error("No valid fields provided for update.");
            return false;
        }

        const docRef = doc(db, "config", docId);

        await updateDoc(docRef, updates);

        console.log("Quota value(s) updated successfully!", updates);
        return true;
    } catch (error) {
        console.error("Error updating config quotas:", error);
        return false;
    }
};
