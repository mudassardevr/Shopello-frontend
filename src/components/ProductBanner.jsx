import { ArrowRight } from "lucide-react";

const ProductBanner = ({ title, products , color }) => {
  return (
    <section className="bg-blue-600 rounded-2xl p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-xl font-semibold">
          {title}
        </h2>

        <button className="bg-white p-2 rounded-full">
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Products */}
      <div className="bg-white rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer group"
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden h-40 md:h-52">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition"
                />
              </div>

              <div className="mt-2">
                <h3 className="text-sm">
                  {product.title}
                </h3>

                <p className="font-bold">
                  {product.offer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;