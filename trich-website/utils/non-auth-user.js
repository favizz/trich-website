import { API_ROUTES } from "@/constants/routes";
import { mockFetch, mockUpsertNonAuthUser } from "@/lib/mockApi";

export const DEMO_OTP_CODE = "123456";

/**
 * Gets a user by phone number
 * @param {string} phone_number
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export const getUser = async (phone_number) => {
    try {
        // Ensure phone number has the +62 prefix and preserve dashes
        let formattedPhone = phone_number;
        if (!formattedPhone.startsWith("+62")) {
            formattedPhone = `+62${formattedPhone}`;
        }
        const response = await mockFetch(API_ROUTES.GET_USER_BY_PHONE(formattedPhone), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return { success: true, user: null };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        return { success: true, user };
    } catch (error) {
        console.error("Error fetching user:", error);
        // If API is not available, return no user (this is expected when backend is not ready)
        return { success: true, user: null };
    }
};

/**
 * @param {string} first_name
 * @param {string} phone_number
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export const addNonAuthUser = async (first_name, phone_number) => {
    try {
        const newUser = mockUpsertNonAuthUser(first_name, phone_number);
        return { success: true, user: newUser };
    } catch (error) {
        console.error("Error adding user:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Demo build: no real reCAPTCHA is used. Kept as a no-op so callers that
 * invoke it on mount don't need to change.
 */
export const initRecaptchaVerifier = (containerId) => {
    return { type: "mock-recaptcha", containerId };
};

/**
 * Sends verification code
 * Demo build: no SMS is sent. This always "succeeds" after a short delay,
 * and the code the user must enter is the fixed demo code (shown in the UI).
 * @param {string} phoneNumber - Phone number with country code (e.g. "+1234567890")
 * @returns {Promise<{ success: boolean, confirmationResult?: any, error?: string }>}
 */
export const sendVerificationCode = async (phoneNumber) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, confirmationResult: { phoneNumber } };
};

/**
 * Verifies the code and signs in the user.
 * Demo build: succeeds only when the entered code matches DEMO_OTP_CODE.
 * @param {any} confirmationResult - The confirmationResult returned from sendVerificationCode
 * @param {string} verificationCode - Code entered by the user
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export const verifyCodeAndSignIn = async (
    confirmationResult,
    verificationCode,
) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (verificationCode !== DEMO_OTP_CODE) {
        return { success: false, error: "Invalid" };
    }

    return {
        success: true,
        user: {
            uid: `demo-${confirmationResult?.phoneNumber || "user"}`,
            phoneNumber: confirmationResult?.phoneNumber,
        },
    };
};
