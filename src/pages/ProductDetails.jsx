import React, { useEffect, useRef, useState } from "react";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";

import API from "../services/api";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

///Product images slide {
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// }

import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

function ProductDetails() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const navigate = useNavigate();

  // fetch single product
  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/product/${id}`);

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // wishlist cheching products
  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await API.get("/wishlist", {
        headers: {
          "auth-token": token,
        },
      });

      const exists = data.wishlist.some((item) => item.product._id === id);

      setIsWishlisted(exists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    checkWishlist();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show skeleton while data is loading
  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  // Product not found
  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1>Product not found</h1>
      </div>
    );
  }

  /// adding to cart the product
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please login First");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      await API.post(
        "/cart/add",
        {
          ProductId: product._id,
          quantity: 1,
        },

        {
          headers: {
            "auth-token": token,
          },
        },
      );

      toast.success("Added to Cart 🛒");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
      return false;
    }
  };

  /// wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please login First");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      const { data } = await API.post(
        "/wishlist/add",
        {
          productId: product._id,
        },
        {
          headers: {
            "auth-token": token,
          },
        },
      );

      if (data.success) {
        setIsWishlisted(true);
        toast.success("Added to Wishlist ❤️");
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add wishlist");
    }
  };

  const buyNow = async() => {
    const added = await addToCart();

    if(added){
      navigate("/cart")
    }
  }

  return (
    <>
      <section className="bg-white pt-20 md:pt-35">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE */}
            <div>
              {/* Product Info */}
              <div className="mb-6">
                <p className="text-orange-500 font-semibold">NEW</p>

                <h1 className="text-3xl font-semibold">{product.title}</h1>

                <p className="text-sm text-gray-500">MHU04HN/A</p>
              </div>

              {/* Product Image Slider */}
              <Swiper
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;

                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                spaceBetween={10}
                slidesPerView={1}
              >
                {product.image?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt=""
                      className="w-full h-80 md:h-100 lg:h-125 object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Arrows */}
              <div className="flex justify-center gap-20 mt-6">
                <button ref={prevRef}>
                  <ChevronLeft
                    size={28}
                    className="cursor-pointer hover:scale-110 transition"
                  />
                </button>

                <button ref={nextRef}>
                  <ChevronRight
                    size={28}
                    className="cursor-pointer hover:scale-110 transition"
                  />
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {/* Price and mobile wishlist  */}
              <div className="flex-icenter gap-5">
                <h2 className="text-4xl md:text-5xl font-bold">
                  ₹{product.price}
                </h2>

                <button
                  onClick={addToWishlist}
                  className={`px-5 py-3 rounded-full hover:cursor-pointer transition md:hidden ${
                    isWishlisted
                      ? "bg-red-500 text-white border border-red-500"
                      : "border border-gray-400 text-black hover:bg-gray-50"
                  }`}
                >
                  <FaHeart />
                </button>
              </div>

              {/* Offers */}
              <div className="mt-6 space-y-3">
                <p>→ Get upto 60% from our collection</p>
                <p>→ Use coupon SAVE10</p>
                <p>→ Get upto 60% off on accessories</p>
              </div>

              {/* Desktop Buttons */}
              <div className="hidden md:flex gap-3 mt-8">
                <button
                  onClick={addToWishlist}
                  className={`px-5 py-3 rounded-full hover:cursor-pointer transition ${
                    isWishlisted
                      ? "bg-red-500 text-white border border-red-500"
                      : "border border-gray-400 text-black hover:bg-gray-50"
                  }`}
                >
                  <FaHeart />
                </button>
                <button
                  onClick={addToCart}
                  className="flex-1 bg-black text-white py-3 rounded-full hover:cursor-pointer"
                >
                  Add To Cart
                </button>

                <button onClick={() => buyNow()}
                 className="flex-1 bg-orange-500 text-white py-3 rounded-full hover:cursor-pointer">
                  Buy Now
                </button>
              </div>

              {/* EMI Card */}
              <div className="border border-gray-300 rounded-xl p-4 bg-white mt-8">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h2 className="text-3xl font-bold text-green-900">
                    pine<span className="font-normal">labs</span>
                  </h2>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] bg-pink-800 text-white px-2 py-1 rounded">
                      AXIS BANK
                    </span>

                    <span className="text-[10px] bg-orange-600 text-white px-2 py-1 rounded">
                      ICICI Bank
                    </span>

                    <span className="text-[10px] text-blue-600 font-semibold">
                      SBI Card
                    </span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Selling Price :</p>

                  <p className="text-2xl font-semibold">₹{product.price}</p>
                </div>

                <hr className="my-4" />

                <button
                  className="
          border
          border-blue-500
          text-blue-500
          px-6
          py-3
          rounded-full
          hover:bg-blue-50
          transition
        "
                >
                  View EMI Offers
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Fixed Bottom Buttons */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex gap-3 md:hidden z-50">
            <button
              onClick={addToCart}
              className="flex-1 bg-black text-white py-3 rounded-full"
            >
              Add To Cart
            </button>

            <button onClick={()=> buyNow()} className="flex-1 bg-orange-500 text-white py-3 rounded-full hover:cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
