import { Suspense } from "react";
import AdminPage from "./AdminPage";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <AdminPage />
    </Suspense>
  );
}