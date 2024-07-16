import DescBg from "@/public/homeAssets/DescBg.png";

const page = () => {
  return (
    <main
      style={{ backgroundImage: `url(${DescBg.src})` }}
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      
    </main>
  );
};

export default page;
