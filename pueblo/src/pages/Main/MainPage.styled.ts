import styled from "styled-components";

export const MainPageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

export const ProductCard = styled.div`
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
`;

export const ProductBrand = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

export const ProductName = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

export const ProductPrice = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin: 0;
`;
