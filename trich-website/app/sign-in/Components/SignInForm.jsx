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
    <div className="flex flex-col bg-white rounded-lg px-4 py-8 shadow-xl tracking-wider">
      <h2 className="font-bold lg:text-3xl">WELCOME TO TRICH BARBERSPACE</h2>
      <p className="text-[#545454] lg:pt-2 lg:pb-6">
        Sign in below or{" "}
        <Link href="/sign-up">
          <span className="text-orange1">Create an account</span>
        </Link>{" "}
        to get started
      </p>
      <label htmlFor="email">
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
      <label htmlFor="password">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-slate-700">Password</p>
          <p className="font-medium text-gray-500">Forgot password?</p>
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
        className="flex items-center justify-center bg-orange1 text-white py-2 rounded-[4px] lg:mb-4"
        onClick={() => handleSignIn()}
      >
        Sign In
      </button>

      <div className="flex flex-row space-x-2 lg:pb-4">
        <button className="flex flex-row items-center justify-center border border-1 border-[#545454] py-2 space-x-2 rounded-[4px] w-1/2">
          <Image src={GoogleLogo} width={25} alt="Google-Logo" />
          <p>Sign in with Google</p>
        </button>
        <button className="flex flex-row items-center justify-center border border-1 border-[#545454] py-2 space-x-2 rounded-[4px] w-1/2">
          <Image src={AppleLogo} width={25} alt="Apple-Logo" />
          <p>Sign in with Apple</p>
        </button>
      </div>
      <p>
        Don’t have an account?{" "}
        <Link href="/sign-up">
          <span className="text-orange1">Create an account</span>
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
