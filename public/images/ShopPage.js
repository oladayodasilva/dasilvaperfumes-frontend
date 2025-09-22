import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

// Product Images
import elixir from "../assets/elixir-alone.jpg";
import intentions from "../assets/intentions-alone.jpg";
import magnifiscent from "../assets/magnifiscent-alone.jpg";
import shakarax from "../assets/X.jpg";
import clement from "../assets/clement.jpg";
import shakaraxx from "../assets/MIX-bespoke-collection.jpg";
import dix from "../assets/DIX.jpg";
import cix from "../assets/CIX1.JPG";
import md from "../assets/MD-bespoke-collection.jpg";
import xxx from "../assets/xxx-bespoke-collection.jpg";
import styled from "styled-components";

// ✅ Product → Image Mapping (lowercase keys)
const productImageMap = {
  elixir,
  intentions,
  magnifiscent,
  shakarax,
  clement,
  shakaraxx,
  dix,
  cix,
  md,
  xxx,
};

// ✅ Normalize name (lowercase + trim + remove accents + remove spaces)
const normalizeKey = (str) => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD") // split accents from letters
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, ""); // remove spaces
};

const normalizeSrc = (product) => {
  if (!product || !product.name) return "/fallback.jpg";

  const key = normalizeKey(product.name); // normalized key
  if (productImageMap[key]) {
    return productImageMap[key];
  }

  if (product.images && product.images.length > 0) {
    return product.images[0];
  }

  if (product.image) {
    return product.image;
  }

  return "/fallback.jpg";
};


const ShopPage = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ShopContainer>
      <h2>Our Shop</h2>
      <ProductGrid>
        {products.map((product) => {
          const previewImage = normalizeSrc(product);

          return (
            <ProductCard key={product._id}>
              <ImageWrapper>
                <img src={previewImage} alt={product.name} loading="lazy" />
              </ImageWrapper>
              <h3>{product.name}</h3>
              <p>₦{product.price}</p>
              <ButtonGroup>
                <button onClick={() => navigate(`/product/${product._id}`)}>
                  View
                </button>
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
            </ProductCard>
          );
        })}
      </ProductGrid>
    </ShopContainer>
  );
};

export default ShopPage;

// ✅ Styled Components
const ShopContainer = styled.div`
  padding: 60px 30px;
  background: #fff;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #333;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const ProductCard = styled.div`
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 1.2rem;
    color: #111;
    margin-top: 15px;
  }

  p {
    color: #666;
    margin: 10px 0;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;  // ✅ rectangular instead of square
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // ✅ keeps proportion without stretching
    display: block;
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
