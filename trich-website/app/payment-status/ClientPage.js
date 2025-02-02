import Link from "next/link";

const ClientPage = () => {
  return (
    <div className="py-8 px-16 space-y-4 flex flex-col items-center justify-center bg-white rounded-[10px]">
      <p className="font-extrabold text-2xl xl:text-3xl 2xl:text-4xl">
        <span>Payment Is Received</span>
      </p>
      <Link href="/dashboard">
          <button className="px-6 py-2 font-semibold bg-orange1 text-white rounded-[10px]">
            Go to Dashboard
          </button>
        </Link>
    </div>
  );
};

export default ClientPage;
