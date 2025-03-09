const ClientInfo = ({ first_name, phone_number }) => {
  return (
    <section className="w-full lg:w-[579px] xl:w-[759px] rounded-[10px] bg-white tracking-wider mb-10 lg:mb-0 px-4 py-10 lg:px-10 text-left">
      <div className="flex">
        <div className="flex-grow">
          <h2 className="text-3xl font-extrabold">Personal Info</h2>
          <div className="flex flex-col pt-4 space-y-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p>{first_name}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone Number</p>
              <p>{phone_number}</p>
            </div>
          </div>
        </div>
        {/* This div acts as a gap on the right */}
        <div className="w-48" />
      </div>
    </section>
  );
};

export default ClientInfo;
