"use client";
import React from "react";

const UserSearchForm = ({ 
    searchUserPhone, 
    setSearchUserPhone, 
    searchUser 
}) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Search User Information</h3>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Enter phone number (e.g., +62857-1091-5241)"
                    className="border border-1 border-gray-300 p-2 rounded flex-1"
                    value={searchUserPhone}
                    onChange={(e) => setSearchUserPhone(e.target.value)}
                />
                <button
                    onClick={searchUser}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Search User
                </button>
            </div>
        </div>
    );
};

export default UserSearchForm;
