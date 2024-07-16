"use client";
import { useState } from "react";
import Link from "next/link";

const Form = ({ ketentuan, cara }) => {
  const [isOpen, toggleOpen] = useState(false);
  
  return (
    <>
      {!isOpen && (
        <section className="flex flex-col bg-white rounded-lg mx-4 md:mx-0 px-4 py-8 shadow-xl mt-32 tracking-wider mb-64 space-y-2">
          <h2 className="text-center font-extrabold text-lg lg:text-3xl">
            KETENTUAN UMUM
          </h2>
          <ul className="">
            {ketentuan.map((k, idx) => {
              return <li key={idx}>{k}</li>;
            })}
          </ul>
          <div className="flex flex-row text-white space-x-3">
            <div className="w-1/2 flex items-center justify-center bg-orange1 rounded-md py-2">
              <Link href="/">Batal</Link>
            </div>
            <div
              onClick={() => toggleOpen(true)}
              className="w-1/2 flex items-center justify-center bg-green2 rounded-md py-2"
            >
              Lanjutkan
            </div>
          </div>
        </section>
      )}
      {isOpen && (
        <section className="flex flex-col bg-white rounded-lg mx-4 md:mx-0 px-4 py-8 shadow-xl mt-32 tracking-wider mb-64 space-y-2">
          <h2 className="text-center font-extrabold text-lg lg:text-3xl">
            CARA PEMAKAIAN
          </h2>
          <ul className="space-y-1">
            {cara.map((c, idx) => {
              return <li key={idx}>{c}</li>;
            })}
          </ul>
          <div className="flex flex-row text-white space-x-3">
            <div 
            onClick={() => toggleOpen(false)}
            className="w-1/2 flex items-center justify-center bg-orange1 rounded-md py-2">
              Kembali
            </div>
            <div
              className="w-1/2 flex items-center justify-center bg-green2 rounded-md py-2"
            >
              <Link href="/reservation">Lanjutkan</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Form;
