"use client";
import React from "react";

const QuotaTable = ({ 
    quotaDate,
    setQuotaDate,
    quotaQuota,
    setQuotaQuota,
    quotas,
    handleAddQuota,
    handleDeleteQuota
}) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-orange1 font-bold text-white">
                    <th className="border border-1 border-solid border-black p-2 w-32">Quota ID</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Date</th>
                    <th className="border border-1 border-solid border-black p-2 w-24">Quota</th>
                    <th className="border border-1 border-solid border-black p-2 w-12">Actions</th>
                </tr>
                <tr className="bg-gray-50">
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="text"
                            placeholder="Auto-generated"
                            className="border border-1 border-gray-300 p-1 w-full text-sm bg-gray-100"
                            disabled
                            readOnly
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="date"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={quotaDate}
                            onChange={(e) => setQuotaDate(e.target.value)}
                            placeholder="Select Date"
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <input
                            type="number"
                            placeholder="Quota Value"
                            className="border border-1 border-orange1 p-1 w-full text-sm"
                            value={quotaQuota}
                            onChange={(e) => setQuotaQuota(e.target.value)}
                            min="1"
                        />
                    </td>
                    <td className="border border-1 border-solid border-black p-2">
                        <button
                            onClick={handleAddQuota}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full"
                        >
                            Add Custom Quota
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                {quotas.length > 0 ? (
                    quotas.map((quota, idx) => (
                        <tr key={idx}>
                            <td className="border border-1 border-solid border-black p-2">
                                {quota.quota_id || '-'}
                            </td>
                            <td className="border border-1 border-solid border-black p-2">
                                {quota.date ? quota.date : "-"}
                            </td>
                            <td className="border border-1 border-solid border-black p-2">
                                {quota.quota}
                            </td>
                            <td className="border border-1 border-solid border-black p-2">
                                <button
                                    onClick={() => handleDeleteQuota(quota.quota_id)}
                                    className="w-full px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500 bg-gray-50">
                            No custom quotas available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default QuotaTable;
