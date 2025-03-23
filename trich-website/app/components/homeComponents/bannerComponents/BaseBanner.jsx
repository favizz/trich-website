import Image from "next/image";
import RevealTitle from "../../animation/Reveal";
import PromoHeading from "../PromoHeading";
import BannerBG from "@/public/homeAssets/BannerBg.jpg";
import HomeLogo from "@/public/homeAssets/TrichHomeLogo.svg";

const BaseBanner = () => {
    return (
        <section
            style={{ backgroundImage: `url(${BannerBG.src})` }}
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center"
        >
            <RevealTitle>
                <Image
                    src={HomeLogo}a
                    width={800}
                    alt="Trich-Logo"
                    className="pt-[120px] pb-8"
                />
            </RevealTitle>
            <PromoHeading />
        </section>
    );
};

export default BaseBanner;
