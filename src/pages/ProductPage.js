import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

// fallback image loader
const getImage = (filename) => {
  try {
    return require(`../assets/${filename}`);
  } catch (err) {
    return require(`../assets/elixir-on-neck.jpg`);
  }
};

const ProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <Container>
      <ImageWrapper>
        <img src={getImage(product.image)} alt={product.name} />
      </ImageWrapper>
      <Details>
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <p><strong>Fragrance Notes:</strong> {product.notes}</p>
        <p className="price">₦{product.price}</p>
        <ButtonGroup>
          <button onClick={() => addToCart({ ...product, quantity: 1 })}>Add to Cart</button>
          <button onClick={() => navigate("/")}>Back to Shopping</button>
        </ButtonGroup>
      </Details>
    </Container>
  );
};

export default ProductPage;

// Styled Components remain the same as before
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 5%;
  gap: 40px;
  background: #fff;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;

  img {
    width: 100%;
    max-width: 500px;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const Details = styled.div`
  flex: 1;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .description {
    margin-bottom: 15px;
    font-size: 1.1rem;
    color: #444;
  }

  .price {
    margin: 15px 0;
    font-size: 1.3rem;
    font-weight: bold;
    color: #111;
  }

  p {
    margin-bottom: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  button {
    padding: 12px 24px;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background: #000;

    &:hover {
      background: #a00;
    }
  }
`;
