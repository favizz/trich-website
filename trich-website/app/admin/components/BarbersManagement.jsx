"use client";
import React from "react";
import BarbersTable from "./interface/BarbersTable";

const BarbersManagement = ({ 
    barbers, 
    newBarber, 
    setNewBarber, 
    editingBarber, 
    setEditingBarber,
    createBarber,
    updateBarber,
    deleteBarber
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-orange1 text-white px-6 py-2 rounded-t-lg">
                <h2 className="text-xl font-semibold">Barbers Management</h2>
            </div>
            <div className="p-6">
                <BarbersTable 
                    barbers={barbers}
                    newBarber={newBarber}
                    setNewBarber={setNewBarber}
                    editingBarber={editingBarber}
                    setEditingBarber={setEditingBarber}
                    createBarber={createBarber}
                    updateBarber={updateBarber}
                    deleteBarber={deleteBarber}
                />
            </div>
        </div>
    );
};

export default BarbersManagement;
