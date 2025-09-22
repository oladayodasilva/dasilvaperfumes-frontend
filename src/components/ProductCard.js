import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

// ✅ Safe image normalizer
const normalizeSrc = (v) => {
  if (!v) return "/fallback.jpg";
  if (typeof v !== "string") return "/fallback.jpg";
  if (v.startsWith("http")) return v; // Cloudinary
  if (v.startsWith("/")) return v;    // Public path
  return `/images/${v}`;              // Local images
};

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const previewImage =
    product.images && product.images.length > 0
      ? normalizeSrc(product.images[0])
      : product.image
      ? normalizeSrc(product.image)
      : "/fallback.jpg";

  return (
    <Card>
      <img src={previewImage} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p>₦{product.price}</p>
      <ButtonGroup>
        <button onClick={() => navigate(`/product/${product._id}`)}>View</button>
        <button
          onClick={() =>
            addToCart({
              ...product,
              image: previewImage,
              quantity: 1,
            })
          }
        >
          Add to Cart
        </button>
      </ButtonGroup>
    </Card>
  );
};

export default ProductCard;

// ✅ Styled Components
const Card = styled.div`
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
    object-fit: cover;
    height: 280px;
  }

  h3 {
    font-size: 1.2rem;
    color: #111;
  }

  p {
    color: #666;
    margin: 10px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;

  button {
    flex: 1;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.3s ease;

    &:hover {
      background: darkred;
    }
  }
`;
