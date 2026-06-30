import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  //getting wishlist
  const getWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/wishlist", {
        headers: {
          "auth-token": token,
        },
      });

      setWishlist(data.wishlist);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // removing wishlist
  const removeWishlist = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/wishlist/${id}`, {
        headers: {
          "auth-token": token,
        },
      });

      toast.success("Removed from Wishlist");

      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-25 md:pt-38 pb-10">
        <h1 className="text-3xl font-bold mb-6">
          My Wishlist ({wishlist.length})
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              Your Wishlist is Empty ❤️
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={item.product.image?.[0]}
                  alt=""
                  className="w-full h-48 object-contain"
                />

                <h2 className="font-medium mt-3">{item.product.title}</h2>

                <p className="font-bold mt-2">₹{item.product.price}</p>

                <button
                  onClick={() => removeWishlist(item._id)}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
