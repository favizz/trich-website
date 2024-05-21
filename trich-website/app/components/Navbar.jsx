"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/config/firebase";
import { useAuth } from "@/authContext/AuthProvider";
import { signOut } from "firebase/auth";
import Sidebar from "./Sidebar";

import NavbarLogoWhite from "@/public/components/navbar_components/NavbarLogoWhite.svg";
import NavbarLogoBlack from "@/public/components/navbar_components/NavbarLogoBlack.svg";
import UserIcon from "@/public/components/navbar_components/userimage.png";
import SideBarIcon from "@/public/components/navbar_components/sidebaricon.svg";

const paths = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Services",
    url: "/services",
  },
  {
    name: "About Us",
    url: "/about-us",
  },
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Barbers",
    url: "/barbers",
  },
];

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const { userLoggedIn, currentUser, setCurrentUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const SignOut = async () => {
    await signOut(auth)
      .then((response) => {
        router.push("/sign-in");
      })
      .catch((e) => {
        console.log("Logout Catch ", e.message);
      });
  };

  const toggleDropdown = () => {
    setUserOpen(!isUserOpen);
  };

  const navColor = () => {
    return (
      pathname?.split("/")[1] === "sign-in" ||
      pathname?.split("/")[1] === "sign-up" ||
      pathname?.split("/")[1] === "dashboard"
    );
  };

  return (
    <nav className="bg-transparent text-white px-8 py-9 lg:pl-16 pr-6 lg:pr-24 xl:pl-24 xl:pr-36 w-full absolute top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Sidebar Icon */}
        <Image
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          src={SideBarIcon}
          width={25}
          alt="sidebar-icon"
          className="lg:hidden"
        />

        {/* Logo on the left */}
        {navColor() ? (
          <div className="flex items-center">
            <Link href="/">
              <Image src={NavbarLogoBlack} alt="Logo-Black" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <Link href="/">
              <Image src={NavbarLogoWhite} alt="Logo-White" />
            </Link>
          </div>
        )}

        {/* Navigation links in the center */}
        <ul className="hidden lg:flex space-x-4">
          {paths.map((path, idx) => {
            return (
              <li key={idx}>
                <Link
                  href={path.url}
                  className={
                    pathname === path.url ||
                    pathname?.split("/")[1] === path.name.toLowerCase()
                      ? "text-orange1 underline"
                      : ""
                  }
                >
                  <p
                    className={`hover:text-orange1 hover:underline lg:text-lg xl:text-xl lg:tracking-wider font-extrabold ${
                      navColor() ? "text-black" : ""
                    }`}
                  >
                    {path.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* "Book Now" button and user icon on the right */}
        {userLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link href="/reservation" className="hidden md:flex">
              <button className="bg-orange1 hover:bg-orange-300 text-white font-normal text-[10px] lg:text-[12px] xl:text-base py-2 px-6 rounded">
                Book Now
              </button>
            </Link>
            <div className="relative">
              <div className="cursor-pointer" onClick={toggleDropdown}>
                <Image src={UserIcon} width={40} alt="user-Image" />
              </div>

              {isUserOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link href="/dashboard">
                      <p
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={toggleDropdown}
                      >
                        Profile
                      </p>
                    </Link>
                    <p
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => {
                        toggleDropdown();
                        SignOut();
                      }}
                    >
                      Sign Out
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link href="/sign-in">
            <button className="bg-orange1 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>

      {/* Sidebar Component */}
      <Sidebar
        paths={paths}
        isOpen={isSidebarOpen}
        toggleSidebar={setSidebarOpen}
        pathname={pathname}
      />
    </nav>
  );
};

export default Navbar;
