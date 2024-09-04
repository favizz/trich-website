import Link from "next/link";
import RevealTitle from "../../animation/Reveal";
import MorningEdgeBG from "@/public/homeAssets/morningedgebg.png";

const MorningEdgeBox = () => {
  return (
    <section
      style={{ backgroundImage: `url(${MorningEdgeBG.src})` }}
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat items-start justify-center"
    >
      <div className="bg-white px-8 py-4 rounded-tr-2xl rounded-br-2xl">
        <div>
          <h1 className="font-extrabold text-4xl lg:text-6xl ">MORNING EDGE</h1>
          <h3 className="font-bold text-orange1 text-xl lg:text-3xl pt-4">
            SPECIAL ONLY ON:
          </h3>
          <div className="font-bold text-lg lg:text-2xl">
            <p>Monday to Thursday</p>
            <p>from 10:00 to 12:00</p>
          </div>
        </div>
        <RevealTitle>
          <div className="flex flex-col items-center pt-8 font-bold text-sm lg:text-2xl">
            <p>
              EXPERIENCE "
              <span className="text-orange1 font-extrabold">
                THE CUTTING EDGE
              </span>
              "
            </p>
            <p className="lg:text-xl">SERVICE FOR ONLY</p>
            <div className="flex flex-row space-x-3 items-start">
              <p className="line-through text-sm lg:text-lg">Rp 85.000</p>
              <p className="text-orange1 font-extrabold text-xl lg:text-3xl">
                Rp 65.000
              </p>
            </div>
            <Link href="/t&c/morningedge" className="pt-4">
              <div className="bg-orange1 hover:bg-orange-300 text-white font-bold text-xs lg:text-[12px] xl:text-base py-3 px-6 rounded">
                View Details
              </div>
            </Link>
          </div>
        </RevealTitle>
      </div>
    </section>
  );
};

export default MorningEdgeBox;
