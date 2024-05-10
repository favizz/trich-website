"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/config/firebase";
import { useAuth } from "@/authContext/AuthProvider";
import { signOut } from "firebase/auth";

import NavbarLogoWhite from "@/public/components/navbar_components/NavbarLogoWhite.svg";
import NavbarLogoBlack from "@/public/components/navbar_components/NavbarLogoBlack.svg";
import UserIcon from "@/public/components/navbar_components/UserIcon.png";
import UserIMG from "@/public/components/navbar_components/UserImg.png";

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
    <nav className="bg-transparent text-white py-9 lg:pl-16 lg:pr-24 xl:pl-24 xl:pr-36 fixed w-full z-50">
      <div className="flex justify-between items-center">
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
        <ul className="hidden md:flex space-x-4">
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
            <Link href="/reservation">
              <button className="bg-orange1 hover:bg-orange-300 text-white font-normal lg:text-[12px] xl:text-base py-2 px-6 rounded">
                Book Now
              </button>
            </Link>
            <div className="relative">
              <div className="cursor-pointer" onClick={toggleDropdown}>
                <Image src={UserIMG} width={40} alt="user-Image" />
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
    </nav>
  );
};

export default Navbar;

{
  /* <header className="h-20 bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-60/60 flex px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0)] text-black">
      <nav className="w-full mx-auto flex justify-between items-center px-2 text-black font-serif text-xl">
        <Link href={HOME_ROUTE}>
          <p className="text-black">Logo</p>
        </Link>
        <ul className="flex gap-4">
          {!userLoggedIn && (
            <>
              <Link href={LOGIN_ROUTE}>
                <p className="text-black">Login</p>
              </Link>
              <Link href={REGISTER_ROUTE}>
                <p className="text-black">Register</p>
              </Link>
            </>
          )}
          {userLoggedIn && (
            <>
              <Link href={PROFILE_ROUTE}>
                <p className="text-black">Profile</p>
              </Link>
              <li className="cursor-pointer" onClick={SignOut}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header> */
}
