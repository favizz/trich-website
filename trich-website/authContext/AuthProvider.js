"use client";
import React, { useContext, createContext, useState } from "react";
import Loading from "@/app/components/Loading";

const AuthContext = createContext({
    signOut: async () => {
        return {};
    },
    session: null,
    user: null,
    setUser: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

// Demo build: session/user are held purely in local state, populated by the
// mock phone-OTP / sign-up flows instead of a real Firebase subscription.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const mockSignOut = async () => {
        setUser(null);
        return {};
    };

    const value = {
        signOut: mockSignOut,
        session: user,
        user: user,
        setUser: setUser,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <Loading duration={500} onLoadingComplete={() => setLoading(false)} />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};