import React, { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  //fetch all items
  const getCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/cart", {
        headers: {
          "auth-token": token,
        },
      });

      setCartItems(response.data.cartItem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  //total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // remove item
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          "auth-token": token,
        },
      });

      // update UI instantly
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  /// PLACE ORDER
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/order/place",
        {},
        {
          headers: {
            "auth-token": token,
          },
        },
      );

      console.log("Order Placed successfully");

      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-6 pt-25 md:pt-40">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>

        {cartItems.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border p-4 rounded-xl"
              >
                <img
                  src={item.product.image[0]}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {item.product.title}
                  </h2>

                  <p>₹ {item.product.price}</p>

                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* total */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Total: ₹ {totalPrice}</h2>
            </div>
            <button
              onClick={placeOrder}
              className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
