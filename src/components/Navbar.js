import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <NavContainer>
      <TopBar>
        <Logo>
          <Link to="/">
            <img
              src={require("../assets/newgold.png")}
              alt="Dasilva Perfumes Logo"
            />
          </Link>
        </Logo>

        <DesktopLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/bespoke">Bespoke</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </DesktopLinks>

        <RightGroup>
          <Hamburger onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </Hamburger>

          <CartIcon to="/cart">
            <FaShoppingCart size={24} />
            {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
          </CartIcon>
        </RightGroup>
      </TopBar>

      <MobileLinks open={menuOpen}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/bespoke" onClick={() => setMenuOpen(false)}>Bespoke</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
      </MobileLinks>
    </NavContainer>
  );
};

export default Navbar;
const NavContainer = styled.nav`
  background: black;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 5%;
`;

const Logo = styled.div`
  img {
    width: 120px;
    height: auto;
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const MobileLinks = styled.div`
  display: none;
  flex-direction: column;
  background: black;
  padding: 10px 5%;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  transition: 0.3s;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    padding: 8px 0;
  }
`;