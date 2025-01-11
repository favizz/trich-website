import Image from "next/image";

import Icon1 from "@/public/dashboardAssets/membership/membership-1.svg";
import Icon2 from "@/public/dashboardAssets/membership/membership-2.svg";
import Icon3 from "@/public/dashboardAssets/membership/membership-3.svg";
import Icon4 from "@/public/dashboardAssets/membership/membership-4.svg";

const Membership = () => {
    return (
        <div className="lg:max-w-[579px] xl:max-w-[759px] bg-white w-full lg:p-6 rounded-xl">
            <p className="font-bold lg:text-xl leading-8">
                Upgrade to TRICH Membership for exclusive benefits
            </p>
            <div className="rounded-[10px] lg:pt-6 flex flex-row space-x-2">
                <div className="w-1/2 flex flex-col space-y-4">
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon1} alt="icon"/>
                        <p className="leading-tight">Unlimited TCE services during membership.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon2} alt="icon"/>
                        <p className="leading-tight">10% discount on Mask Off, Creambath, Trim & Treat.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon3} alt="icon"/>
                        <p className="leading-tight">10% discount on Permification, Smooth Operator, True Colors, and Tat Too.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <Image src={Icon4} alt="icon"/>
                        <p className="leading-tight">Free drinks every visit.</p>
                    </div>

                    <p className="underline font-semibold lg:text-lg lg:pt-8">Terms & Conditions</p>
                </div>

                <div className="w-1/2 flex flex-col items-center  space-y-4">
                    <p className="font-semibold">Plan</p>
                    <div className="w-4/5 flex flex-col text-center justify-center lg:py-6 bg-[#D5D9E7]">
                        <p className="font-semibold lg:text-xl text-[#231D4F]">IDR 459.000 <a className="font-normal lg:text-base text-[#3B3C4E]">/6 month</a></p>
                    </div>
                    <div className="w-4/5 flex flex-col text-center justify-center lg:py-6 bg-[#D5D9E7]">
                        <p className="font-semibold lg:text-xl text-[#231D4F]">IDR 799.000 <a className="font-normal lg:text-base text-[#3B3C4E]">/12 month</a></p>
                    </div>
                    <div className="w-4/5 flex flex-col text-center justify-center lg:py-4 bg-orange1 rounded-md">
                        <p className="font-semibold lg:text-xl text-white">Upgrade Now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;
