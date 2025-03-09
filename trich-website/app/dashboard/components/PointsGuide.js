import Image from "next/image"

const PointsGuide = () => {
  const pointServices = [
    {
      title: "Small Services",
      subtitle: "Trims & Masks",
      points: 5,
      image: "/profileAssets/points1.png",
    },
    {
      title: "The Cutting Edge",
      points: 10,
      image: "/profileAssets/points2.png",
    },
    {
      title: "TRICH Experience",
      points: 15,
      image: "/profileAssets/points3.png",
    },
    {
      title: "Large Services",
      subtitle: "Perming & Coloring",
      points: 40,
      image: "/profileAssets/points4.png",
    },
  ]

  return (
    <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 sm:mb-2 text-center">HOW YOU'LL EARN POINTS</h2>
      <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
        {pointServices.map((service, index) => (
          <div key={index} className="relative">
            <div className="relative h-24 sm:h-36 md:h-44 rounded-lg overflow-hidden">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, 25vw"
              />
              <div className="absolute top-0 right-0 bg-[#53887b] text-white px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded z-10 text-xs sm:text-sm">
                {service.points} Points
              </div>
            </div>
            <div className="mt-1 sm:mt-2">
              <h3 className="font-semibold text-xs sm:text-sm md:text-lg">{service.title}</h3>
              {service.subtitle && <p className="text-xs md:text-sm text-gray-600 font-bold">{service.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PointsGuide