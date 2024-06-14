"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { ToastContainer } from "react-toastify";
import ToastManager from "@/app/components/toaster";

import SuccessIcon from "@/public/signInAssets/success.svg";

const SignInForm = () => {
  const [isForgotPassword, toggleForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isValid, toggleNotValid] = useState(false);

  const [isResetDone, toggleResetDone] = useState(false);

  const [isSignIn, toggleSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    if (email.length == "" || password.length == "") {
      ToastManager.notify('Please fill in all the fields', 'error');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          router.push("/");
        })
        .catch((e) => {
          console.error(e.message);
          ToastManager.notify('Email or Password is Invalid!', 'error');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetPassword = () => {
    if (forgotEmail.length < 5) {
      toggleNotValid(true);
      console.error("Email is not valid");
      return;
    }

    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        toggleForgotPassword(false);
        toggleResetDone(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div
        className={`${isSignIn ? "" : "hidden"} 
        flex flex-col bg-white rounded-lg mx-4 md:mx-0 px-4 py-8 shadow-xl mt-32 tracking-wider mb-64`}
      >
        <h2 className="font-bold text-sm md:text-lg lg:text-3xl">
          WELCOME TO TRICH BARBERSPACE
        </h2>
        <p className="text-[#545454] text-xs lg:pt-2 pb-3 lg:pb-6">
          Sign in below or{" "}
          <Link href="/sign-up">
            <span className="text-orange1">Create an account</span>
          </Link>{" "}
          to get started
        </p>
        <label className="text-sm" htmlFor="email">
          <p className="font-medium text-slate-700">Email address</p>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className="h-6"></div>
        <label className="text-sm" htmlFor="password">
          <div className="flex flex-row justify-between">
            <p className="font-medium text-sm lg:text-base text-slate-700">
              Password
            </p>
            <p
              onClick={() => {
                toggleSignIn(false);
                toggleForgotPassword(true);
              }}
              className="font-medium text-sm lg:text-base text-gray-500 hover:text-orange1"
            >
              Forgot password?
            </p>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="h-6"></div>
        <button
          className="flex items-center justify-center bg-orange1 text-white hover:bg-white hover:text-orange1 hover:border hover:border-1 hover:border-orange1 py-2 rounded-[4px] mb-2 lg:mb-4"
          onClick={() => handleSignIn()}
        >
          Sign In
        </button>

        <p className="text-sm lg:text-base">
          Don’t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-orange1">Create an account</span>
          </Link>
        </p>
      </div>

      {/* Reset Email */}
      <div
        className={`${
          isForgotPassword ? "" : "hidden"
        } flex flex-col bg-white rounded-lg mx-4 md:mx-0 px-4 py-8 shadow-xl mt-32 tracking-wider mb-64 w-[300px] md:w-[500px]`}
      >
        <h2 className="font-bold text-sm md:text-lg lg:text-3xl">
          RESET PASSWORD
        </h2>
        <p className="text-[#545454] text-xs lg:pt-2 pb-3 lg:pb-6">
          Please input your email address
        </p>
        <label className="text-sm" htmlFor="email">
          <p
            className={`font-medium ${
              isValid ? "text-red-600" : "text-slate-700"
            }`}
          >
            {isValid
              ? "Email is not valid! please enter valid email"
              : "Email address"}
          </p>
          <input
            id="reset-email"
            name="email"
            type="email"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter email address"
            onChange={(e) => setForgotEmail(e.target.value)}
          />
        </label>
        <div className="h-6"></div>
        <button
          className="flex items-center justify-center bg-orange1 text-white py-2 rounded-[4px] mb-2 lg:mb-4"
          onClick={() => handleResetPassword()}
        >
          Send Email
        </button>
      </div>

      {/* Email Reset Done */}
      <div
        className={`${
          isResetDone ? "" : "hidden"
        } flex flex-col items-center justify-center bg-white rounded-lg mx-4 md:mx-0 px-4 py-8 shadow-xl mt-32 tracking-wider mb-64 space-y-3 w-[300px] md:w-[500px]`}
      >
        <Image src={SuccessIcon} alt="success" width={180} />
        <p className="font-extrabold text-xl md:text-2xl lg:text-3xl">
          Email Sent!
        </p>
        <p className="text-center text-sm md:text-base lg:text-lg">
          Please refresh the page and continue sign in after password reset
        </p>
      </div>
      <div className="w-0 h-0">
          <ToastContainer/>
      </div>
    </>
  );
};

export default SignInForm;
