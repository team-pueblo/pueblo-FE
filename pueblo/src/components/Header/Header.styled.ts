// src/components/Header/styles.ts

import styled, { createGlobalStyle } from "styled-components";

export const HeaderContainer = styled.header`
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  background-color: #fff;
  color: #000000;

  font-family: sans-serif;
`;

export const HeaderTop = styled.div`
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Logo = styled.h1`
  font-size: 1.9vw;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  font-family: "Calisto MT", serif;
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
  font-size: 0.95vw;
  align-items: center;
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
  font-size: 0.95vw;
  align-items: center;
`;

export const NavItem = styled.li`
  cursor: pointer;
  white-space: nowrap;
`;

export const HeaderBottom = styled.div`
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  padding: 1.2vh 0;
`;

export const CategoryMenu = styled.ul`
  display: flex;
  justify-content: center;
  gap: 4vw;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9vw;
`;

export const HighlightItem = styled(NavItem)`
  color: red;
  font-weight: 500;
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
