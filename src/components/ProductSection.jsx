import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";
import SkeletonLoading from "./SkeletonLoading";

function ProductSection({ title, products, loading }) {
  return (
    <div className="max-w-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        {title}
      </h1>

      <Swiper
        modules={[Navigation]}
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
  );
}

export default ProductSection;
