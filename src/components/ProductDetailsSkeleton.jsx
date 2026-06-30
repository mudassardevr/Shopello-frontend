import React from "react";

function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 shimmer">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Left Side */}
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-6"></div>

          <div className="w-full h-100 bg-gray-200 rounded-xl"></div>

          <div className="flex justify-center gap-6 mt-6">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="h-10 w-40 bg-gray-200 rounded mb-6"></div>

          <div className="space-y-4 mb-8">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="h-12 flex-1 bg-gray-200 rounded-full"></div>
            <div className="h-12 flex-1 bg-gray-200 rounded-full"></div>
          </div>

          <div className="border rounded-xl p-5">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>

            <div className="h-px bg-gray-200 mb-4"></div>

            <div className="flex justify-between mb-6">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-28 bg-gray-200 rounded"></div>
            </div>

            <div className="h-10 w-40 bg-gray-200 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;