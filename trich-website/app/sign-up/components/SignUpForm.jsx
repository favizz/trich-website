"use client";
import { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { checkIfEmailExists } from "@/hooks/CheckEmailExist";

const SignUpForm = () => {
  const userCollectionRef = collection(db, "user");

  const [password, setPassword] = useState("");
  const [acceptTerm, setTerm] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    if (await checkIfEmailExists(formData.email)) {
      console.log("Email sudah terdaftar");
      return;
    }
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, formData.email, password);

      await addDoc(userCollectionRef, {
        user_id: auth?.currentUser?.uid,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg px-6 py-8 shadow-xl tracking-wider">
      <h2 className="font-bold lg:text-3xl">WELCOME TO TRICH BARBERSPACE</h2>
      <p className="text-[#545454] lg:pt-2 lg:pb-6">
        Create an account below or{" "}
        <Link href="/sign-in">
          <span className="text-orange1">Sign in.</span>
        </Link>
      </p>

      {/* Name */}
      <div className="flex flex-row space-x-2">
        <label htmlFor="firstname" className="w-1/2">
          <p className="font-medium text-slate-700">First name</p>
          <input
            id="firstname"
            name="first_name"
            type="text"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter first name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastname" className="w-1/2">
          <p className="font-medium text-slate-700">Last name</p>
          <input
            id="lastname"
            name="last_name"
            type="text"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter last name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="h-6"></div>
      <label htmlFor="email">
        <p className="font-medium text-slate-700">Email address</p>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <div className="h-6"></div>
      <label htmlFor="phonenumber">
        <p className="font-medium text-slate-700">Phone number</p>
        <input
          id="phonenumber"
          name="phone_number"
          type="text"
          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
          placeholder="(xx) xxx-xxx"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </label>
      <div className="h-6"></div>
      <label htmlFor="address">
        <p className="font-medium text-slate-700">Address</p>
        <input
          id="address"
          name="address"
          type="text"
          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <div className="h-6"></div>
      <label htmlFor="password">
        <p className="font-medium text-slate-700">Password</p>
        <input
          id="password"
          name="password"
          type="password"
          class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {/* Terms&Condition */}
      <div className="h-6"></div>
      <div className="flex flex-row items-start space-x-2">
        <input
          type="checkbox"
          onChange={(e) => setTerm(e.target.checked)}
          className="mt-1"
        />
        <p className="w-[500px] text-justify text-xs text-gray-400">
          By signing up, you agree and consent to our Terms and Conditions and
          to receive automated promotional text messages at the phone number you
          provided and acknowledge that your consent here represents your
          electronic signature. Consent isn’t a condition of any purchase, MSG &
          data rates may apply. Msg frequency varies. Reply STOP to unsubscribe
          or HELP for assistance. View our Terms and Conditions and Privacy
          Policy. Please accept our Terms and Conditions.
        </p>
      </div>

      <div className="h-6"></div>
      <div className="flex justify-between">
        <p>
          Already have an account?{" "}
          <Link href="/sign-up">
            <span className="text-orange1">Log in.</span>
          </Link>
        </p>
        <button
          className="flex items-center justify-center bg-orange1 text-white py-2 px-8 rounded-[4px]"
          onClick={(e) => (acceptTerm ? handleSignUp(e) : null)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
