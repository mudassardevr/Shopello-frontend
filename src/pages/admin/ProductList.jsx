import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/product");
      setProducts(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/product/${id}`, {
        headers: {
          "auth-token": token,
        },
      });

      setProducts(products.filter((product) => product._id !== id));

      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-4">
                  <img
                    src={product.image?.[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-4">{product.title}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
