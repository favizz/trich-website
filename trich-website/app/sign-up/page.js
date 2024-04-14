import React from "react";
import SignUpForm from "./components/SignUpForm";

import DescBg from "@/public/homeAssets/DescBg.png";

const page = () => {
  return (
    <div
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center pt-[100px]"
    >
      <SignUpForm />
    </div>
  );
};

export default page;
