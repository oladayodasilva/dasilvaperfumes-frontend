import React from "react";

function ProductImages({ image }) {
  const images = Array.isArray(image) ? image : [image];

  return (
    <div className="w-full h-64 overflow-hidden rounded-2xl shadow">
      <img
        src={images[0]}
        alt="Product"
        className="w-full h-full object-cover"
        onError={(e) => (e.target.src = "/fallback.jpg")}
      />
    </div>
  );
}

export default ProductImages;
