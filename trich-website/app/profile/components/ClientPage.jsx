"use client";
import { useState, useEffect } from "react";
import ClientForm from "./ClientForm";
import ClientProfile from "./ClientProfile";

const ClientPage = () => {
    const [page, setPage] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        console.log(page, phoneNumber);
    }, [page]);

    return (
        <>
            {page === 1 && (
                <ClientForm getPhoneNumber={setPhoneNumber} setPage={setPage} />
            )}
            {page === 2 && <ClientProfile phone={`${phoneNumber}`} />}
        </>
    );
};

export default ClientPage;
