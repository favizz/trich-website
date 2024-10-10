import ClientPage from "./ClientPage";
import DescBg from "@/public/homeAssets/DescBg.png";

const page = () => {
  return (
    <main
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="flex min-h-screen items-center justify-center px-4"
    >
      <ClientPage />
    </main>
  );
};

export default page;
