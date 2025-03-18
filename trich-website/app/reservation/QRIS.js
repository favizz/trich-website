import Image from "next/image";
// import { formatPrice } from "./ChooseService";

import Qris from "@/public/reservationAssets/new-qris.jpg";

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

{
    /* {currPage == 4 && (
<div className="flex flex-col items-center justify-center pt-4 space-y-2">
<p className="font-extrabold lg:text-xl ">
Scan To Complete Your Payment
</p>
<p className="font-semibold lg:text-sm">TRICH BARBERSPACE</p>
<p className="font-extrabold text-orange1 lg:text-base xl:text-lg 2xl:text-xl">
IDR{" "}
{totalActualPrice >= 200000 ? "100.000" : formatPrice(totalPrice)}
</p>
<Image src={Qris} alt="Trich-QRIS" width={250} />
<div
className={`${
isLoading ? "hidden" : ""
} flex flex-row space-x-1 md:space-x-4 py-4 text-xs lg:text-sm`}
>
<button
onClick={(e) => handlePayment(e)}
className="bg-green2 text-white font-bold px-4 md:px-6 py-2 rounded"
>
Confirm Payment
</button>
<button
onClick={() => setPage(3)}
className="border border-1 border-orange1 text-orange1 font-bold px-4 md:px-6 py-2 rounded"
>
Cancel Payment
</button>
</div>
<LoadingSpinner toggleShow={isLoading} />
</div>
)} */
}

export default QRIS;
