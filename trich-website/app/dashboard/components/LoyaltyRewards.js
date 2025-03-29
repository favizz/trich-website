'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const loyaltyRewards = [
    {
        title: "50% discount",
        subtitle: "on small services",
        points: 20,
        image: "/profileAssets/loyalty1.jpg",
        status: "active",
        query: "w62jI0Zzbk",
    },
    {
        title: "FREE",
        subtitle: "Small Services",
        points: 50,
        image: "/profileAssets/loyalty2.jpg",
        status: "active",
        query: "5J8qcc6ahu",
    },  
    {
        title: "FREE",
        subtitle: "1x Trich Experience",
        points: 100,
        image: "/profileAssets/loyalty3.jpg",
        status: "active",
        query: "H3e5LrxK2R",
    },
    {
        title: "Coming Soon",
        subtitle: "",
        points: 200,
        image: "/profileAssets/loyalty4.jpg",
        status: "coming",
        query: "",
    },
];

const LoyaltyRewards = ({
  points
}) => {
    const router = useRouter();
    const [point, setPoint] = useState(points ? points : 0);

    const handlePromoRoute = (query) => {
        router.push(`q=${query}`);
    }
  
    return (
      <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 sm:mb-2 text-center">LOYALTY REWARDS</h2>
        
        <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
          {loyaltyRewards.map((reward, index) => (
            <div key={index} className="flex flex-col items-center">
              
              {/* Container for Image, Title, Subtitle, and Points */}
              <div
                className="relative h-32 sm:h-44 md:h-35 rounded-lg shadow-lg flex flex-col justify-between bg-cover bg-center w-full"
                style={{ backgroundImage: `url(${reward.image})` }}
              >
                <div className="flex flex-col flex-grow justify-between p-2 sm:p-3 md:p-4">
                  
                  {/* Reward Title & Subtitle */}
                  <div className="text-[#001246] text-center lg:h-1/4 mt-auto mb-1 sm:mb-2 md:mb-4">
                    <h3 className="font-extrabold text-xs sm:text-sm md:text-lg">{reward.title}</h3>
                    <p className="font-semibold text-xs md:text-sm">{reward.subtitle}</p>
                  </div>
                </div>
  
                {/* Points Section */}
                <div className="bg-[#53887b] text-white text-left py-0.5 sm:py-1 px-1 sm:px-2 md:px-3 rounded-b-lg w-full text-xs sm:text-sm">
                  {reward.points} Points
                </div>
              </div>
  
              {/* Redeem Button - Placed Below the Reward Container */}
              {reward.status !== "coming" && (
                <button
                    className={`mt-2 text-white py-0.5 sm:py-1 px-2 sm:px-3 md:px-4 rounded text-xs sm:text-sm font-extrabold tracking-wide w-16 sm:w-20 md:w-24 text-center ${
                    (reward.status === "active" && point >= reward.points) 
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                    disabled={reward.status === "coming"}
                    onClick={() => router.push(`/reservation?q=${reward.query}`)}
                >
                  Redeem
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default LoyaltyRewards;