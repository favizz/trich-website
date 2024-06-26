import Image from "next/image";

import WhatsAppLogo from '@/public/homeAssets/whatsapp.svg';
import GmailLogo from '@/public/homeAssets/gmail.svg'

const ViewContact = () => {
  return (
    <section className="w-3/4 tracking-wider px-8 lg:px-16 py-8 lg:py-20 xl:px-24 lg:space-y-4 space-y-4 xl:space-y-6">
      <h2 className="font-bold lg:text-3xl xl:text-4xl">
        ELEVATE YOUR BRAND: FORGE A POWERFUL PARTNERSHIP WITH <span className="text-orange1">TRICH</span> BARBERSPACE
      </h2>
      <p className="font-thin xl:text-lg leading-tight py-2">
        Ready to take your business to the next level? Partner with Trich
        Barberspace, a distinguished establishment known for its impeccable
        service and dedicated clientele. We're not just about sharp haircuts -
        we're about fostering connections and building a community.
        <br />
        <br />
        <span className="font-semibold">
          Join us, and together, we'll craft a partnership as sharp as a perfect
          fade.
        </span>
        <br />
        <br />
        <span className="font-bold">
          Contact us today to explore the possibilities!
        </span>
      </p>
      <div className="flex flex-row space-x-3">
        <div className="border border-gray-500 flex items-center justify-center text-white font-normal lg:text-[12px] xl:text-base py-3 px-12 lg:w-[140px] xl:w-[160px] rounded">
          <a
            href="https://www.instagram.com/trichbarber/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={GmailLogo} alt="Gmail" width={30}/>
          </a>
        </div>
        <div className="border border-gray-500 flex items-center justify-center text-white font-normal lg:text-[12px] xl:text-base py-3 px-12 lg:w-[140px] xl:w-[160px] rounded">
          <a
            href="https://www.instagram.com/trichbarber/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={WhatsAppLogo} alt="Whatsapp" width={30}/>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ViewContact;
