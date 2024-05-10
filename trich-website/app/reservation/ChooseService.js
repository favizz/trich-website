import { Services } from "./Services";

const ChooseService = ({handleService, toggleConfirm}) => {
  return (
    <div className="w-full space-y-2">
        {Services.map((s, idx) => {
          return (
            <div onClick={() => {handleService(s); toggleConfirm(true)}}>
              <div className="flex flex-row items-center justify-between font-bold lg:px-6 xl:px-10">
                <p className="lg:text-sm xl:text-base 2xl:text-lg">{s.name}</p>
                <p>&gt;</p>
              </div>
              <div className="w-full h-[0.5px] mt-1 bg-gray-600"></div>
            </div>
          );
        })}
      </div>
  )
}

export default ChooseService