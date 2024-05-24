"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiCloudMoon, CiLight, CiMenuBurger } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [theme, setTheme] = useState("light");
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="bg-white">
      <div className=" max-w-screen-xl ">
        <div className=" fixed flex h-16 z-40  w-screen items-center justify-between pr-5 pl-5 shadow-lg  bg-[--background-color-Menu]  text-[--text-color]">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block" href="/">
              <Image
                src={"/images/logo.png"}
                width={100}
                height={100}
                quality={100}
                priority={true}
                alt={"Logo"}
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm ">
                <li className="text-[--nav-color] transition hover:scale-110 p-3 rounded-md cursor-pointer">
                  <Link id="About" href="#Contact">
                    {" "}
                    About{" "}
                  </Link>
                </li>

                <li className="text-[--nav-color] transition  hover:scale-110   p-3 rounded-md cursor-pointer">
                  <Link href="#PrimaryClient"> Client </Link>
                </li>

                <li className="text-[--nav-color] transition  hover:scale-110  p-3 rounded-md cursor-pointer">
                  <Link href="#"> Buy </Link>
                </li>

                <li className="text-[--nav-color] transition  hover:scale-110  p-3 rounded-md cursor-pointer">
                  <Link href="#CarCatalogue"> Car Catalogue </Link>
                </li>

                <li className="text-[--nav-color] transition  hover:scale-110  p-3 rounded-md cursor-pointer">
                  <Link href="#"> Blog </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div>
              {theme === "light" ? (
                <button onClick={toggleTheme}>
                  <CiLight size={"30px"} className=" text-white" />
                </button>
              ) : (
                <button>
                  <CiCloudMoon
                    onClick={toggleTheme}
                    size={"30px"}
                    className=" text-white"
                  />
                </button>
              )}
            </div>
            <div className="sm:flex  text-white mr-3 ">
            <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn >
                <UserButton />
              </SignedIn>
            </div>
            {/* Humburger Icon for max-md screen devices and below */}



            <div className="block relative md:hidden" ref={dropdownRef}>
              <button
                className={`rounded bg-[--buttons-color]  hover:bg-[--buttons-color-hovered]  p-2 text-gray-600 transition hover:text-gray-600/75 `}
                onClick={toggleMenu}
              >
                <CiMenuBurger />
              </button>

              {/* Phone Menu */}
              <div
                className={` ${
                  isMenuVisible ? "block" : "hidden"
                }  absolute top-12 -right-5  w-[250px] md:w-[250px] flex flex-col justify-between border-e rounded-lg shadow-lg bg-[--background-color-Menu] text-gray-500 border-solid border-gray-400`}
              >
                <div className="px-4 py-6 relative">
                  <div
                    className=" absolute top-5 right-4 "
                    onClick={toggleMenu}
                  >
                    <IoMdCloseCircle size={"1.5rem"} />
                  </div>

                  <span className="grid h-10 w-32 place-content-center mx-auto py-6   rounded-lg">
                    <Image
                      src={"/images/logo.png"}
                      width={100}
                      height={100}
                      quality={100}
                      priority={true}
                      alt={"Logo"}
                    />
                  </span>

                  <ul className="mt-6 space-y-1">
                    <li>
                      <Link
                        href="/"
                        className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                      >
                        Landing Page
                      </Link>
                    </li>

                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="text-sm font-medium"> Cars </span>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowUp />
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          <li>
                            <Link
                              href="#"
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Search Car
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>

                    <li>
                      <Link
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Billing
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Blogs
                      </Link>
                    </li>

                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="text-sm font-medium"> Account </span>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowUp />
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          <li>
                            <Link
                              href="#"
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Favorite
                            </Link>
                          </li>

                          <li>
                            <form action="#">
                              <button
                                type="submit"
                                className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                              >
                                Logout
                              </button>
                            </form>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100  ">
                  <a
                    href="#"
                    className="flex items-center gap-2 p-4 hover:bg-gray-50 bg-[--background-color-Menu] text-gray-500 "
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="size-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-xs">
                        <strong className="block font-medium">
                          Eric Frusciante
                        </strong>

                        <span> eric@frusciante.com </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
