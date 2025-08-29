"use client";
import React from "react";

const BarbersTable = ({ 
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
        <table className="border-collapse w-full">
            <thead>
                <tr className="bg-orange1 font-bold text-white">
                    <th className="border border-1 border-solid border-black p-2 w-32">ID</th>
                    <th className="border border-1 border-solid border-black p-2 min-w-0">Name</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Chair Number</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Available</th>
                    <th className="border border-1 border-solid border-black p-2 w-12">Actions</th>
                </tr>
                <tr className="bg-gray-50">
                    <td className="border border-1 border-solid border-black p-2"></td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="text"
                            placeholder="Barber Name"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newBarber.name}
                            onChange={(e) => setNewBarber({...newBarber, name: e.target.value})}
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="number"
                            placeholder="Chair #"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newBarber.chairNumber}
                            onChange={(e) => setNewBarber({...newBarber, chairNumber: e.target.value})}
                            min="1"
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <select
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={newBarber.available}
                            onChange={(e) => setNewBarber({...newBarber, available: e.target.value === 'true'})}
                        >
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <button
                            onClick={createBarber}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                        >
                            Add Barber
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                {barbers.length > 0 ? (
                    barbers.map((barber, idx) => (
                        <tr key={idx}>
                            <td className="border border-1 border-solid border-black p-2">{barber.id || '-'}</td>
                            <td className="border border-1 border-solid border-black p-2">{barber.name}</td>
                            <td className="border border-1 border-solid border-black p-2">{barber.chairNumber}</td>
                            <td className="border border-1 border-solid border-black p-2">
                                <span className={`px-2 py-1 text-xs rounded ${
                                    barber.available ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                                }`}>
                                    {barber.available ? 'Available' : 'Not Available'}
                                </span>
                            </td>
                            <td className="border border-1 border-solid border-black p-2">
                                <div className="flex gap-1">
                                    {editingBarber?.id === barber.id ? (
                                        <>
                                            <button
                                                onClick={() => updateBarber(barber.id)}
                                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                title="Save"
                                            >
                                                💾
                                            </button>
                                            <button
                                                onClick={() => setEditingBarber(null)}
                                                className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                title="Cancel"
                                            >
                                                ❌
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditingBarber(barber)}
                                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => deleteBarber(barber.id)}
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
                        <td colSpan="5" className="text-center p-4 text-gray-500 bg-gray-50">
                            No barbers available
                        </td>
                    </tr>
                )}
                
                {editingBarber && (
                    <tr className="bg-yellow-50">
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="text"
                                value={editingBarber.id || ""}
                                className="w-full p-1 text-sm"
                                disabled
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="text"
                                value={editingBarber.name || ""}
                                onChange={(e) => setEditingBarber({...editingBarber, name: e.target.value})}
                                className="w-full p-1 text-sm"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <input
                                type="number"
                                value={editingBarber.chairNumber || ""}
                                onChange={(e) => setEditingBarber({...editingBarber, chairNumber: e.target.value})}
                                className="w-full p-1 text-sm"
                                min="1"
                            />
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <select
                                className="border border-1 border-orange1 p-1 w-full text-sm"
                                value={editingBarber.available}
                                onChange={(e) => setEditingBarber({...editingBarber, available: e.target.value === 'true'})}
                            >
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                        </td>
                        <td className="border border-1 border-solid border-black p-2">
                            <div className="flex gap-1">
                                <button
                                    onClick={() => updateBarber(editingBarber.id)}
                                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                    title="Save"
                                >
                                    💾
                                </button>
                                <button
                                    onClick={() => setEditingBarber(null)}
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

export default BarbersTable;
