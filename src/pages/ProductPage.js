import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!product) return <p style={{ textAlign: "center" }}>Product not found.</p>;

  const rawImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((img) => `/images/${img}`)
      : [];

  const hasImages = rawImages.length > 0;
  const currentImage = hasImages ? rawImages[index] : "/fallback.jpg";

  const next = () => {
    if (!hasImages) return;
    setIndex((prev) => (prev + 1) % rawImages.length);
  };

  const prev = () => {
    if (!hasImages) return;
    setIndex((prev) => (prev - 1 + rawImages.length) % rawImages.length);
  };

  return (
    <Container>
      <ImageArea>
        <MainImage src={currentImage} alt={product.name} />

        {hasImages && (
          <Thumbnails>
            {rawImages.map((img, i) => (
              <Thumb
                key={i}
                src={img}
                alt={`${product.name} ${i + 1}`}
                $active={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </Thumbnails>
        )}

        {hasImages && rawImages.length > 1 && (
          <Nav>
            <button onClick={prev}>‹ Prev</button>
            <span>
              {index + 1} / {rawImages.length}
            </span>
            <button onClick={next}>Next ›</button>
          </Nav>
        )}
      </ImageArea>

      <Info>
        <h1>{product.name}</h1>
        <p className="price">₦{product.price}</p>
        <p className="desc">{product.description}</p>

        <ButtonGroup>
          <button
            onClick={() =>
              addToCart({
                ...product,
                image: currentImage,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>

          <Link to="/products">
            <button className="secondary">Continue Shopping</button>
          </Link>
        </ButtonGroup>
      </Info>
    </Container>
  );
};

export default ProductPage;

/* ------------ Styled Components ------------ */
const Container = styled.div`
  max-width: 1100px;
  margin: 80px auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 500px;            /* ✅ fixed height for consistency */
  border-radius: 8px;
  object-fit: cover;        /* ✅ crop while preserving aspect */
  background: #f8f8f8;      /* ✅ avoids “empty space” if image is smaller */
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Thumb = styled.img`
  width: 80px;              /* ✅ slightly bigger for clarity */
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? "black" : "transparent")};
  transition: border 0.3s ease;
  background: #f8f8f8;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;

  button {
    background: #000;
    color: #fff;
    padding: 6px 14px;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
      background: #a00;
    }
  }
  span {
    font-size: 0.9rem;
    color: #555;
  }
`;

const Info = styled.div`
  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  .price {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .desc {
    white-space: pre-line;
    line-height: 1.5;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;

  button {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
  }

  button:first-child {
    background: black;
    color: white;
    &:hover {
      background: darkred;
    }
  }

  .secondary {
    background: #eee;
    color: black;
    &:hover {
      background: #ddd;
    }
  }
`;
