"use client";
import { useState, useEffect } from "react";
import { getConfigQuotas, updateConfigQuota } from "@/utils/quota";

const QuotaConfig = () => {
    const [quotas, setQuotas] = useState({ quota_base: "", quota_wd: "" });
    const [wdQuota, setWdQuota] = useState("");
    const [baseQuota, setBaseQuota] = useState("");

    useEffect(() => {
        const fetchQuotas = async () => {
            const data = await getConfigQuotas();
            if (data) {
                setQuotas(data);
                setWdQuota(data.quota_wd);
                setBaseQuota(data.quota_base);
            }
        };
        fetchQuotas();
    }, []);

    const handleUpdateQuota = async (type, value) => {
        if (!value) {
            alert("Please enter a valid quota number");
            return;
        }
        try {
            await updateConfigQuota(type, parseInt(value, 10));
            alert(`Successfully updated ${type} quota to ${value}`);
            setQuotas((prev) => ({
                ...prev,
                [type === "wd" ? "quota_wd" : "quota_base"]: value,
            }));
        } catch (error) {
            console.error("Error updating quota:", error);
            alert("Failed to update quota");
        }
    };

    return (
        <>
            <form
                className="flex flex-row space-x-2 pb-3"
                onSubmit={(e) => e.preventDefault()} // Prevent reload
            >
                <input
                    type="number"
                    placeholder={`Current Value: ${quotas.quota_wd}`}
                    className="border border-1 border-orange1"
                    value={wdQuota}
                    onChange={(e) => setWdQuota(e.target.value)}
                />
                <button
                    className="px-4 bg-orange1 text-white"
                    onClick={() => handleUpdateQuota("wd", wdQuota)}
                    type="button"
                >
                    Set WD Quota
                </button>
            </form>

            <form
                className="flex flex-row space-x-2 pb-3"
                onSubmit={(e) => e.preventDefault()} // Prevent reload
            >
                <input
                    type="number"
                    placeholder={`Current Value: ${quotas.quota_base}`}
                    className="border border-1 border-orange1"
                    value={baseQuota}
                    onChange={(e) => setBaseQuota(e.target.value)}
                />
                <button
                    className="px-4 bg-orange1 text-white"
                    onClick={() => handleUpdateQuota("base", baseQuota)}
                    type="button"
                >
                    Set Base Quota
                </button>
            </form>
        </>
    );
};

export default QuotaConfig;
