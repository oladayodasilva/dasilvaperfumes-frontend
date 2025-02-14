import React from "react";
import styled from "styled-components";

const Products = () => {
  return (
    <ProductsContainer>
      <h1>Our Perfume Collection</h1>
      <ProductGrid>
        <ProductCard>
          <img src="https://via.placeholder.com/200" alt="Perfume 1" />
          <h3>Perfume Name 1</h3>
          <p>$120</p>
          <button>Add to Cart</button>
        </ProductCard>

        <ProductCard>
          <img src="https://via.placeholder.com/200" alt="Perfume 2" />
          <h3>Perfume Name 2</h3>
          <p>$150</p>
          <button>Add to Cart</button>
        </ProductCard>

        <ProductCard>
          <img src="https://via.placeholder.com/200" alt="Perfume 3" />
          <h3>Perfume Name 3</h3>
          <p>$180</p>
          <button>Add to Cart</button>
        </ProductCard>
      </ProductGrid>
    </ProductsContainer>
  );
};

export default Products;

// Styled Components
const ProductsContainer = styled.div`
  padding: 80px 20px;
  text-align: center;
  background-color: #f5f5f5;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: auto;
`;

const ProductCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 100%;
    border-radius: 10px;
  }

  h3 {
    margin: 10px 0;
  }

  p {
    font-size: 18px;
    color: #333;
  }

  button {
    padding: 10px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: darkgray;
    }
  }
`;
