import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 16px;
  }

`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 12px;
  }

`;

export const ProductCard = styled(Link)`
  min-width: 0;

  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 4px;
  }
  display: flex;
  flex-direction: column;
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-bottom: 12px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const ProductTag = styled.span`
  color: #ff4a4a;
  font-size: 13px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 12px;
  }

`;

export const ProductBrand = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }

`;

export const ProductName = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

`;

export const ProductPrice = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }

`;
