import React, { useState , useEffect } from 'react'
import { useLocation , Link} from 'react-router-dom';


import API from '../services/api';
import ProductCard from '../components/ProductCard';
import SkeletonLoading from '../components/SkeletonLoading';




function SearchResult() {

  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {

    const searchProducts = async() => {

      try {
        setLoading(true)

      const response = await API.get(`/product/search?q=${query}`)

      setProducts(response.data.products);

      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    }

    searchProducts()

  }, [query])

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [query])




  return (
    <>
    <div className="max-w-center mx-auto p-6 pt-25 md:pt-40">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoading key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-500">
            No products found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </>
  )
}

export default SearchResult