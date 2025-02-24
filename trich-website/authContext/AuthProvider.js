"use client";
import Image from "next/image";
import React, { useContext, createContext, useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/utils/user";

import LoadingLogo from "@/public/homeAssets/TLogo.png";
import LoadingBg from "@/public/homeAssets/LoadingBg.jpg";

const AuthContext = createContext({
    signOut: async () => {
        return {};
    },
    session: null,
    user: null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(auth?.currentUser);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setSession(currentUser);
            if (currentUser) {
                const response = await getUserData();
                if (response.success) {
                    setUser(response.user);
                } else {
                    console.error(response.error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        signOut: signOut,
        session: session ? session : null,
        user: user,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div
                    className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${LoadingBg.src})` }}
                >
                    <Image
                        src={LoadingLogo}
                        alt="logo"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-32">
                        <div className="h-8 md:h-12 lg:h-16" />
                        <h2
                            className="text-3xl font-bold tracking-wider text-center"
                            style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                            LOADING
                        </h2>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
