"use client";
import React from "react";

const QuotaControls = ({ 
    wdQuotaValue, 
    setWdQuotaValue, 
    baseQuotaValue, 
    setBaseQuotaValue,
    setWdQuota,
    setBaseQuota
}) => {
    return (
        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <h4 className="font-semibold mb-2">WD Quota</h4>
                <p className="text-sm text-gray-600 mb-3">Set weekday quota value</p>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Enter WD quota value"
                        className="border border-1 border-orange1 p-2 rounded flex-1"
                        value={wdQuotaValue}
                        onChange={(e) => setWdQuotaValue(e.target.value)}
                        min="1"
                    />
                    <button
                        onClick={setWdQuota}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Set WD Quota
                    </button>
                </div>
            </div>
            
            <div>
                <h4 className="font-semibold mb-2">Default Quota</h4>
                <p className="text-sm text-gray-600 mb-3">Set default quota value</p>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Enter default quota value"
                        className="border border-1 border-orange1 p-2 rounded flex-1"
                        value={baseQuotaValue}
                        onChange={(e) => setBaseQuotaValue(e.target.value)}
                        min="1"
                    />
                    <button
                        onClick={setBaseQuota}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Set Default Quota
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuotaControls;
