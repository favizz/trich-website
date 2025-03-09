const TableRow = ({
    booking,
    key,
    deleteBooking,
    status,
    setStatus,
    updateStatus,
}) => {
    return (
        <tr key={key}>
            <td className="flex flex-row justify-between border border-1 border-solid border-black">
                <p>{booking.date}</p>
                <button
                    onClick={() => deleteBooking(booking.booking_id)}
                    className="text-white bg-orange1"
                >
                    Delete
                </button>
            </td>
            <td className="space-x-2 border border-1 border-solid border-black">
                {booking.name}
            </td>
            <td className="border border-1 border-solid border-black">
                {booking.service}
            </td>
            <td className="border border-1 border-solid border-black">
                {booking.time}
            </td>
            <td className="border border-1 border-solid border-black">
                {booking.amount}
            </td>
            <td className="flex flex-row border border-1 border-solid border-black">
                <input
                    type="number"
                    className="text-center w-full"
                    placeholder={"current status:  " + booking.status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button
                    className="bg-orange1"
                    onClick={() => updateStatus(booking.booking_id, status)}
                >
                    edit
                </button>
            </td>
            <td className="border border-1 border-solid border-black">
                {booking.phone_number.replace("+62", "0")}
            </td>
        </tr>
    );
};

export default TableRow;
