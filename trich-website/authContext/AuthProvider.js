"use client";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import LoadingLogo from "@/public/homeAssets/TLogo.png";
import LoadingBg from "@/public/homeAssets/LoadingBg.png"; 

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
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
