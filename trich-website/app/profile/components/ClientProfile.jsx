"use client";
import { useState, useEffect } from "react";
import { getNonAuthUser } from "@/utils/non-auth-user";
import Spinner from "@/app/components/Spinner";

const ClientProfile = ({ phone }) => {
    const [user, setUser] = useState(null);
    const [isLoading, toggleLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            toggleLoading(true);
            const response = await getNonAuthUser(phone);
            if (response.success) {
                setUser(response.user);
            } else {
                console.error("Failed to fetch user data");
            }
            toggleLoading(false);
        };

        if (phone) {
            fetchUser();
        }
    }, [phone]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-0.5 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
                {isLoading ? (
                    <Spinner isLoading={isLoading} />
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-2">Profile</h2>
                        <p className="text-gray-500 mb-4">
                            Your account details
                        </p>

                        <div className="text-left w-full">
                            <p className="text-lg font-medium">Name:</p>
                            <p className="text-gray-700 mb-2">
                                {user?.first_name}
                            </p>

                            <p className="text-lg font-medium">Phone Number:</p>
                            <p className="text-gray-700 mb-2">
                                {user?.phone_number}
                            </p>

                            <p className="text-lg font-medium">Points:</p>
                            <p className="text-gray-700 mb-4">{user?.points}</p>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                            Redeem Points
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientProfile;
