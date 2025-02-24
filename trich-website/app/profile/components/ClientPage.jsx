"use client";
import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import {
    initRecaptchaVerifier,
    sendVerificationCode,
    verifyCodeAndSignIn,
} from "@/utils/non-auth-user";

import ClientForm from "./ClientForm";
import ClientVerification from "./ClientVerification";
import ClientProfile from "./ClientProfile";

const ClientPage = () => {
    const [page, setPage] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState();

    useEffect(() => {
        if (auth.currentUser) {
            setPage(3);
        }
    }, []);

    useEffect(() => {
        initRecaptchaVerifier("recaptcha-container");
    }, []);

    const handleVerification = async () => {
        const phoneNumberString = `+62${phoneNumber.replace(/-/g, "")}`;
        console.log(phoneNumberString);

        const {
            success,
            confirmationResult: result,
            error,
        } = await sendVerificationCode(phoneNumberString);

        if (success) {
            setConfirmationResult(result);
            setPage(2);
        } else {
            console.error("Failed sending code:", error);
        }
    };

    const handleSignIn = async () => {
        if (!confirmationResult) return;

        const codeString = code.join("");
        const { success, user, error } = await verifyCodeAndSignIn(
            confirmationResult,
            codeString,
        );

        if (success) {
            console.log("Sign in successful:", user);
            setPage(3);
        } else {
            setError(error);
            console.error("Failed verifying code:", error);
        }
    };

    return (
        <>
            {page === 1 && (
                <ClientForm
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    handleVerification={handleVerification}
                />
            )}

            {page === 2 && (
                <ClientVerification
                    code={code}
                    setCode={setCode}
                    phoneNumber={phoneNumber}
                    handleSignIn={handleSignIn}
                    error={error}
                />
            )}

            {page === 3 && <ClientProfile page={page} />}
            <div id="recaptcha-container"></div>
        </>
    );
};

export default ClientPage;
