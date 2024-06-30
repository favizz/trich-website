"use client";
import { useState } from "react";
import { Services } from "./Services";
import ToastManager from "../components/toaster";
import { ToastContainer } from "react-toastify";

export const formatPrice = (number) => {
  if (isNaN(number)) {
    return null; // Handle invalid input (optional)
  }

  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into integer and decimal parts (if any)
  const [integerPart, decimalPart = ""] = numberString.split(".");

  // Reverse the integer part for easier processing
  const reversedInteger = integerPart.split("").reverse().join("");

  // Add commas every 3 digits using a loop
  let formattedInteger = "";
  for (let i = 0; i < reversedInteger.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedInteger += ".";
    }
    formattedInteger += reversedInteger[i];
  }

  // Reverse the formatted integer back to normal order
  formattedInteger = formattedInteger.split("").reverse().join("");

  // Combine formatted integer and decimal part (if any)
  const formattedNumber = `${formattedInteger}${decimalPart ? "." + decimalPart : ""}`;

  return formattedNumber;
}

const ChooseService = ({ handleService, handleTotalPrice, handleTotalActualPrice, toggleConfirm }) => {
  const [chosenServices, setChosenServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalActualPrice, setTotalActualPrice] = useState(0);

  const handleServiceChange = (service) => {
    let updatedServices;

    if (chosenServices.includes(service)) {
      updatedServices = chosenServices.filter((s) => s !== service);
    } else {
      if (service === "The Trich Experience") {
        updatedServices = [
          "The Trich Experience",
          ...chosenServices.filter(
            (s) =>
              s !== "The Cutting Edge" &&
              s !== "Trim & Treat" &&
              s !== "Mask Off"
          ),
        ];
      } else if (
        service === "The Cutting Edge" ||
        service === "Trim & Treat" ||
        service === "Mask Off"
      ) {
        if (chosenServices.includes("The Trich Experience")) {
          ToastManager.notify('Trich Experience already includes these services', 'error')
          return;
        }
        updatedServices = [...chosenServices, service];
      } else {
        updatedServices = [...chosenServices, service];
      }
    }

    setChosenServices(updatedServices);

    setTotalPrice(updatedServices.reduce((total, service) => {
      const serviceObj = Services.find(s => s.name === service);
      return total + (serviceObj ? serviceObj.nominal : 0);
    }, 0));

    setTotalActualPrice(updatedServices.reduce((total, service) => {
      const serviceObj = Services.find(s => s.name === service);
      return total + (serviceObj ? serviceObj.actual_price : 0);
    }, 0));
  };

  const handleSubmit = () => {
    if (chosenServices.length == 0) {
      ToastManager.notify('Please select a service!', 'error');
      return;
    } 
    toggleConfirm(true);
  }

  return (
    <div className="w-full space-y-2">
      {Services.map((service, idx) => {
        return (
          <div
            key={idx}
            className="py-[2px]"
          >
            <div className="flex flex-row items-center justify-between font-bold px-4 lg:px-6 xl:px-10">
              <div className="flex flex-col space-y-0">
                <p className="text-sm lg:text-sm xl:text-base 2xl:text-lg">
                  {service.name} -{" "}
                  <span className="text-orange1 font-semibold">
                    {formatPrice(service.actual_price)}
                  </span>
                </p>
                <p className="text-gray-500 font-semibold text-sm lg:text-sm xl:text-base 2xl:text-lg">
                  duration: {service.duration} hours
                </p>
                <p className="text-green2 font-semibold text-xs xl:text-sm 2xl:text-base w-3/4">
                  {service.name == "The Trich Experience" ? "*  The Trich Experience includes The Cutting Edge and 2 additional services" : ""}
                </p>
              </div>
              <input
                type="checkbox"
                className="md:w-6 md:h-6 rounded-xl accent-orange1"
                checked={chosenServices.includes(service.name)}
                onChange={() => handleServiceChange(service.name)}
              />
            </div>
            <div className="w-full h-[0.5px] mt-1 bg-gray-600"></div>
          </div>
        );
      })}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div
            onClick={() => {
              const tempService = chosenServices.join(", ");
              handleService(tempService);
              handleTotalPrice(totalPrice);
              handleTotalActualPrice(totalActualPrice);
              handleSubmit();
            }}
          className="text-center border hover:border-orange1 hover:bg-white bg-orange1 hover:text-orange1 text-white font-bold  px-12 py-2 rounded"
        >
          Continue
        </div>
        <p className="text-center text-black font-extrabold">
          You can choose more than 1 service
        </p>
      </div>
      
      <div className="w-0 h-0">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ChooseService;
