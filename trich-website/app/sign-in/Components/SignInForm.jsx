"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import AppleLogo from "@/public/signInAssets/appleLogo.svg";
import GoogleLogo from "@/public/signInAssets/googleLogo.png";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          router.push("/");
        })
        .catch((e) => {
          console.error(e.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg mx-4 md:mx-0 px-4 py-8 shadow-xl mt-32 tracking-wider mb-64">
      <h2 className="font-bold text-sm lg:text-3xl">WELCOME TO TRICH BARBERSPACE</h2>
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
          <p className="font-medium text-sm lg:text-base text-slate-700">Password</p>
          <p className="font-medium text-sm lg:text-base text-gray-500">Forgot password?</p>
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
        className="flex items-center justify-center bg-orange1 text-white py-2 rounded-[4px] mb-2 lg:mb-4"
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
  );
};

export default SignInForm;
