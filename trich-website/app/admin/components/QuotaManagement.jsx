"use client";
import React from "react";
import QuotaControls from "./interface/QuotaControls";
import QuotaTable from "./interface/QuotaTable";

const QuotaManagement = ({ 
    wdQuotaValue, 
    setWdQuotaValue, 
    baseQuotaValue, 
    setBaseQuotaValue,
    quotaDate,
    setQuotaDate,
    quotaQuota,
    setQuotaQuota,
    quotas,
    setWdQuota,
    setBaseQuota,
    handleAddQuota,
    handleDeleteQuota
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-orange1 text-white px-6 py-2 rounded-t-lg">
                <h2 className="text-xl font-semibold">Enhanced Quota Management</h2>
            </div>
            <div className="p-6">
                <QuotaControls 
                    wdQuotaValue={wdQuotaValue}
                    setWdQuotaValue={setWdQuotaValue}
                    baseQuotaValue={baseQuotaValue}
                    setBaseQuotaValue={setBaseQuotaValue}
                    setWdQuota={setWdQuota}
                    setBaseQuota={setBaseQuota}
                />
                <div>
                    <h4 className="font-semibold mb-2">Custom Quotas</h4>
                    <QuotaTable 
                        quotaDate={quotaDate}
                        setQuotaDate={setQuotaDate}
                        quotaQuota={quotaQuota}
                        setQuotaQuota={setQuotaQuota}
                        quotas={quotas}
                        handleAddQuota={handleAddQuota}
                        handleDeleteQuota={handleDeleteQuota}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuotaManagement;
