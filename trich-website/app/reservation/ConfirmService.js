

const ConfirmService = ({myService, toggleConfirm, handlePage, handleNotes}) => {
  return (
    <div className="w-full">
        <div className="px-8 py-4 space-y-1 lg:text-sm xl:text-base 2xl:text-lg">
            <p className="font-bold">Your Services</p>
            <p className="font-extrabold">{myService.name}</p>
            <input onChange={(e) => handleNotes(e.target.value)} type="text" placeholder="insert notes" className="pl-2 border border-1 border-gray-500 rounded"/>
        </div>
        <div className="w-full h-[0.5px] mb-2 bg-gray-600"></div>
        <div className="flex flex-col items-center justify-center lg:py-3 lg:text-sm xl:text-base 2xl:text-lg">
            <p className="font-bold">Do you want to change your service?</p>
            <div className="flex flex-row space-x-4 py-4">
                <div 
                onClick={() => toggleConfirm(false)}
                className="bg-green2 text-white font-bold  px-12 py-2 rounded">Yes</div>
                <div 
                onClick={() => handlePage(2)}
                className="border border-1 border-orange1 text-orange1 font-bold  px-12 py-2 rounded">No</div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmService;