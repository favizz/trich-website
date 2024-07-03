import Image from "next/image";

import WhatsAppLogo from "@/public/homeAssets/whatsapp.svg";
import GmailLogo from "@/public/homeAssets/gmail.svg";

const ViewContact = () => {
  return (
    <section className="w-3/4 tracking-wider px-8 lg:px-16 py-8 lg:py-20 xl:px-24 lg:space-y-4 space-y-4 xl:space-y-6">
      <h2 className="font-bold text-xl lg:text-3xl xl:text-4xl">
        CONNECT WITH <span className="text-orange1">TRICH!</span>
      </h2>
      <p className="font-thin xl:text-lg 2xl:text-xl leading-tight py-2">
        We're not just about sharp haircuts - we're about fostering intensive
        interactions and building a community. Let’s connect with us and forge a
        powerful relationships, #BeyondCuttingEdge.
        <br />
        <br />
        {/* <span className="font-semibold">
          Join us, and together, we'll craft a partnership as sharp as a perfect
          fade.
        </span> */}
        <br />
        <span className="font-bold">
          Contact us today to explore the possibilities!
        </span>
      </p>
      <div className="flex flex-row space-x-3">
        <div className="border border-gray-500 flex items-center justify-center text-white font-normal lg:text-[12px] xl:text-base py-3 px-12 lg:w-[140px] xl:w-[160px] rounded">
          <a href="mailto:trichbarberspace@gmail.com">
            <Image src={GmailLogo} alt="Gmail" width={30} />
          </a>
        </div>
        <div className="border border-gray-500 flex items-center justify-center text-white font-normal lg:text-[12px] xl:text-base py-3 px-12 lg:w-[140px] xl:w-[160px] rounded">
          <a
            href="https://wa.me/628992310069"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={WhatsAppLogo} alt="Whatsapp" width={30} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ViewContact;
