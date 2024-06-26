import Image from "next/image";
import Logo from "@/public/components/navbar_components/NavbarLogoWhite.svg";
import IG from "@/public/components/footer_assets/iGLogo.svg";
import TikTok from "@/public/components/footer_assets/tiktokLogo.svg";
import LinkedIn from "@/public/components/footer_assets/linkedInLogo.svg";
import Blog from "@/public/components/footer_assets/blogLogo.svg";

const Socials = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 lg:space-y-3">
      <Image src={Logo} width={180} alt="Trich-Logo" />
      <p className="text-white opacity-50 lg:text-sm">
        &copy; 2024 Trich Barberspace
      </p>
      <div className="flex flex-row space-x-3">
        <a href="https://www.instagram.com/trichbarber/" target="_blank" rel="noopener noreferrer">
          <Image src={IG} width={30} alt="Instagram" />
        </a>
        <a href="https://www.tiktok.com/@trichbarber" target="_blank" rel="noopener noreferrer">
          <Image src={TikTok} width={30} alt="Tiktok" />
        </a>
        <Image src={LinkedIn} width={30} alt="LinkedIn" />
        <Image src={Blog} width={30} alt="Blog" />
      </div>
    </div>
  );
};

export default Socials;
