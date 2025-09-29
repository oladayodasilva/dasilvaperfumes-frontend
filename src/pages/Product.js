// src/pages/Product.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ✅ Utility: safely build image URLs
const getImageUrl = (filename) => {
  if (!filename) return "/fallback.jpg";

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://dasilvaperfumes.com";

  return `${baseUrl}/images/${filename}`;
};

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products`);
        const data = res.data.products || res.data;
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
              ? getImageUrl(product.images[0])
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
