import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <NavContainer>
      <Logo>
        <Link to="/">Dasilva Perfumes</Link>
      </Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/bespoke">Bespoke</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        <CartLink to="/cart">
          <FaShoppingCart size={24} />
          {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
        </CartLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;

// Styled Components
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 15px 5%;
  background: black;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  flex: 1; /* Pushes the nav links to start from the center */
  
  a {
    color: white;
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-start; /* Aligns items from the center onward */
  flex: 2; /* Makes nav links take more space to move rightward */
  gap: 30px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  transition: 0.3s;

  &:hover {
    color: #ff0000;
  }
`;

const CartLink = styled(Link)`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
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
