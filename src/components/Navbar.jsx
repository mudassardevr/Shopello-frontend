import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiChevronDown } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdOutlinePerson } from "react-icons/md";
import { Menu, X } from "lucide-react";

// import Lottie from "lottie-react";
// import hamburgurLogo from "../assets/hamburger_logo.json";

const menuItems = [
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "Music",
  "TV & Home",
  "Accessories",
];
const menuItems2 = [
  "iPad",
  "Mac",
  "Watch",
  "pads",
  "Pcs",
  "shoes",
  "Pens",
  "accessories",
  "belts",
  "Caps",
  "Screen",
  "Brush",
  "pencil",
  "Tables",
  "Rocks",
];

function Navbar() {
  let isAdmin = false;
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.user.isAdmin;
    } catch (error) {
      console.log(error);
    }
  }

  //  // NAVBAR SCROLL ANIMATION
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near top
      if (currentScrollY < 100) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // DISABLE SCROLLING WHEN NAVBAR THERE FOR MOBILE
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  //SEARCHING MOVING TO SEARCH.JSX
  const handleSearch = () => {
    if (!search.trim()) return;

    setIsOpen(false); // Close mobile sidebar

    navigate(`/search?q=${search}`);
  };

  //   console.log(hamburgurLogo);
  //   console.log(Lottie);
  // console.log(typeof Lottie);

  return (
    <>
      <header
        className={`bg-[#b5d4f4] fixed top-0 left-0 w-full z-50 shadow transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"} `}
      >
        <nav className="bg-[#85b7eb]">
          <div className="flex-icenter justify-between p-4  max-w-center">
            {/* HAMBURGER FOR MOBLIE */}
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              {/* <Menu size={28} className="hover:cursor-pointer" /> */}
              {/* <Lottie animationData={hamburgurLogo} loop={false} className="h-7.5 w-7.5" /> */}
              <lord-icon
                src="/menu_logo.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                className="hover:cursor-pointer"
              ></lord-icon>
            </button>

            {/* LOGO */}
            <Link to="/">
              <img
                className="h-12.5"
                src="/shopello_horizontal.svg"
                alt="shopello logo"
                onClick={() => {
                  window.location.href = "/";
                }}
              />
            </Link>

            {/* SEARCH BAR for pc */}
            <div className="relative p-4 w-3xl md:flex hidden">
              <FiSearch className="h-4 w-4 absolute left-7 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full pl-9 pr-4 px-4 py-2 bg-gray-100 rounded-full outline-none text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* SHOP */}
            <div className="flex-icenter gap-4">
              <Link to="/wishlist">
                <lord-icon
                  src="/wishlist_heart.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                  className="hover:cursor-pointer"
                ></lord-icon>
              </Link>
              <Link to="/cart">
                {/* <MdOutlineShoppingBag className="h-7.5 w-7.5" /> */}
                <lord-icon
                  src="/cart_logo.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                  className="hover:cursor-pointer"
                ></lord-icon>
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
              >
                <lord-icon
                  src="/profile.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                  className="md:flex hidden hover:cursor-pointer"
                ></lord-icon>
              </Link>
            </div>
          </div>
        </nav>

        {/* MENU LIST FOR PC */}
        {/* <div className="max-w-center hidden md:block">
          <ul className="flex items-center justify-evenly text-sm p-2 gap-2">
            {menuItems2.map((menuItems2) => (
              <li
                key={menuItems2}
                className="text-gray-600 hover:cursor-pointer hover:underline"
              >
                {menuItems2}
              </li>
            ))}
          </ul>
        </div> */}
      </header>

      {/* MENU HAMBURGER list for Mobile { */}
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => setIsOpen(false)}>
            {/* <X size={28} className="hover:cursor-pointer" /> */}
            <lord-icon
              src="/cross_logo.json"
              trigger="hover"
              style={{ width: "30px", height: "30px" }}
              className="hover:cursor-pointer"
            ></lord-icon>
          </button>

          <img
            className="h-8"
            src="/shopello_horizontal.svg"
            alt="shopello logo"
          />
        </div>

        {/* Search Bar */}
        <div className="relative p-4 border-b border-gray-300">
          <FiSearch className="h-4 w-4 absolute left-7 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full pl-9 pr-4 px-4 py-2 bg-gray-100 rounded-full outline-none text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Menu */}
        {/* <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => navigate(`/category/${item}`)}
              className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul> */}
        {/* Admin menu */}
        <div>
          {isAdmin && (
            <>
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="block p-3 border-b"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/products"
                onClick={() => setMenuOpen(false)}
                className="block p-3 border-b"
              >
                Products
              </Link>

              <Link
                to="/admin/orders"
                onClick={() => setMenuOpen(false)}
                className="block p-3 border-b"
              >
                Orders
              </Link>
            </>
          )}
        </div>

        <div className="flex-icenter gap-2 p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100">
          {/* <MdOutlinePerson className="h-7.5 w-7.5" /> */}
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
          >
            <lord-icon
              src="/profile.json"
              trigger="hover"
              style={{ width: "30px", height: "30px" }}
              className="hover:cursor-pointer"
            ></lord-icon>
          </Link>
          {token ? (
            <button
              className="bg-blue-700 text-white bg-brand box-border border border-transparent rounded-sm hover:cursor-pointer hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-2 focus:outline-none"
              onClick={logOut}
            >
              Log Out
            </button>
          ) : (
            <>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="border border-blue-700 text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {/* MOBILE LIST END HERE } */}
    </>
  );
}

export default Navbar;
