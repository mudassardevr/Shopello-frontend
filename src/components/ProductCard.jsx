import React from "react";

import { Link } from "react-router-dom";


function ProductCard({ product }) {
 
  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-md">
        <img
          src={product.image[0]}
          alt={product.title}
          className="w-full h-52 object-cover rounded-lg"
        />

        <h2 className="text-xl font-semibold mt-3">{product.title}</h2>

        <p className="text-gray-600 mt-2">₹ {product.price.toLocaleString()}</p>

      
      </div>
    </>
  );
}

export default ProductCard;
