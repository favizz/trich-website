import Image from "next/image";
import Link from "next/link";
import ViewProductBg from "@/public/homeAssets/viewProduct.png";

const ViewProduct = () => {
  return (
    <section
      style={{ backgroundImage: `url(${ViewProductBg.src})` }}
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-8 lg:py-12 space-y-4 lg:space-y-8 xl:py-16 xl:space-y-12 tracking-wider"
    >
      <h2 className="text-white text-center font-bold text-2xl lg:text-3xl xl:text-4xl">THE BEST HAIR PRODUCT JUST FOR YOU</h2>
      <Link href="/products">
        <div className="bg-orange1 hover:bg-orange-300 text-white font-normal lg:text-[12px] xl:text-base py-3 px-6 rounded">
          View Products
        </div>
      </Link>
    </section>
  );
};

export default ViewProduct;
