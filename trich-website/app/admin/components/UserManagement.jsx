"use client";
import React from "react";
import UserSearchForm from "./interface/UserSearchForm";
import UserDisplayCard from "./interface/UserDisplayCard";

const UserManagement = ({ 
    searchUserPhone, 
    setSearchUserPhone, 
    searchedUser, 
    searchError, 
    searchUser 
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm ">
            <div className="bg-orange1 text-white px-6 py-2 rounded-t-lg">
                <h2 className="text-xl font-semibold">User Management</h2>
            </div>
            <div className="p-6">
                <UserSearchForm 
                    searchUserPhone={searchUserPhone}
                    setSearchUserPhone={setSearchUserPhone}
                    searchUser={searchUser}
                />
                <UserDisplayCard 
                    searchedUser={searchedUser}
                    searchError={searchError}
                />
            </div>
        </div>
    );
};

export default UserManagement;
