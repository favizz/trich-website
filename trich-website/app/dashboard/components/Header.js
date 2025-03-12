import BannerBG from "@/public/dashboardAssets/bannerBg.png";

const Header = () => {
    return (
        <div 
            style={{ backgroundImage: `url(${BannerBG.src})` }}
            className="absolute inset-x-0 top-0 h-48 px-4 py-6 md:px-16 md:py-8 md:text-left mt-5 lg:mt-0"
            >
            <div className="px-2 sm:px-4 md:px-6 mt-6 lg:mt-0">
                <p className="font-extrabold text-white tracking-widest text-[15px] md:text-2xl lg:text-3xl lg:text-left">
                    EARN REWARDS WHILE YOU GROOM IN STYLE!
                </p>
                <p className="text-white font-light leading-tight tracking-wider opacity-50 text-base md:text-xl lg:text-2xl lg:text-left">
                    Unlock exclusive benefits with every visit to TRICH Barberspace.
                </p>
            </div>
        </div>
    )
}

export default Header;