import React from "react";
import ClientPage from "./components/ClientPage";
import DescBg from "@/public/homeAssets/DescBg.png";

const Dashboard = () => {
  return (
    <main
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="flex min-h-screen items-center justify-center"
    >
      <ClientPage />
    </main>
  );
};

export default Dashboard;
