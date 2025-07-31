import React from "react";
import styled from "styled-components";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/whitetwitter.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagram.svg";
import LogoImg from "../assets/Asset 1.svg"; // ✅ Update path if needed

const Footer = () => {
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
          <ContactEmail href="mailto:contact@dasilvaperfumes.com">
            contact@dasilvaperfumes.com
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
        </SocialMedia>
      </ContentWrapper>

      <Copyright>
        &copy; {new Date().getFullYear()} Dasilva Perfumes. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components

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

const Copyright = styled.div`
  margin-top: 35px;
  font-size: 0.75rem;
  color: #777;
`;
