"use client";
import { useState, useEffect } from "react";
import { getUserData } from "@/utils/user";
import Spinner from "@/app/components/Spinner";

const ClientProfile = ({ page }) => {
    const [user, setUser] = useState(null);
    const [isLoading, toggleLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            toggleLoading(true);
            const response = await getUserData();
            if (response.success) {
                setUser(response.user);
            } else {
                console.error(response.error);
            }
            toggleLoading(false);
        };

        if (page === 3) {
            fetchUser();
        }
    }, []);

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

                        {!user ? (
                            <p>You dont have an account</p>
                        ) : (
                            <div className="text-left w-full">
                                <p className="text-lg font-medium">Name:</p>
                                <p className="text-gray-700 mb-2">
                                    {user?.first_name}
                                </p>

                                <p className="text-lg font-medium">
                                    Phone Number:
                                </p>
                                <p className="text-gray-700 mb-2">
                                    {user?.phone_number}
                                </p>

                                <p className="text-lg font-medium">Points:</p>
                                <p className="text-gray-700 mb-4">
                                    {user?.points || 0}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientProfile;
