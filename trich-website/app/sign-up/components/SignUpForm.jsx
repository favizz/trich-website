"use client";
import { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { checkIfEmailExists } from "@/hooks/CheckEmailExist";
import { useRouter } from "next/navigation";
import ToastManager from "@/app/components/toaster";
import { ToastContainer } from "react-toastify";

const SignUpForm = () => {
  const userCollectionRef = collection(db, "user");

  const [emailUsed, toggleEmailUsed] = useState(false);

  const [password, setPassword] = useState("");
  const [acceptTerm, setTerm] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const signUpCheck = () => {
    if (first_name == "") {
      ToastManager.notify("Please");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    if (
      formData.first_name == "" ||
      formData.last_name == "" ||
      formData.email == "" ||
      formData.phone_number == "" ||
      formData.address == ""
    ) {
      ToastManager.notify("Please fill all the fields!", "error");
    }
    if (await checkIfEmailExists(formData.email)) {
      console.log("Email sudah terdaftar");
      toggleEmailUsed(!emailUsed);
      return;
    }
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, formData.email, password);

      await addDoc(userCollectionRef, {
        user_id: auth?.currentUser?.uid,
        first_name: formData.first_name.toUpperCase(),
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
      })
        .then((response) => {
          router.push("/");
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg mx-6 px-4 py-8 mt-16 mb-16 md:mb-0 shadow-xl tracking-wider ">
      <h2 className="font-bold lg:text-3xl">WELCOME TO TRICH BARBERSPACE</h2>
      <p className="text-[#545454] text-sm md:text-base lg:pt-2 lg:pb-6">
        Create an account below or{" "}
        <Link href="/sign-in">
          <span className="text-orange1">Sign in.</span>
        </Link>
      </p>

      {/* Name */}
      <div className="flex flex-col md:flex-row md:space-x-2 pt-4 md:pt-0">
        <label htmlFor="firstname" className=" md:w-1/2">
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
        <label htmlFor="lastname" className="md:w-1/2 mt-6 md:mt-0">
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
        <p className="font-medium text-slate-700">
          {emailUsed ? (
            <span className="text-red-600">Email sudah terdaftar !</span>
          ) : (
            "Email address"
          )}
        </p>
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
        <p className="md:w-[500px] text-justify text-xs text-gray-400">
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
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between">
        <p className="text-sm md:text-base">
          Already have an account?{" "}
          <Link href="/sign-up">
            <span className="text-orange1">Log in.</span>
          </Link>
        </p>
        <button
          className="flex items-center justify-center bg-orange1 text-white py-2 px-8 rounded-[4px]"
          onClick={(e) => handleSignUp(e)}
        >
          Sign Up
        </button>
      </div>
      <div className="w-0 h-0">
          <ToastContainer/>
      </div>
    </div>
  );
};

export default SignUpForm;
