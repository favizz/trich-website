"use client";
import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import {
    initRecaptchaVerifier,
    sendVerificationCode,
    verifyCodeAndSignIn,
} from "@/utils/non-auth-user";

import { addNonAuthUser } from "@/utils/non-auth-user";

import ClientForm from "./ClientForm";
import ClientVerification from "./ClientVerification";

const ClientPage = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [user, setUser] = useState(null);

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
        const response = await verifyCodeAndSignIn(
            confirmationResult,
            codeString,
        );

        if (response.success) {
            console.log("Sign in successful:", response.user);

            const phoneNumberString = `+62${phoneNumber.replace(/-/g, "")}`;

            const existingUserId = getCookie(phoneNumberString);
            console.log(existingUserId);
            if (existingUserId) {
                console.log("Cookie already exists for phone number:", phoneNumberString);
            } else {
                const userId = response.user.uid;
                setCookie(phoneNumberString, userId, { maxAge: 60 * 60 * 24 * 30, path: "/" });
                console.log("Cookie created for phone number:", phoneNumberString, "with user ID:", userId);
            }

            if (!user) {
                const userResponse = await addNonAuthUser(
                    fullName,
                    phoneNumberString,
                );

                if (userResponse.success) {
                    console.log("User berhasil ditambahkan!");
                } else {
                    console.error(userResponse.error);
                }
            }
            handleRoute();
        } else {
            setError(response.error);
            console.error("Failed verifying code:", error);
        }
        return;
    };

    const handleRoute = () => {
        const hash = window.location.hash;

        let targetRoute = "/reservation";
        if (hash === "#profile") {
            targetRoute = "/profile";
        }
        router.push(targetRoute);
    };

    return (
        <>
            {page === 1 && (
                <ClientForm
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    fullName={fullName}
                    setFullName={setFullName}
                    user={user}
                    setUser={setUser}
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

            <div id="recaptcha-container"/>
        </>
    );
};

export default ClientPage;
