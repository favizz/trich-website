import Link from "next/link";

const PromoHeading = () => {
  return (
    <>
      <p className="text-orange1 font-extrabold text-3xl lg:text-4xl">LIMITED PROMO !</p>
      <div className="flex flex-row font-bold text-lg lg:text-2xl text-white space-x-2">
        <Link href="/t&c/backtoschool">
          <p>Back to School</p>
        </Link>
        <p> | </p>
        <Link href="/t&c/morningedge">
          <p>Morning Edge</p>
        </Link>
      </div>
    </>
  );
};

export default PromoHeading;
