import { Suspense } from "react";
import SignUpForm from "./components/SignUpForm";
import DescBg from "@/public/homeAssets/DescBg.png";

export default function Page() {
  return (
    <div
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center pt-[100px]"
    >
      <Suspense fallback={<div />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}