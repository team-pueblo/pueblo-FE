import styled from "styled-components";

export const ProductCardStyled = styled.div<{ isRemoving?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
  cursor: pointer;
  opacity: ${({ isRemoving }) => (isRemoving ? 0 : 1)};
  transform: ${({ isRemoving }) => (isRemoving ? 'scale(0.97)' : 'none')};
  filter: ${({ isRemoving }) => (isRemoving ? 'blur(1px)' : 'none')};
  pointer-events: ${({ isRemoving }) => (isRemoving ? 'none' : 'auto')};

  &:not(.disable-hover):hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;

  ${ProductCardStyled}:not(.disable-hover):hover & {
    transform: scale(1.05);
  }
`;

export const BookmarkIcon = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  transition: all 0.2s ease;
  pointer-events: auto;
  z-index: 1;
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: none;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const BrandName = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DeliveryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background-color: #10b981;
  color: white;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  width: fit-content;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PriceLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
