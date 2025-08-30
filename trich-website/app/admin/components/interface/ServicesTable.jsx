"use client";
import React from "react";

const ServicesTable = ({ 
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
    const dayMapping = {
        'SUN': 'SUNDAY',
        'MON': 'MONDAY', 
        'TUE': 'TUESDAY',
        'WED': 'WEDNESDAY',
        'THU': 'THURSDAY',
        'FRI': 'FRIDAY',
        'SAT': 'SATURDAY'
    };

    const reverseDayMapping = {
        'SUNDAY': 'SUN',
        'MONDAY': 'MON',
        'TUESDAY': 'TUE', 
        'WEDNESDAY': 'WED',
        'THURSDAY': 'THU',
        'FRIDAY': 'FRI',
        'SATURDAY': 'SAT'
    };

    const handleDayToggle = (day) => {
        setNewService(prev => {
            const fullDayName = dayMapping[day];
            const currentDays = Array.isArray(prev.availableDays) ? [...prev.availableDays] : [];
            const updatedDays = currentDays.includes(fullDayName)
                ? currentDays.filter(d => d !== fullDayName)
                : [...currentDays, fullDayName];
            return { ...prev, availableDays: updatedDays };
        });
    };

    const handleEditDayToggle = (day) => {
        setEditingService(prev => {
            const fullDayName = dayMapping[day];
            const currentDays = Array.isArray(prev.availableDays) ? [...prev.availableDays] : [];
            const updatedDays = currentDays.includes(fullDayName)
                ? currentDays.filter(d => d !== fullDayName)
                : [...currentDays, fullDayName];
            return { ...prev, availableDays: updatedDays };
        });
    };

    const convertDaysForAPI = (availableDays) => {
        return availableDays;
    };

    const startEditing = (service) => {
        const freshEditingData = {
            id: service.id,
            name: String(service.name || ''),
            price: String(service.price || ''),
            duration: String(service.duration || ''),
            point: String(service.point || ''),
            useAI: Boolean(service.useAI),
            startTime: String(service.startTime || ''),
            endTime: String(service.endTime || ''),
            availableDays: service.availableDays ? JSON.parse(JSON.stringify(service.availableDays)) : []
        };
        
        setEditingService(freshEditingData);
    };

    return (
        <table className="border-collapse w-full">
            <thead>
                <tr className="bg-orange1 font-bold text-white">
                    <th className="border border-1 border-solid border-black p-2 w-32">ID</th>
                    <th className="border border-1 border-solid border-black p-2 min-w-0">Name</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Price</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Duration</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Points</th>
                    <th className="border border-1 border-solid border-black p-2 w-20">Use AI</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Start Time</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">End Time</th>
                    <th className="border border-1 border-solid border-black p-2 w-32">Available Days</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Actions</th>
                </tr>
                <tr className="bg-gray-50">
                    <td className="border border-1 border-solid border-black p-2"></td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="text"
                            placeholder="Service Name"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newService.name}
                            onChange={(e) => setNewService({...newService, name: e.target.value})}
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="number"
                            placeholder="Price (Rp)"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newService.price}
                            onChange={(e) => setNewService({...newService, price: e.target.value})}
                            min="0"
                            step="0.01"
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="number"
                            placeholder="Duration (min)"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newService.duration}
                            onChange={(e) => setNewService({...newService, duration: e.target.value})}
                            min="1"
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="number"
                            placeholder="Points"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newService.point}
                            onChange={(e) => setNewService({...newService, point: e.target.value})}
                            min="0"
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="checkbox"
                            checked={newService.useAI || false}
                            onChange={(e) => setNewService({ ...newService, useAI: e.target.checked })}
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="time"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newService.startTime}
                            onChange={(e) => setNewService({...newService, startTime: e.target.value})}
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="time"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newService.endTime}
                            onChange={(e) => setNewService({...newService, endTime: e.target.value})}
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <div className="flex flex-wrap gap-1">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleDayToggle(day)}
                                    className={`px-2 py-1 text-xs rounded ${
                                        (newService.availableDays || []).includes(dayMapping[day])
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-300 text-gray-700'
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <button
                            onClick={() => {
                                const serviceWithConvertedDays = {
                                    ...newService,
                                    availableDays: convertDaysForAPI(newService.availableDays)
                                };
                                console.log('Creating service with:', serviceWithConvertedDays);
                                createService(serviceWithConvertedDays);
                            }}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                        >
                            Add Service
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                {services.length > 0 ? (
                    services.map((service, idx) => (
                        <tr key={idx}>
                            <td className="border border-1 border-solid border-black p-2">{service.id || '-'}</td>
                            <td className="border border-1 border-solid border-black p-2">{service.name}</td>
                            <td className="border border-1 border-solid border-black p-2">Rp {service.price}</td>
                            <td className="border border-1 border-solid border-black p-2">{service.duration} min</td>
                            <td className="border border-1 border-solid border-black p-2">{service.point}</td>
                            <td className="border border-1 border-solid border-black p-2 text-center">
                                <input type="checkbox" checked={service.useAI} disabled />
                            </td>
                            <td className="border border-1 border-solid border-black p-2">{service.startTime}</td>
                            <td className="border border-1 border-solid border-black p-2">{service.endTime}</td>
                            <td className="border border-1 border-solid border-black p-2">
                                <div className="flex flex-wrap gap-1">
                                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                                        <span
                                            key={day}
                                            className={`px-2 py-1 text-xs rounded ${
                                                isDaySelected(day, service.availableDays)
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-300 text-gray-700'
                                            }`}
                                        >
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="border border-1 border-solid border-black p-2">
                                <div className="flex gap-1">
                                    {editingService?.id === service.id ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    const serviceWithConvertedDays = {
                                                        ...editingService,
                                                        availableDays: convertDaysForAPI(editingService.availableDays)
                                                    };
                                                    updateService(serviceWithConvertedDays.id, serviceWithConvertedDays);
                                                }}
                                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                title="Save"
                                            >
                                                💾
                                            </button>
                                            <button
                                                onClick={() => setEditingService(null)}
                                                className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                title="Cancel"
                                            >
                                                ❌
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    console.log('Original service availableDays:', service.availableDays);
                                                    startEditing(service);
                                                }}
                                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => deleteService(service.id)}
                                                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="10" className="text-center p-4 text-gray-500 bg-gray-50">
                            No services available
                        </td>
                    </tr>
                )}
                
                {editingService && (
                    <tr className="bg-yellow-50">
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="text"
                                value={editingService.id || ""}
                                className="w-full p-1 text-sm"
                                disabled
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="text"
                                value={editingService.name || ""}
                                onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                                className="w-full p-1 text-sm"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="number"
                                value={editingService.price || ""}
                                onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                                className="w-full p-1 text-sm"
                                min="0"
                                step="0.01"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="number"
                                value={editingService.duration || ""}
                                onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                                className="w-full p-1 text-sm"
                                min="1"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="number"
                                value={editingService.point || ""}
                                onChange={(e) => setEditingService({...editingService, point: e.target.value})}
                                className="w-full p-1 text-sm"
                                min="0"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2 text-center">
                            <input
                                type="checkbox"
                                checked={editingService.useAI || false}
                                onChange={(e) => setEditingService({ ...editingService, useAI: e.target.checked })}
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="time"
                                value={editingService.startTime || ""}
                                onChange={(e) => setEditingService({...editingService, startTime: e.target.value})}
                                className="w-full p-1 text-sm"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="time"
                                value={editingService.endTime || ""}
                                onChange={(e) => setEditingService({...editingService, endTime: e.target.value})}
                                className="w-full p-1 text-sm"
                            />
                        </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <div className="flex flex-wrap gap-1">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => {
                                const isSelected = editingService?.availableDays?.includes(dayMapping[day]);
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => handleEditDayToggle(day)}
                                        className={`px-2 py-1 text-xs rounded ${
                                            isSelected
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-300 text-gray-700'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <div className="flex gap-1">
                                <button
                                    onClick={() => {
                                        const serviceWithConvertedDays = {
                                            ...editingService,
                                            availableDays: convertDaysForAPI(editingService.availableDays)
                                        };
                                        console.log('Sending to API:', serviceWithConvertedDays);
                                        updateService(editingService.id, serviceWithConvertedDays);
                                    }}
                                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                    title="Save"
                                >
                                    💾
                                </button>
                                <button
                                    onClick={() => setEditingService(null)}
                                    className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                    title="Cancel"
                                >
                                    ❌
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ServicesTable;