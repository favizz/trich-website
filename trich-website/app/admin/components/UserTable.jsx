const UserTable = ({ user }) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-orange1 font-bold text-white">
                    <th className="border border-1 border-solid border-black">
                        No Telepon
                    </th>
                    <th className="border border-1 border-solid border-black">
                        Nama
                    </th>
                    <th className="border border-1 border-solid border-black">
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-1 border-solid border-black">
                        {user ? user.phone_number : "No user found"}
                    </td>
                    <td className="border border-1 border-solid border-black">
                        {user ? user.first_name : "-"}
                    </td>
                    <td className="border border-1 border-solid border-black">
                        {user ? user.email : "-"}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default UserTable;
