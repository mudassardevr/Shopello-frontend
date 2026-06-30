import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SkeletonLoading from "../components/SkeletonLoading";

function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);

        const response = await API.get(
          `/product/category/${category}`
        );
        
     

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

     
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="max-w-center mx-auto p-6 pt-25 md:pt-40">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {category}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoading key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;