import Image from "next/image"

const BarberCard = ({barberImage, name, desc}) => {
  return (
    <div className="lg:w-[300px] xl:w-[390px] tracking-wider text-black lg:text-lg">
        <Image src={barberImage} alt="barberImage"/>
        <p className="font-extrabold pt-2 lg:text-lg xl:text-2xl">{name}</p>
        <p className=" lg:text-base xl:text-lg">{desc}</p>
    </div>
  )
}

export default BarberCard