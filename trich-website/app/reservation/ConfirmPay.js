import { useState } from "react";

const ConfirmPay = ({ date, time, service, notes, handlePage }) => {
  const [agreePolicy, setAgreePolicy] = useState(false);

  return (
    <div className="w-full text-sm xl:text-base 2xl:text-lg">
      <div className="px-4 lg:px-6 space-y-2 py-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[#545454] font-semibold">Reserved Date</p>
          <p className="font-bold">{date}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-[#545454] font-semibold">Time</p>
          <p className="font-bold">{time}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-[#545454] font-semibold">Services</p>
          <p className="font-bold">{service.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-[#545454] font-semibold">Down Payment</p>
          <p className="font-extrabold text-orange1 lg:text-base">IDR {service.price}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-[#545454] font-semibold">Notes</p>
          <p className="font-light lg:text-sm">{notes ? notes : "-"}</p>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-gray-600"></div>
      <div className="px-4 lg:px-6 space-y-2 mt-4">
        <p className="font-bold">Cancellation Policy:</p>
        <p className="max-w-[80vw] lg:max-w-[50vw] xl:max-w-[40vw]  2xl:max-w-[30vw] lg:text-xs ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
          lobortis mattis aliquam faucibus purus in massa tempor.
        </p>
        <div className="flex flex-row items-center space-x-2">
          <input
            type="checkbox"
            onChange={(e) => setAgreePolicy(e.target.checked)}
          />
          <label className="text-[10px]">I agree to the policy above</label>
        </div>
        <div
          onClick={() => (agreePolicy ? handlePage(4) : null)}
          className="w-full rounded text-white font-bold bg-green2 py-2 lg:text-lg text-center"
        >
          Book Now
        </div>
      </div>
    </div>
  );
};

export default ConfirmPay;
