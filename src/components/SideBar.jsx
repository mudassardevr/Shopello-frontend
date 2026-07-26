import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Grid2X2,
  Layers3,
  Heart,
  ShoppingCart,
  Tag,
  Headphones,
} from "lucide-react";


function SideBar() {
  const location = useLocation()


  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid2X2, label: "Categories", path: "/category/:category" },
    { icon: Heart, label: "Wishlist" , path: "/wishlist" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Headphones, label: "Support" },
  ];

  return (
    <>
      <aside className="hidden lg:flex fixed -top-12.5 left-0 h-screen w-24 items-center justify-center z-50 bg-white/20 backdrop-blur-md">
        <div className=" max-h-[95vh] overflow-y-auto bg-white/50 backdrop-blur-2xl px-3 py-4 rounded-2xl border border-white/60 shadow-xl shadow-black/10">
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <div
              className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md"
            >
              <ShoppingCart size={24} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center gap-5">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`group flex flex-col items-center gap-1 transition ${
                    isActive ? "text-indigo-600" : "text-gray-400 hover:text-indigo-600"
                  }`}
                >
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-xl transition
                 ${
                  isActive ? "bg-indigo-600 text-white" : "group-hover:bg-indigo-50"
                 }
                `}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <span
                    className={`text-[10px] ${
                      isActive ? "text-indigo-600 font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom indicator */}
          {/* <div className="mt-auto">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div> */}
        </div>
      </aside>
    </>
  );
}

export default SideBar;
