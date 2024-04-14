import ServicesBg from "@/public/homeAssets/servicesBg.png";
import Carousel from "./carouselComponents/Carousel";

const ViewServices = () => {
  return (
    <section
      style={{ backgroundImage: `url(${ServicesBg.src})` }}
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center tracking-wider text-white lg:py-8"
    >
      <h2 className="font-bold text-[50px]">OUR SERVICES</h2>
      <div className="text-center font-light lg:text-lg">
        <p>Unleash your inner radiance and unlock a look</p>
        <p>you'll love with our extensive range of hair and </p>
        <p>beauty services!</p>
      </div>
      {/* <Carousel/> */}
    </section>
  );
};

export default ViewServices;
