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
  },
  {
    title: "FREE",
    subtitle: "Small Services",
    points: 50,
    image: "/profileAssets/loyalty2.jpg",
    status: "active",
  },  
  {
    title: "FREE",
    subtitle: "1x Trich Experience",
    points: 100,
    image: "/profileAssets/loyalty3.jpg",
    status: "active",
  },
  {
    title: "Coming Soon",
    subtitle: "",
    points: 200,
    image: "/profileAssets/loyalty4.jpg",
    status: "coming",
  },
];

const LoyaltyRewards = ({ phoneNumber, points }) => {
  const router = useRouter();
  const [userPoints, setUserPoints] = useState(points);

  function formatPhoneNumber(number) {
    let digits = number.replace(/\D/g, "");
    if (digits.startsWith("0")) {
      digits = "62" + digits.slice(1);
    } else if (!digits.startsWith("62")) {
      digits = "62" + digits;
    }
    return "+" + digits;
  }

  const redeemReward = async (reward) => {
    if (userPoints < reward.points || reward.status === "coming") return;

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SPRINGBOOT_URL + "/website/discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_BASE_KEY}`,
        body: JSON.stringify({
          phoneNumber: formatPhoneNumber(phoneNumber),
          points: reward.points,
        }),
      });

      if (!res.ok) throw new Error("Failed to redeem reward");

      setUserPoints(prev => prev - reward.points);

      // Redirect to /reservation
      router.push("/reservation");
    } catch (err) {
      console.error("Error redeeming reward:", err);
      alert("Failed to redeem reward. Please try again.");
    }
  };

  return (
    <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 sm:mb-2 text-center">LOYALTY REWARDS</h2>
      
      <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
        {loyaltyRewards.map((reward, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="relative h-32 sm:h-44 md:h-35 rounded-lg shadow-lg flex flex-col justify-between bg-cover bg-center w-full"
              style={{ backgroundImage: `url(${reward.image})` }}
            >
              <div className="flex flex-col flex-grow justify-between p-2 sm:p-3 md:p-4">
                <div className="text-[#001246] text-center lg:h-1/4 mt-auto mb-1 sm:mb-2 md:mb-4">
                  <h3 className="font-extrabold text-xs sm:text-sm md:text-lg">{reward.title}</h3>
                  <p className="font-semibold text-xs md:text-sm">{reward.subtitle}</p>
                </div>
              </div>
              <div className="bg-[#53887b] text-white text-left py-0.5 sm:py-1 px-1 sm:px-2 md:px-3 rounded-b-lg w-full text-xs sm:text-sm">
                {reward.points} Points
              </div>
            </div>

            {reward.status !== "coming" && (
              <button
                className={`mt-2 text-white py-0.5 sm:py-1 px-2 sm:px-3 md:px-4 rounded text-xs sm:text-sm font-extrabold tracking-wide w-16 sm:w-20 md:w-24 text-center ${
                  (reward.status === "active" && userPoints >= reward.points) 
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={userPoints < reward.points || reward.status === "coming"}
                onClick={() => redeemReward(reward)}
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