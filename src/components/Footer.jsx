import React from "react";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import {
  MdStorefront,
  MdCardGiftcard,
  MdHelpOutline,
} from "react-icons/md";

import { FaBullhorn } from "react-icons/fa";


function Footer() {

  return (
    <>
      {/* <footer className="bg-[#212121] p-10">
        <div className="flex gap-15 ">
          <div>
            <h2 className="text-gray-500 text-xl mb-2">Shop</h2>
            <ul className="text-white text-sm font-bold">
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-500 text-xl mb-2">Shop</h2>
            <ul className="text-white text-sm font-bold">
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-500 text-xl mb-2">Shop</h2>
            <ul className="text-white text-sm font-bold">
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h2 className="text-gray-500 text-xl mb-2">Shop</h2>
            <ul className="text-white text-sm font-bold">
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
      </footer> */}

       <footer className="bg-[#212121] text-white mt-10">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">

          {/* ABOUT */}
          <div>
            <h3 className="text-gray-400 text-xs mb-4 uppercase">
              About
            </h3>
            <ul className="space-y-2 font-semibold">
              <li className="hover:cursor-pointer hover:underline">Contact Us</li>
              <li className="hover:cursor-pointer hover:underline">About Us</li>
              <li className="hover:cursor-pointer hover:underline">Careers</li>
              <li className="hover:cursor-pointer hover:underline">Stories</li>
              <li className="hover:cursor-pointer hover:underline">Press</li>
              <li className="hover:cursor-pointer hover:underline">Corporate Information</li>
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div>
            <h3 className="text-gray-400 text-xs mb-4 uppercase">
              Group Companies
            </h3>
            <ul className="space-y-2 font-semibold">
              <li className="hover:cursor-pointer hover:underline">Myntra</li>
              <li className="hover:cursor-pointer hover:underline">Cleartrip</li>
              <li className="hover:cursor-pointer hover:underline">Shopsy</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="text-gray-400 text-xs mb-4 uppercase">
              Help
            </h3>
            <ul className="space-y-2 font-semibold">
              <li className="hover:cursor-pointer hover:underline">Payments</li>
              <li className="hover:cursor-pointer hover:underline">Shipping</li>
              <li className="hover:cursor-pointer hover:underline">Cancellation & Returns</li>
              <li className="hover:cursor-pointer hover:underline">FAQ</li>
            </ul>
          </div>

          {/* POLICY */}
          <div>
            <h3 className="text-gray-400 text-xs mb-4 uppercase">
              Consumer Policy
            </h3>
            <ul className="space-y-2 font-semibold">
              <li className="hover:cursor-pointer hover:underline">Cancellation & Returns</li>
              <li className="hover:cursor-pointer hover:underline">Terms Of Use</li>
              <li className="hover:cursor-pointer hover:underline">Security</li>
              <li className="hover:cursor-pointer hover:underline">Privacy</li>
              <li className="hover:cursor-pointer hover:underline">Sitemap</li>
              <li className="hover:cursor-pointer hover:underline">Grievance Redressal</li>
              <li className="hover:cursor-pointer hover:underline">EPR Compliance</li>
              <li className="hover:cursor-pointer hover:underline">FSSAI Food Safety</li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="lg:border-l lg:border-gray-700 lg:pl-6">
            <h3 className="text-gray-400 text-xs mb-4">
              Mail Us:
            </h3>

            <p className="text-sm leading-6">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia &
              Clove Embassy Tech Village,
              Outer Ring Road,
              Bengaluru, Karnataka, India
            </p>

            <div className="mt-4">
              <h4 className="text-gray-400 mb-3">
                Social:
              </h4>

              <div className="flex gap-4 text-xl">
                <FaFacebook />
                <FaXTwitter />
                <FaYoutube />
                <FaInstagram />
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <h3 className="text-gray-400 text-xs mb-4">
              Registered Office Address:
            </h3>

            <p className="text-sm leading-6">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia &
              Clove Embassy Tech Village,
              Outer Ring Road,
              Bengaluru, Karnataka, India
            </p>

            <p className="mt-3">
              CIN: U51109KA2012PTC066107
            </p>

            <p className="mt-2 text-blue-400">
              044-45614700 / 044-67415800
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MdStorefront className="text-yellow-400" />
              Become a Seller
            </div>

            <div className="flex items-center gap-2">
              <FaBullhorn className="text-yellow-400" />
              Advertise
            </div>

            <div className="flex items-center gap-2">
              <MdCardGiftcard className="text-yellow-400" />
              Gift Cards
            </div>

            <div className="flex items-center gap-2">
              <MdHelpOutline className="text-yellow-400" />
              Help Center
            </div>
          </div>

          <p className="text-sm text-center">
            © 2007-2026 Flipkart.com
          </p>

          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
            alt="payments"
            className="h-5"
          />
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;
