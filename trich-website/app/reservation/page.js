import { Suspense } from "react";
import ClientPage from "./ClientPage";
import DescBg from "@/public/homeAssets/DescBg.png";

export default function Page() {
  return (
    <main
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="flex min-h-screen items-center justify-center px-4"
    >
      <Suspense fallback={<div />}>
        <ClientPage />
      </Suspense>
    </main>
  );
}