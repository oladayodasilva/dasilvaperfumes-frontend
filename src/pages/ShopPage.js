import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const getImage = (filename) => {
  if (!filename) return require("../assets/elixir-on-neck.jpg");
  if (filename.startsWith("http") || filename.startsWith("/uploads/")) {
    return filename;
  }
  try {
    return require(`../assets/${filename}`);
  } catch (error) {
    return require("../assets/elixir-on-neck.jpg");
  }
};

const ShopPage = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  const Spinner = styled.div`
  margin: 50px auto;
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top: 4px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

  return (
    <Container>
      <h1>Shop Our Collection</h1>
      <Grid>
  {loading ? (
    <Spinner />
  ) : products.length === 0 ? (
    <p>No products available.</p>
  ) : (
    products.map((product) => (
      <Card key={product._id}>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={getImage(product.image)} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₦{product.price}</p>
        </Link>
        <ButtonGroup>
          <button onClick={() => addToCart({ ...product, quantity: 1 })}>
            Add to Cart
          </button>
        </ButtonGroup>
      </Card>
    ))
  )}
</Grid>

    </Container>
  );
};

export default ShopPage;

// Styled Components (keep as is)


// Styled Components
const Container = styled.div`
  padding: 80px 20px;
  background: #f9f9f9;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  h3 {
    margin: 10px 0;
  }

  p {
    font-size: 16px;
    font-weight: bold;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background: black;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: darkred;
    }
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;
