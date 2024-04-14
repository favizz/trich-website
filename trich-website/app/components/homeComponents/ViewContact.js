import Link from "next/link";

const ViewContact = () => {
  return (
    <section className="w-3/4 tracking-wider lg:px-16 lg:py-20 xl:px-24 lg:space-y-4 xl:space-y-6">
      <h2 className="font-bold lg:text-3xl xl:text-4xl">
        ELEVATE YOUR BRAND: FORGE A POWERFUL PARTNERSHIP WITH TRICH BARBERSPACE
      </h2>
      <p className="font-thin xl:text-lg leading-tight lg:py-2">
        Ready to take your business to the next level? Partner with Trich
        Barberspace, a distinguished establishment known for its impeccable
        service and dedicated clientele. We're not just about sharp haircuts -
        we're about fostering connections and building a community.
        <br/><br/>
        <span className="font-semibold">
          Join us, and together, we'll craft a partnership as sharp as a perfect
          fade.
        </span>
        <br/><br/>
        <span className="font-bold">Contact us today to explore the possibilities!</span>
      </p>
      <Link href="/">
        <div className="bg-orange1 hover:bg-orange-300 flex items-center justify-center text-white font-normal lg:text-[12px] xl:text-base py-3 px-6 lg:w-[140px] xl:w-[160px] rounded">
          Contact us
        </div>
      </Link>
    </section>
  );
};

export default ViewContact;
