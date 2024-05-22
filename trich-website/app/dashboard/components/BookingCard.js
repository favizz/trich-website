const BookingCard = ({ date, time, price, status, notes }) => {
  const handleStatus = (s) => {
    if (s === 3) return "FINISHED"; 
    else if (s === 2) return "PAID";
    else if (s === 1) return "VERIFIED";  
  };
  return (
    <div className="w-full bg-white shadow-md rounded-[10px] px-6 py-4">
      <div className="flex flex-row items-center justify-between space-x-4 lg:space-x-0">
        <p className="font-bold text-sm lg:text-base">{date}</p>
        <div
          className={`${
            status > 1 ? "bg-green-600" : "bg-yellow-400"
          } text-white text-xs lg:text-base px-4 py-2 lg:px-6 lg:py-2 rounded-full`}
        >
          {(status == 1) ? "UNPAID" : ""}
          {(status == 2) ? "PAID" : ""}
          {(status == 3) ? "FINISHED" : ""}
        </div>
      </div>
      <div className="pt-2 space-y-1">
        <p className="lg:text-sm">{time}</p>
        <p className="font-extrabold">Rp {price}</p>
        <div className="pt-1">
          <p className="text-gray-600 lg:text-sm">Notes</p>
          <p className="lg:text-xs ">{notes}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
