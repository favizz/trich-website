"use client";
import React from "react";

const UserDisplayCard = ({ searchedUser, searchError }) => {
    if (searchError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{searchError}</p>
            </div>
        );
    }

    if (!searchedUser) {
        return null;
    }

    return (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 ">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">User Information</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <p className="text-gray-900 bg-white p-2 rounded border">{searchedUser.phoneNumber}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900 bg-white p-2 rounded border">{searchedUser.name}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                    <p className="text-gray-900 bg-white p-2 rounded border">{searchedUser.point}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    <p className={`text-white p-2 rounded border ${searchedUser.member ? 'bg-green-600' : 'bg-red-600'}`}>
                        {searchedUser.member ? 'Active Member' : 'Not a Member'}
                    </p>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Expiration Date</label>
                    <p className="text-gray-900 bg-white p-2 rounded border">
                        {searchedUser.memberExpirationDate ? searchedUser.memberExpirationDate : 'Not set'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDisplayCard;
