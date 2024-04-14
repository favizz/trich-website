"use client"
import Card from "./Card"
import MotionSlider from "./MotionSlider";

const Carousel = () => {
  return (
    <div>
      <MotionSlider>
      {[...Array(20)].map((item, i) => (
          <Card/>
        ))}
      </MotionSlider>
    </div>
  )
}

export default Carousel