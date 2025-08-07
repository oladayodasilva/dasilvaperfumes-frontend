import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Shop All Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={require(`../assets/${product.image}`)} alt={product.name} width="200" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>₦{product.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
