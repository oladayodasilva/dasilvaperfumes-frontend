import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import product1 from "../assets/1.jpg";
import product2 from "../assets/IMG_8552-Recovered.jpg";
import product3 from "../assets/IMG_8548.jpg";

const ProductPage = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "Dasilva Noir", price: "$200", img: product1 },
    { id: 2, name: "Velvet Oud", price: "$250", img: product2 },
    { id: 3, name: "Royal Essence", price: "$180", img: product3 },
  ];

  return (
    <PageContainer>
      <h1>Our Exclusive Collection</h1>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.img} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageContainer>
  );
};

export default ProductPage;

// Styled Components
const PageContainer = styled.div`
  padding: 100px 5%;
  text-align: center;
  background: #fdfdfd;

  h1 {
    font-size: 2.8rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: #222;
    margin-bottom: 40px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: auto;
`;

const ProductCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: 0.3s;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    max-height: 320px;
    object-fit: cover;
    border-radius: 10px;
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 12px;
    color: #333;
  }

  p {
    font-size: 1.3rem;
    color: #666;
    font-weight: bold;
  }

  button {
    margin-top: 12px;
    padding: 12px 24px;
    font-size: 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    font-weight: bold;

    &:hover {
      background: #a00;
    }
  }
`;
