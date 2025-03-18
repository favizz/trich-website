import Link from "next/link";
import ViewAppointmentBg from "@/public/homeAssets/appointmentBg.jpg";

const ViewAppointment = () => {
    return (
        <section
            style={{ backgroundImage: `url(${ViewAppointmentBg.src})` }}
            className="bg-cover bg-center bg-no-repeat flex flex-col text-white tracking-widest px-6 py-8 lg:px-16 lg:py-20 xl:px-24 space-y-4 xl:space-y-6"
        >
            <h2 className="font-bold text-xl lg:text-[50px] xl:text-6xl">
                BOOK AN APPOINTMENT
            </h2>
            <p className="w-2/3 font-thin text-sm xl:text-lg leading-tight">
                At Trich Barberspace we utilize a simple online booking platform
                to streamline the booking process. Appointments are always
                preferred but if you stop by, and we can make it fly, we will be
                happy to make some magic happen.Unleash your inner radiance and
                unlock a look you'll love with our extensive range of hair and
                beauty services!
            </p>
            <Link href="/reservation">
                <div className="bg-orange1 hover:bg-orange-300 flex items-center justify-center text-white font-normal lg:text-[12px] xl:text-base py-3 px-6 lg:w-[120px] xl:w-[160px] rounded">
                    Book now
                </div>
            </Link>
        </section>
    );
};

export default ViewAppointment;
