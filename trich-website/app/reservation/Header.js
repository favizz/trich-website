const Header = ({ currPage }) => {
    return (
        <>
        <h2 className="font-extrabold mb-6 lg:text-xl xl:text-2xl text-center">
                RESERVATION
            </h2>
            <div className="w-full h-[1px] bg-gray-600 "></div>
            <div
                className="flex flex-row items-center justify-center space-x-3 md:space-x-8 px-3 lg:px-6 py-4 "
            >
                <div
                    className={`${
                        currPage == 0
                            ? "bg-green1 text-white"
                            : "text-black"
                    } 
                    rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2 `}
                >
                    Info
                </div>
                <p>&gt;</p>
                <div
                    className={`${
                        currPage == 1
                            ? "bg-green1 text-white"
                            : "text-black"
                    }
                    rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                >
                    Service
                </div>
                <p>&gt;</p>
                <div
                    className={`${
                        currPage == 2
                            ? "bg-green1 text-white"
                            : "text-black"
                    }
                    rounded-[30px] font-extrabold text-xs lg:text-xs xl:text-sm 2xl:text-base px-6 py-2`}
                >
                    Time
                </div>
            </div>
            <div className="w-full h-[0.5px] mb-2 bg-gray-600 "></div>
        </>
    )
}

export default Header;