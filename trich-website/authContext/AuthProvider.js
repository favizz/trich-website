"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/utils/user";
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

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(auth?.currentUser);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // change this later
    
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
        });
        
        return unsubscribe;
    }, []);
        
    const value = {
        signOut: signOut,
        session: session ? session : null,
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