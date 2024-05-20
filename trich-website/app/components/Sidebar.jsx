import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CloseIcon from "@/public/components/navbar_components/closeicon.svg"

const Sidebar = ({ paths, isOpen, toggleSidebar, pathname }) => {

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-green2 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <button
        className="text-white p-8"
        onClick={() => toggleSidebar(!isOpen)}
      >
        <Image width={20} src={CloseIcon} alt='close-icon'/>
      </button>
      <ul className="mt-4 space-y-4">
        {paths.map((path, idx) => (
          <li key={idx} onClick={toggleSidebar}>
            <Link href={path.url}>
              <p
                className={`block px-8 py-2 font-bold text-xl rounded hover:bg-gray-700 ${
                  pathname === path.url ||
                  pathname?.split('/')[1] === path.name.toLowerCase()
                    ? 'text-orange-500 underline'
                    : 'text-white'
                }`}
              >
                {path.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
