"use client"

import { useState } from "react"

const ClientPoints = ({ point }) => {
  const [points, setPoints] = useState(point ? point : 0);
  const milestones = [0, 10, 25, 35, 50, 75, 100, 150, 200];
  const milestoneLabels = [0, 25, 50, 100, 200];
  const totalSegments = milestones.length - 1;

  // Helper function to get segment intensity
  const getSegmentOpacity = (start, end) => {
    if (points < start) return 0.2;
    if (points >= end) return 1;
    const progress = (points - start) / (end - start);
    return 0.6 + progress * 0.6
  }

  // Calculate equal width for each segment
  const segmentWidth = 100 / totalSegments

  const segments = milestones.slice(0, -1).map((start, index) => {
    const end = milestones[index + 1]
    return {
      start,
      end,
      opacity: getSegmentOpacity(start, end),
      width: `${segmentWidth}%`,
    }
  })

  // Find the next milestone
  const nextMilestone = milestoneLabels.find((milestone) => milestone > points) || milestones[milestones.length - 1]
  const pointsLeft = nextMilestone - points

  // Modify this calculation for more precise positioning of milestone labels
  const labelPositions = milestones.map((milestone, index) => {
    const milestoneIndex = milestones.indexOf(milestone)
    if (milestoneIndex === 0) return 0
    if (milestoneIndex === milestones.length - 1) return 88.5
    const offsetMap = {
      0: 0,
      25: -3.1,
      50: -5.9,
      100: -8.4,
      200: 0,
    }

    return milestoneIndex * segmentWidth + (offsetMap[milestone] || 0)
  })

  return (
    <div className="flex items-stretch space-x-2 sm:space-x-4 md:space-x-6">
      {/* Left Box */}
      <div className="bg-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-lg shadow-sm flex flex-col items-center">
        <p className="whitespace-nowrap text-sm sm:text-base md:text-lg font-extrabold text-[#53887b] border border-[#53887b] px-2 sm:px-3 md:px-4 py-0.5 md:py-1 rounded-full tracking-wider">
          MY POINTS
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F26524] mt-1 md:mt-2 tracking-wider">
          {points}
        </p>
      </div>

      {/* Right Box with Progress Bar */}
      <div className="flex flex-col flex-grow bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm">
        <div className="px-3 sm:px-5 md:px-7 relative pt-3 md:pt-1 w-full h-3 mb-3 md:mb-6">
          {/* Milestone Labels */}
          <div className="absolute w-full">
            {milestoneLabels.map((milestone, index) => {
              // Find the position in our milestones array
              const milestoneIndex = milestones.indexOf(milestone)
              return (
                <span
                  key={index}
                  className="absolute transform -translate-x-1/2 text-xs sm:text-sm text-gray-600"
                  style={{
                    left: `${labelPositions[milestoneIndex]}%`,
                  }}
                >
                  {milestone}
                </span>
              )
            })}
          </div>

          {/* Progress bar and segments continue below */}
          <div className="relative w-full h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden mt-5">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="absolute h-full transition-all duration-300"
                style={{
                  left: `${index * segmentWidth}%`,
                  width: index === segments.length - 1 ? `${segment.width}` : `calc(${segment.width} - 4px)`,
                  backgroundColor: "#001246",
                  opacity: segment.opacity,
                }}
              />
            ))}
          </div>
        </div>

        {/* Points Info */}
        <p className="px-2 sm:px-3 md:px-5 text-xs sm:text-sm text-[#1A1A1A] mt-5">
          You have {points} points!
          {points < 200 && <strong> Get {pointsLeft}</strong>}
          {points < 200 && " more points to redeem your next reward"}
        </p>

        {/* Learn More Button
        <div className="mt-1.5 sm:mt-2 md:mt-2.5 flex justify-end">
          <button className="bg-[#F26524] text-white px-2.5 sm:px-3 md:px-3.5 py-0.5 font-bold rounded-full text-xs sm:text-sm hover:bg-[#F4511E] transition-colors tracking-wider">
            Learn More
          </button>
        </div>
        */}
      </div>
    </div>
  )
}

export default ClientPoints