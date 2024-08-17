
import Image from "next/image";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";
import RevealTitle from "../components/animation/Reveal";

const Barbers = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green2 space-y-8">
      <Image src={HomeLogo} alt="logo" width={500} />
      <RevealTitle>
        <h2 className="text-3xl font-extrabold text-white tracking-widest">
          COMING SOON
        </h2>
      </RevealTitle>
    </main>
  );
};

export default Barbers;
