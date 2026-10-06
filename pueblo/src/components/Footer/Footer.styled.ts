import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  box-sizing: border-box;

  width: 100%;

  background-color: #000;
  color: #b3b3b3;

  display: flex;
  align-items: center;
  gap: 32px;
  padding: 24px 2vw 20px;
  text-align: left;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 24px 16px 20px;
  }
`;

export const FooterLogo = styled(Link)`
  display: block;
  flex-shrink: 0;
  width: 220px;
  img {
    display: block;
    width: 100%;
    height: auto;
    filter: brightness(0) invert(1);
  }
  &:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
  @media (max-width: 768px) { width: 160px; }
`;

export const FooterInfo = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
`;

export const FooterText = styled.p`
  font-size: 12px;
  margin: 0;
  font-weight: 400;

  line-height: 1.7;
  overflow-wrap: anywhere;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 24px;
  font-size: 12px;
  font-weight: 400;
  margin-top: 2px;
  line-height: 1.7;
  a { color: inherit; text-decoration: none; }
  a:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
  a:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
`;
