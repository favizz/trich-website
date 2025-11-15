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

const DOC_ID = "eN2iHGJx9UjoVklByUs1";

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
 * @returns {Promise<{ quota_base: number, quota_wd: number } | null>}
 */
export const getConfigQuotas = async () => {
    try {
        const docRef = doc(db, "config", DOC_ID);

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
 * @param {Object}
 * @returns {Promise<boolean>}
 */
export const updateConfigQuota = async (updates) => {
    try {
        if (!updates || Object.keys(updates).length === 0) {
            console.error("No valid fields provided for update.");
        }

        if (updates.type === "wd") {
            updates.type = "quota_wd";
        }
        else if (updates.type === "base") {
            updates.type = "quota_base";
        }
        console.log(updates);

        const docRef = doc(db, "config", DOC_ID);

        await updateDoc(docRef, { [updates.type]: updates.val });

        console.log("Quota value(s) updated successfully!", updates);
    } catch (error) {
        console.error("Error updating config quotas:", error);
    }
};

/**
 * Get quota by type from the backend API
 * @param {string} type - The type of quota to retrieve
 * @returns {Promise<Object>} The quota data for the specified type
 */
export const getQuotaByType = async (type) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch quota by type: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching quota by type:", error);
        throw error;
    }
};

/**
 * Create quota by type using the backend API
 * @param {string} type - The type of quota to create
 * @param {Object} quotaData - The quota data to create
 * @returns {Promise<Object>} The created quota data
 */
export const createQuotaByType = async (type, quotaData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/website/quota/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            },
            body: JSON.stringify(quotaData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create quota by type: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating quota by type:", error);
        throw error;
    }
};
