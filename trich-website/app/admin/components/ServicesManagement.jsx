"use client";
import React from "react";
import ServicesTable from "./interface/ServicesTable";

const ServicesManagement = ({ 
    services, 
    newService, 
    setNewService, 
    editingService, 
    setEditingService,
    createService,
    updateService,
    deleteService,
    isDaySelected
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-orange1 text-white px-6 py-2 rounded-t-lg">
                <h2 className="text-xl font-semibold">Services Management</h2>
            </div>
            <div className="p-6">
                <ServicesTable 
                    services={services}
                    newService={newService}
                    setNewService={setNewService}
                    editingService={editingService}
                    setEditingService={setEditingService}
                    createService={createService}
                    updateService={updateService}
                    deleteService={deleteService}
                    isDaySelected={isDaySelected}
                />
            </div>
        </div>
    );
};

export default ServicesManagement;
