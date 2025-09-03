import { Crown } from "lucide-react";

const ClientInfo = ({ first_name, phone_number, isMember, memberExpirationDate }) => {
  // Format date if available
  const formattedDate = memberExpirationDate 
    ? new Date(memberExpirationDate).toLocaleDateString("en-US", { 
        year: "numeric", month: "long", day: "numeric" 
      }) 
    : null;

  return (
    <section className="w-full rounded-[10px] bg-white tracking-wider mb-10 lg:mb-0 px-4 py-10 lg:px-10 text-left">
      <div className="flex">
        <div className="flex-grow">
          <h2 className="text-3xl font-extrabold">Personal Info</h2>
          <div className="flex flex-col pt-4 space-y-4">
            {/* Name */}
            <div>
              <p className="text-gray-600">Name</p>
              <div className="flex items-center space-x-2">
                {isMember && <Crown className="w-5 h-5 text-orange-500" />}
                <p className={isMember ? "text-orange-500 font-semibold" : ""}>
                  {first_name}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <p className="text-gray-600">Phone Number</p>
              <p>{phone_number}</p>
              {isMember && formattedDate && (
                <p className="text-sm text-gray-500">
                  Membership valid until: {formattedDate}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-48" />
      </div>
    </section>
  );
};

export default ClientInfo;
