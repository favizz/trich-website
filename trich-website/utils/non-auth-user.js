import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

/**
 * Gets a user by phone number
 * @param {string} phone_number
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export const getUser = async (phone_number) => {
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
        return { success: false, error: error };
    }
};

/**
 * @param {string} first_name
 * @param {string} phone_number
 * @param {number} points
 * @returns {Promise<{ success: boolean, error: boolean }>}
 */
export const addNonAuthUser = async (first_name, phone_number) => {
    try {
        const usersRef = collection(db, "non_auth_user");

        const user_id = auth.currentUser?.uid;

        await addDoc(usersRef, {
            first_name: first_name,
            user_id: user_id,
            phone_number: phone_number,
            points: 0,
        });

        const newUser = {
            first_name,
            user_id,
            phone_number,
            points: 0,
        };

        return { success: true, user: newUser };
    } catch (error) {
        console.error("Error adding user:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Initializes reCAPTCHA verifier
 * @param {string} containerId - DOM element ID for reCAPTCHA
 * @returns {RecaptchaVerifier}
 */
export const initRecaptchaVerifier = (containerId) => {
    // Create a new reCAPTCHA verifier instance
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
        callback: () => {
            console.log(
                "reCAPTCHA solved, you can now send a verification code.",
            );
        },
        "expired-callback": () => {
            console.log("reCAPTCHA expired. Resetting reCAPTCHA.");
        },
    });
    return window.recaptchaVerifier;
};

/**
 * Sends verification code
 * @param {string} phoneNumber - Phone number with country code (e.g. "+1234567890")
 * @returns {Promise<{ success: boolean, confirmationResult?: any, error?: string }>}
 */
export const sendVerificationCode = async (phoneNumber) => {
    try {
        const appVerifier = window.recaptchaVerifier;
        // Send SMS with the verification code
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            appVerifier,
        );
        // Return confirmationResult which contains a .confirm(code) method for later use
        return { success: true, confirmationResult };
    } catch (error) {
        console.error("Error sending verification code:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Verifies the code and signs in the user.
 * @param {any} confirmationResult - The confirmationResult returned from sendVerificationCode
 * @param {string} verificationCode - Code entered by the user
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export const verifyCodeAndSignIn = async (
    confirmationResult,
    verificationCode,
) => {
    try {
        // Complete sign-in by confirming the code
        const result = await confirmationResult.confirm(verificationCode);
        console.log(result);
        return { success: true, user: result.user };
    } catch (error) {
        if (error.code === "auth/invalid-verification-code") {
            return {
                success: false,
                error: "Invalid",
            };
        }
        if (error.code === "auth/code-expired") {
            return {
                success: false,
                error: "Expired",
            };
        }
        // Fallback error message
        return { success: false, error: error.message };
    }
};
