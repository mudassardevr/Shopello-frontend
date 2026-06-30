import PromoCard from "./PromoCard";

const PromoGrid = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      
      {/* Left Big Card */}
      <PromoCard
        title="iPhone 17e"
        badge="NEW"
        description="Very well-equipped. Very well."
        price="From ₹64,900.00"
        image="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"
        large
      />

      {/* Right Side */}
      <div className="grid grid-rows-2 gap-3">
        <PromoCard
          title="iPad Air M4"
          badge="NEW"
          description="Stratospheric."
          price="From ₹64,900.00"
          image="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"
        />

        <PromoCard
          title="MacBook Neo"
          badge="NEW"
          description="Pre-order now."
          price="From ₹69,900"
          image="https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800"
        />
      </div>
    </section>
  );
};

export default PromoGrid;