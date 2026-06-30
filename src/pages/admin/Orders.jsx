import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/order/all", {
        headers: {
          "auth-token": token,
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/order/${id}`,
        { status },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );

      toast.success("Order Status Updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Status");
    }
  };

  return (
    <div className="p-6 pt-30 md:pt-40">
      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-4">
                  {order.user?.name}
                </td>

                <td className="p-4">
                  {order.user?.email}
                </td>

                <td className="p-4">
                  ₹{order.totalAmount}
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-3 py-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>
                </td>

                <td className="p-4">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
