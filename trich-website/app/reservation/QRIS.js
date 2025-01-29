import Image from "next/image";

import Qris from "@/public/reservationAssets/qris.png";

const QRIS = ({ handlePay, price }) => {
    return (
        <div className="flex flex-col items-center justify-center pt-4 space-y-2">
            <p className="font-extrabold lg:text-xl">
                Scan To Complete Your Payment!
            </p>
            <p className="font-semibold lg:text-sm">TRICH BARBERSPACE</p>
            <p className="font-extrabold text-orange1 lg:text-base">{price}</p>
            <Image src={Qris} alt="Trich-QRIS" width={250} />
            <div className="flex flex-row space-x-4 py-4 lg:text-sm">
                <div
                    onClick={(e) => clickBooking(e)}
                    className="bg-green2 text-white font-bold px-6 py-2 rounded"
                >
                    Confirm Payment
                </div>
                <div
                    onClick={() => handlePay(false)}
                    className="border border-1 border-orange1 text-orange1 font-bold px-6 py-2 rounded"
                >
                    Cancel Payment
                </div>
            </div>
        </div>
    );
};

export default QRIS;
