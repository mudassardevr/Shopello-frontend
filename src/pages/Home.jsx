import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SkeletonLoading from "../components/SkeletonLoading";

//{IMAGE SLIDER OF HEAR SECTION
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//}

import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import ProductBanner from "../components/ProductBanner";
import { homeStylishProducts } from "../components/data/homeData";
import { electronicsProducts } from "../components/data/eletronicesData";
import { tvdata } from "../components/data/TvData";

import PromoGrid from "../components/PromoGrid";
import ProductSection from "../components/ProductSection";
///Banners images
import discountBanner from "../assets/discountBanners/discountBanner.png";
import discountBanner2 from "../assets/discountBanners/discountBanner2.png";
import discountBanner3 from "../assets/discountBanners/discountBanner3.png";
import discountBanner4 from "../assets/discountBanners/discountBanner4.png";

const banners = [
  { id: 1, image: discountBanner },
  { id: 2, image: discountBanner2 },
  { id: 3, image: discountBanner3 },
  { id: 4, image: discountBanner4 },
];

function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //for category products
  const mobileProducts = products.filter((item) => item.category === "Mobile");

  const tvProducts = products.filter((item) => item.category === "TV");

  const laptopProducts = products.filter((item) => item.category === "Laptop");

  const watchProducts = products.filter((item) => item.category === "watch");

  // fetch products
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await API.get("/product");

      setProducts(response.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="pt-20.5 md:pt-25">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-center">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
             loop
            >
              {banners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <img
                    src={banner.image}
                    alt={`Banner ${banner.id}`}
                    className="w-full h-70 object-cover md:h-100 md:object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* All PRODUCTS  */}
      <div className="max-w-center p-6 relative">
        <h1 className="text-3xl font-bold mb-6">See whats new </h1>

        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:cursor-pointer"
        >
          <ChevronRight />
        </button>

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
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {/* {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link to={`/product/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            </SwiperSlide>
          ))} */}
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonLoading />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <ProductCard product={product} />
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* home and products Stylish banner */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <ProductBanner
          title="To make your Home Stylish"
          products={homeStylishProducts}
        />
        <ProductBanner
          title="To make your Life Easy Using Tech"
          products={electronicsProducts}
        />
      </div>

      {/* PROMO SECTION */}
      <div className="max-w-7xl mx-auto p-4">
        <PromoGrid />
      </div>

      {/* MOBILE PRODUCTS SECTIONS */}
      <ProductSection
        title={"Mobiles"}
        products={mobileProducts}
        loading={loading}
      />

      <div className="max-w-7xl mx-auto p-4">
        <ProductBanner
          title="4k quality Tvs make home like theatre"
          products={tvdata}
        />
      </div>

      {/* TV PRODUCTS SECTIONS */}
      <ProductSection
        title={"Latest TV's"}
        products={tvProducts}
        loading={loading}
      />

      {/* LAPTOP PRODUCTS SECTIONS */}
      <ProductSection
        title={"Laptops"}
        products={laptopProducts}
        loading={loading}
      />
    </>
  );
}

export default Home;
