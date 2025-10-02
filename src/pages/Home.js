// src/pages/Home.js
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Hero from "../components/Hero";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Local collage images
import collage1 from "../assets/1723282592156.jpg";
import collage2 from "../assets/1723284066892.jpg";
import collage3 from "../assets/1723284066343.jpg";
import collage4 from "../assets/1723282592080.jpg";
import collage5 from "../assets/IMG_9469.jpg";

// ✅ Utility: safely build product preview image
const getPreviewImage = (product) => {
  if (!product?.images?.length) return "/placeholder.jpg";
  return `/images/${product.images[0]}`; // served from /public/images
};

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://dasilva-backend.onrender.com/api/products')
        setProducts(res.data.slice(0, 6));
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const publicPath = process.env.PUBLIC_URL || "";
  const reviews = Array.from({ length: 9 }).map(
    (_, i) => `${publicPath}/images/reviews/review${i + 1}.jpg`
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <HomeContainer>
      <ContentWrapper>
        <Hero />

        <FeaturedSection>
          <h2>Fragrance Collection</h2>
          <ProductGrid>
            {products.map((product) => {
              const previewImage = getPreviewImage(product);

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
        </FeaturedSection>

        {/* Reviews carousel */}
        <ReviewsSection>
          <h2>What Customers Are Saying</h2>
          <SliderWrapper>
            <Slider {...sliderSettings}>
              {reviews.map((src, idx) => (
                <ReviewCard key={idx}>
                  <img
                    src={src}
                    alt={`Customer Review ${idx + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${publicPath}/fallback.jpg`;
                    }}
                  />
                </ReviewCard>
              ))}
            </Slider>
          </SliderWrapper>
        </ReviewsSection>

        <CollageSection>
          <img src={collage1} alt="Collage 1" className="portrait" />
          <img src={collage2} alt="Collage 2" className="landscape" />
          <img src={collage3} alt="Collage 3" className="square" />
          <img src={collage4} alt="Collage 4" className="portrait" />
          <img src={collage5} alt="Collage 5" className="landscape" />
        </CollageSection>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;

/* ---------------- Styled Components ---------------- */
const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  z-index: 2;
`;

const FeaturedSection = styled.section`
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
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

/* Reviews */
const ReviewsSection = styled.section`
  padding: 60px 30px;
  background: #f9f9f9;
  text-align: center;
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #333;
  }
`;

const SliderWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  .slick-list {
    padding: 10px 0;
  }
`;

const ReviewCard = styled.div`
  padding: 12px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 8px;
  }
`;

/* Collage */
const CollageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 60px 5%;
  background: #fff;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.02);
    }
  }
  .portrait {
    grid-row: span 2;
  }
  .landscape {
    grid-column: span 2;
  }
  .square {
    aspect-ratio: 1 / 1;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;
