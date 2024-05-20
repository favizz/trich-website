

const ClientInfo = (
    {first_name, 
    last_name,
    address,
    email,
    phone_number,}
) => {
  return (
    <section className="w-full lg:w-[579px] xl:w-[759px] rounded-[10px] bg-white tracking-wider mb-10 lg:mb-0 p-10">
        <h2 className="text-3xl font-extrabold">Personal Info</h2>
        <div className="flex flex-col pt-4 space-y-4">
            <div>
            <p className="text-gray-600">Name</p>
            <p>{first_name + " " + last_name}</p>
            </div>
            <div>
            <p className="text-gray-600">Address</p>
            <p>{address}</p>
            </div>
            <div>
            <p className="text-gray-600">Email</p>
            <p>{email}</p>
            </div>
            <div>
            <p className="text-gray-600">Phone Number</p>
            <p>{phone_number}</p>
            </div>
        </div>
    </section>
  )
}

export default ClientInfo;