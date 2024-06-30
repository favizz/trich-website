import ServicesBg from "@/public/homeAssets/servicesBg.png";
import ServiceCard from "./ServiceCard";
import RevealTitle from "../animation/Reveal";

const services = [
  {
    name: "THE TRICH EXPERIENCE",
    desc: "",
    services: "The Cutting Edge + 2 additional services (Trim & Treat/Creambath/Mask Off)",
    price: "135.000",
    duration: "2 Hours",
    is_coming_soon: false,
    is_price_range: false,
  },
  {
    name: "THE CUTTING EDGE",
    desc: "Achieve a Haircut as sharp as your style with our signature service. Our comprehensive service features a cleansing wash, a relaxing warm towel treatment, a stimulating scalp massage, and your very own choice of premium styling product, for elevated grooming experience.",
    services: "Haircut + Hair Wash + Warm Towel + Hot Stone Massage + Hairstyling",
    price: "85.000",
    duration: "1 Hour",
    is_coming_soon: false,
    is_price_range: false,
  },
  {
    name: "PERMIFICATION",
    desc: "Our pro-grade Perm Service unlocks effortless texture and lasting volume. Our expert barbermen craft customized perms for natural waves or defined curls, using top-of-the-line solutions and premium products. Experience lasting volume and textures to invest in your confidence!",
    services: "Classic Perm / Down Perm / Root Lift",
    price: "150.000-500.000*",
    duration: "30 Minutes-2 Hours",
    is_price_range: true,
  },
  {
    name: "SMOOTH OPERATOR",
    desc: "Get the executive edge with our Smooth Operator service! This utilizes advanced formulas, but keeps things simple to achieve sleek, smoother hair and easier to manage. Look sharp and feel confident with a polished look that’s anything but ordinary.",
    services: "Hair Smoothing + Hair Vitamin Serum",
    price: "250.000 - 500.000*",
    duration: "2 Hours",
    is_price_range: true,
  },
  // {
  //   name: "TRUE COLORS",
  //   desc: "Forge a fresh look with our Sharp-Edge Hair Coloring service. Our barbermen are certified colorists who use premium, scalp-friendly dyes to create your perfect shades, all while keeping your hair healthy and vibrant!",
  //   price: "250.000-750.000",
  //   duration: "3-4 Hours",
  // },
  // {
  //   name: "TAT TOO",
  //   desc: "Craft your canvas signature Hair Tattoo. Our master barbers wield their tools like artists, etching intricate fades, sharp lines, or personalized elements.",
  //   price: "50.000 - 150.000*",
  //   duration: "15-45 Minutes*",
  // },
  {
    name: "TRIM & TREAT",
    desc: "Transform your hair and indulge in pure relaxation with our revitalizing Creambath service. This all-inclusive hair treatment will leave your hair that feels as good as it looks!",
    services: "Shaving + Warm Towel + After-shave Serum",
    price: "35.000",
    duration: "30 Minutes",
    is_price_range: false,
  },
  // {
  //   name: "WAX MINING",
  //   desc: "Elevate your grooming experience with our discreet and comfortable Ear & Nose Wax service. Our expert barbers utilize a gentle technique to remove unwanted hair, leaving you feeling refreshed and looking your sharpest.",
  //   price: "35.000",
  //   duration: "30 Minutes",
  // },
  {
    name: "MASK OFF",
    desc: "Upgrade your haircut experience with our post-trim Face Treatment. We'll cleanse, soothe, and invigorate your skin with a premium mask, leaving you feeling refreshed and ready to face the day",
    services: "Face Mask + Face Wash + Warm Towel",
    price: "35.000",
    duration: "30 Minutes",
    is_price_range: false,
  },
  {
    name: "CREAMBATH",
    desc: "Upgrade your haircut experience with our post-trim Face Treatment. We'll cleanse, soothe, and invigorate your skin with a premium mask, leaving you feeling refreshed and ready to face the day",
    services: "Hair Wash + Hair Creambath + Scalp Massage + Hair Vitamin Serum",
    price: "35.000",
    duration: "30 Minutes",
    is_price_range: false,
  },
];

const ViewServices = () => {
  return (
    <section
      id="services"
      style={{ backgroundImage: `url(${ServicesBg.src})` }}
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center tracking-wider text-white py-8 px-6 lg:px-12"
    >
      <RevealTitle>
        <h2 className="font-extrabold text-3xl lg:text-[50px]">OUR SERVICES</h2>
      </RevealTitle>
      <div className="text-center lg:text-lg">
        <p>Unleash your inner radiance and unlock a look</p>
        <p>you'll love with our extensive range of hair and </p>
        <p>beauty services!</p>
      </div>
      {/* <Carousel/> */}
      <div className="grid lg:grid-cols-2 2xl:grid-cols-2 gap-6 py-8">
        {services.map((c, idx) => {
          return (
            <RevealTitle>
              <ServiceCard
                name={c.name}
                desc={c.desc}
                price={c.price}
                duration={c.duration}
                isComingSoon={c.is_coming_soon}
                isPriceRange={c.is_price_range}
                service={c.services}
              />
            </RevealTitle>
          );
        })}
      </div>
    </section>
  );
};

export default ViewServices;
