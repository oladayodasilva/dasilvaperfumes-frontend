import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Helper to handle different image sources
const imgSrc = (value) => {
  if (!value) return "/fallback.jpg";
  if (value.startsWith("http")) return value; // Cloudinary / external
  if (value.startsWith("/")) return value; // public relative
  return `/images/${value}`; // bare filename fallback
};

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        const data = res.data.products || res.data; // support both
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Shop All Products</h1>
      <div className="product-grid">
        {products.map((product) => {
          const preview =
            product.images && product.images.length > 0
              ? imgSrc(product.images[0]) // ✅ show only first image
              : "/fallback.jpg";

          return (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={preview}
                  alt={product.name}
                  loading="lazy"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
              </Link>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>₦{product.price}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
