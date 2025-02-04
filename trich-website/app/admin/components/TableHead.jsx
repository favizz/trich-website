const TableHead = () => {
    return (
        <thead>
            <tr className="bg-orange1 font-bold text-white">
                <th className="border border-1 border-solid border-black">
                    Date
                </th>
                <th className="border border-1 border-solid border-black">
                    First Name (email)
                </th>
                <th className="border border-1 border-solid border-black">
                    Service
                </th>
                <th className="border border-1 border-solid border-black">
                    Time
                </th>
                <th className="border border-1 border-solid border-black">
                    Amount
                </th>
                <th className="border border-1 border-solid border-black">
                    Status
                </th>
                <th className="border border-1 border-solid border-black">
                    Phone Number
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;
