import Link from "next/link";
import Image from "next/image";
import Socials from "./footerComponents/Socials";
import HomeIcon from "@/public/homeAssets/homeIcon.svg";
import MailIcon from "@/public/homeAssets/mailIcon.svg";
import PhoneIcon from "@/public/homeAssets/phoneIcon.svg";

const paths = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Services",
    url: "/services",
  },
  {
    name: "Profile",
    url: "/dashboard",
  },
  {
    name: "About Us",
    url: "/about-us",
  },
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Barber",
    url: "/barber",
  },
];

const Footer = () => {
  return (
    <footer className="w-full flex flex-row items-start justify-between bg-black lg:px-16 lg:py-10 text-white">
      <Socials />

      {/* ROutes */}
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Navigation</p>
        {paths.map((p, idx) => {
          return (
            <Link href={p.url}>
              <p className="opacity-50 text-xs">{p.name}</p>
            </Link>
          );
        })}
      </div>

      {/* Legal */}
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Legal</p>
        <div className="opacity-50 text-xs flex flex-col space-y-1">
          <p>Privacies</p>
          <p>Policies</p>
          <p>Terms</p>
        </div>
      </div>

      {/* Context */}
      <div className="flex flex-col items-start space-y-2   ">
        <p className="font-semibold">Contact us</p>
        <div className="flex flex-row items-center justify-center space-x-3">
          <Image src={PhoneIcon} width={15} alt="Phone-Icon" />
          <p className="opacity-50 lg:text-xs">+62 821-xxx-xxx</p>
        </div>
        <div className="flex flex-row items-center justify-center space-x-3">
          <Image src={MailIcon} width={15} alt="Mail-Icon" />
          <p className="opacity-50 lg:text-xs">trich_barberspace@gmail.com</p>
        </div>
        <p className="font-semibold">Visit us</p>
        <div className="flex flex-row items-center justify-center space-x-3">
          <Image src={HomeIcon} width={15} alt="Home-Icon" />
          <p className="opacity-50 lg:text-xs">Jl. Sumbawa no. 24</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
