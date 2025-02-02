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

export const getQuota = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(db, "reservation_quota")
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
