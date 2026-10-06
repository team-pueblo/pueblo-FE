// src/components/Header/styles.ts

import styled, { createGlobalStyle } from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  background-color: #fff;
  color: #000000;

  font-family: inherit;
`;

export const HeaderTop = styled.div`
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    height: 104px;
  }

`;

export const Logo = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.9vw;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  font-family: "Calisto MT", serif;
  line-height: 0;
  @media (max-width: 768px) {
    top: 28px;
  }

`;

export const LogoImage = styled.img`
  display: block;
  width: clamp(120px, 14vw, 180px);
  height: min(6vh, 64px);
  object-fit: cover;
  object-position: center;
  @media (max-width: 768px) {
    width: 132px;
    height: 48px;
  }

`;

export const LeftNav = styled.ul`
  position: absolute;
  left: 2%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 2vw;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: clamp(13px, 0.95vw, 18px);
  align-items: center;
  @media (max-width: 768px) {
    left: 16px;
    top: 78px;
    gap: 16px;
    font-size: 12px;
  }

`;

export const RightNav = styled.ul`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 2vw;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: clamp(13px, 0.95vw, 18px);
  align-items: center;
  @media (max-width: 768px) {
    right: 16px;
    top: 78px;
    gap: 16px;
    font-size: 12px;
  }

`;

export const NavItem = styled.li`
  cursor: pointer;
  white-space: nowrap;
  @media (max-width: 768px) {
    min-height: 44px;
    display: flex;
    align-items: center;
    a { display: flex; align-items: center; min-height: 44px; }
  }

`;

export const HeaderBottom = styled.div`
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  padding: 1.2vh 0;
  @media (max-width: 768px) {
    padding: 0 16px;
  }

`;

export const CategoryMenu = styled.ul`
  display: flex;
  justify-content: center;
  gap: 4vw;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: clamp(13px, 0.9vw, 18px);
  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
  }

`;

export const HighlightItem = styled(NavItem)`
  color: red;
  font-weight: 500;
`;

export const CategoryLink = styled(NavLink)`
  display: block;
  color: inherit;
  text-decoration: none;

  &[aria-current="page"] {
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Calisto MT';
    src: url('/fonts/CalistoMT-Regular.woff2') format('woff2'),
         url('/fonts/CalistoMT-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;
