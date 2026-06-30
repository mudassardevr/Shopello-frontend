import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen p-6 mt-25">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/admin/add-product"
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold">
            Add Product
          </h2>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow">
            <Link to="/admin/products">
          <h2 className="text-xl font-semibold">
            Manage Products
          </h2>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <Link to="/admin/orders">
          <h2 className="text-xl font-semibold">
            Orders
          </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;