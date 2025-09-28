// src/components/Footer.js
import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/whitetwitter.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagram.svg";
import { ReactComponent as WhatsappIcon } from "../assets/icons/whatsapp.svg"; // ✅ New import
import LogoImg from "../assets/Asset 1.svg";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://dasilvaperfumes.com"
    : "http://localhost:5000";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Subscription failed");

      alert(data.message);
      setEmail("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <FooterContainer>
      <ContentWrapper>
        <LogoWrapper>
          <Logo src={LogoImg} alt="Dasilva Perfumes Logo" />
        </LogoWrapper>

        <LinksSection>
          <FooterLink href="/shipping-policy">Shipping Policy</FooterLink>
          <FooterLink href="/return-policy">Return Policy</FooterLink>
          <FooterLink href="/faqs">FAQs</FooterLink>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        </LinksSection>

        <ContactSection>
          <ContactTitle>Send us an Email:</ContactTitle>
          <ContactEmail href="mailto:dasilvacosmetics@yahoo.com">
            dasilvacosmetics@yahoo.com
          </ContactEmail>
        </ContactSection>

        <SocialMedia>
          <SocialLink
            href="https://web.facebook.com/profile.php?id=100088571782684&rdid=PrjiPkKoqxnr5PGW"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </SocialLink>
          <SocialLink
            href="https://x.com/dasilvaperfumes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </SocialLink>
          <SocialLink
            href="https://www.instagram.com/dasilvaperfumes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </SocialLink>
          <SocialLink
            href="https://wa.me/2347010372639"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <WhatsappIcon />
          </SocialLink>
        </SocialMedia>
      </ContentWrapper>

      <NewsletterSection>
        <NewsletterTitle>Join Our Newsletter</NewsletterTitle>
        <NewsletterForm onSubmit={handleSubscribe}>
          <NewsletterInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <NewsletterButton type="submit">Subscribe</NewsletterButton>
        </NewsletterForm>
      </NewsletterSection>

      <Copyright>
        &copy; {new Date().getFullYear()} Dasilva Perfumes. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

// ---------------- Styled Components ---------------- //

const FooterContainer = styled.footer`
  background-color: #111;
  color: #eee;
  padding: 40px 20px 20px;
  font-size: 0.9rem;
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 25px;
`;

const LogoWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Logo = styled.img`
  height: 50px;
  object-fit: contain;
`;

const LinksSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 180px;
  align-items: center;
`;

const FooterLink = styled.a`
  color: #eee;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover {
    color: #f5a623;
  }
`;

const ContactSection = styled.div`
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactTitle = styled.p`
  margin: 0 0 6px;
  font-weight: 600;
`;

const ContactEmail = styled.a`
  color: #f5a623;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialMedia = styled.div`
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const SocialLink = styled.a`
  color: #eee;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.25s ease;

  &:hover {
    color: #f5a623;
  }
`;

/* ✅ Newsletter Section */
const NewsletterSection = styled.div`
  margin-top: 30px;
`;

const NewsletterTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const NewsletterInput = styled.input`
  padding: 10px 14px;
  border-radius: 6px;
  border: none;
  outline: none;
  width: 250px;
  max-width: 100%;
`;

const NewsletterButton = styled.button`
  background: #f5a623;
  color: #111;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: #d98a1d;
  }
`;

const Copyright = styled.div`
  margin-top: 35px;
  font-size: 0.75rem;
  color: #777;
`;
