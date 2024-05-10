const BookingCard = ({ date, time, price, status, notes }) => {
  const handleStatus = (s) => {
    switch (s) {
      case 1:
        return "VERIFYING";
      case 2:
        return "PAID";
      case 3:
        return "FINISHED";
      default:
        break;
    }
  };
  return (
    <div className="w-full bg-white shadow-md rounded-[10px] px-6 py-4">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">{date}</p>
        <div
          className={`${
            status > 1 ? "bg-green-600" : "bg-yellow-400"
          } text-white px-6 py-2 rounded-full`}
        >
          {handleStatus(status)}
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
