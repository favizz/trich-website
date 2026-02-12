import { format, addMinutes, parse } from "date-fns";

const BookingCard = ({ date, time, amount, status, notes, barberName, serviceNames, duration }) => {
  // Map API status string to display text and color
  const statusMap = {
    unpaid: { text: "SUCCESS", color: "bg-green-600" },
    half: { text: "SUCCESS", color: "bg-green-600" },
    walkIn: { text: "SUCCESS", color: "bg-green-600" },
    paid: { text: "SUCCESS", color: "bg-green-600" },
  };

  const { text, color } = statusMap[status] || { text: "UNKNOWN", color: "bg-gray-400" };

  // Calculate end time
  const startTime = parse(time, "HH:mm:ss", new Date());
  const endTime = addMinutes(startTime, duration);
  const timeRange = `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`;

  return (
    <div className="w-full bg-white shadow-md rounded-[10px] px-6 py-4">
      <div className="flex flex-row items-center justify-between space-x-4 lg:space-x-0">
        <p className="font-bold text-sm lg:text-base">{date}</p>
        <div className={`text-white text-xs lg:text-base px-4 py-2 lg:px-6 lg:py-2 rounded-full ${color}`}>
          {text}
        </div>
      </div>

      <div className="pt-2 space-y-1">
        <p className="lg:text-sm font-semibold">{timeRange}</p>
        {barberName && <p className="lg:text-sm">Barber: {barberName}</p>}
        {serviceNames && serviceNames.length > 0 && (
          <p className="lg:text-sm">Services: {serviceNames.join(", ")}</p>
        )}
        <p className="font-extrabold">Rp {amount.toLocaleString()}</p>
        {notes && (
          <div className="pt-1">
            <p className="text-gray-600 lg:text-sm">Notes</p>
            <p className="lg:text-xs">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
