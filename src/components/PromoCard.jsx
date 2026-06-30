const PromoCard = ({
  title,
  badge,
  description,
  price,
  image,
  large = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl overflow-hidden
        ${large ? "min-h-125" : "min-h-61.25"}
      `}
    >
      <div
        className={`
          h-full
          flex
          ${large ? "flex-col" : "flex-row"}
          items-center
          justify-center
          p-6
          gap-6
        `}
      >
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={image}
            alt={title}
            className={`
              object-contain
              transition
              duration-300
              hover:scale-105
              ${large ? "h-72" : "h-32"}
            `}
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center">
          <p className="text-orange-500 text-xs tracking-widest">
            {badge}
          </p>

          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <p className="text-gray-600 mt-2">
            {description}
          </p>

          <p className="mt-1">
            {price}
          </p>

          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;