import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ShoppingBag,
  Heart,
} from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/auth/profile", {
        headers: {
          "auth-token": token,
        },
      });

      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/order", {
        headers: {
          "auth-token": token,
        },
      });

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = API.get("/wishlist", {
        headers: {
          "auth-token": token,
        },
      });

      setWishlist(data.wishlist || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProfile();
    getOrders();
    getWishlist();
  }, []);

  if (loading) {
    return (
      <div className="pt-28 text-center text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="pt-25 md:pt-35 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Top */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>

              <p className="text-gray-500">{user.email}</p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                {user.isAdmin ? "Administrator" : "Customer"}
              </span>
            </div>
          </div>

          {/* Information */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="border rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600" />
                  <span>{user.phone || "Not Added"}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

              <div className="flex gap-3">
                <MapPin className="text-blue-600 mt-1" />

                <div>
                  <p>{user.address?.house}</p>
                  <p>{user.address?.street}</p>
                  <p>
                    {user.address?.city}
                    {user.address?.city && ", "}
                    {user.address?.state}
                  </p>

                  <p>{user.address?.pincode}</p>

                  <p>{user.address?.country || "India"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="border rounded-2xl p-5 flex items-center gap-3">
              <Calendar className="text-green-600" />

              <div>
                <p className="text-gray-500 text-sm">Member Since</p>

                <h3 className="font-semibold">
                  {new Date(user.createdAt).toDateString()}
                </h3>
              </div>
            </div>

            <div className="border rounded-2xl p-5 flex items-center gap-3">
              <ShieldCheck className="text-purple-600" />

              <div>
                <p className="text-gray-500 text-sm">Account Type</p>

                <h3 className="font-semibold">
                  {user.isAdmin ? "Administrator" : "Customer"}
                </h3>
              </div>
            </div>
          </div>

          {/* Account Overview */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Link
              to="/orders"
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <ShoppingBag size={34} className="text-orange-500" />

                <div>
                  <h2 className="text-xl font-bold">My Orders</h2>

                  <p className="text-gray-500">{orders.length} Orders</p>
                </div>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <Heart size={34} className="text-red-500" />

                <div>
                  <h2 className="text-xl font-bold">Wishlist</h2>

                  <p className="text-gray-500">{wishlist.length} Items</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Button */}
          <div className="mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
