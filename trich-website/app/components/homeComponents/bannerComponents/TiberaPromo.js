import Image from "next/image";
import TiberaLogo from "@/public/homeAssets/tiberaLogo.png";
import TiberaBG from "@/public/homeAssets/tiberaBg.jpg";
import TrichLogo from "@/public/homeAssets/TrichHomeLogo.svg";

const TiberaPromo = () => {
  return (
    <section
      className="min-h-screen flex flex-col justify-center bg-cover bg-center backdrop-blur-lg font-extrabold text-white"
      style={{ backgroundImage: `url(${TiberaBG.src})` }}
    >
      {/* Logos */}
      <div className="flex flex-row items-center justify-start">
        <Image src={TrichLogo} alt="Trich Logo" width={150} height={150} />
        <p className="text-2xl font-normal">X</p>
        <Image src={TiberaLogo} alt="Tibera Logo" width={150} height={150} />
      </div>

      {/* Header */}
      <div className="py-8 text-7xl pl-12 tracking-wider">
        <p>
          TIB<span className="text-orange1">ERA</span>
        </p>
        <p>PROMO</p>
        <p>
          <span>20k</span> Off!
        </p>
      </div>

      {/* Details */}
      <div className="pl-12">
        <p>
          from <span className="text-orange1">85k</span> to{" "}
          <span className="text-orange1">65k</span>
        </p>
        <ul class="list-disc pl-8 space-y-1 font-bold">
          <li>
            Exclusively for{" "}
            <span class="text-orange-500">Tibera Hotel Guests</span>
          </li>
          <li>
            Available for{" "}
            <span class="font-semibold italic">"The Cutting Edge"</span> service
            only
          </li>
          <li>Show your room card to our cashier</li>
          <li>
            Follow our Instagram at{" "}
            <span class="text-orange-500">@trichbarber</span>
          </li>
          <li>Mention us in your Instastory</li>
        </ul>
        <p className="pt-12">#BeyondCuttingEdge</p>
      </div>

    </section>
  );
};

export default TiberaPromo;
