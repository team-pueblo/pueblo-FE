import React, { useState } from "react";
import {
  ProductCardStyled,
  ProductImageContainer,
  ProductImage,
  BookmarkIcon,
  ProductInfo,
  BrandName,
  ProductName,
  DeliveryBadge,
  PriceContainer,
  Price,
  PriceLabel,
} from "./ProductCard.styled";
import { LikeIcon } from "./LikeIcon";

interface ProductCardProps {
  image: string;
  brand: string;
  name: string;
  price: number;
  isQuickDelivery?: boolean;
  onRemove?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  brand,
  name,
  price,
  isQuickDelivery = false,
  onRemove,
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  const [isRemoving] = useState(false);

  const [liked, setLiked] = useState(true);

  return (
    <ProductCardStyled data-card isRemoving={isRemoving}>
      <ProductImageContainer>
        <ProductImage src={image} alt={name} />
        <BookmarkIcon
          onMouseEnter={(e) => {
            const card = (e.currentTarget.closest('[data-card]') as HTMLElement);
            if (card) card.classList.add('disable-hover');
          }}
          onMouseLeave={(e) => {
            const card = (e.currentTarget.closest('[data-card]') as HTMLElement);
            if (card) card.classList.remove('disable-hover');
          }}
          aria-label={liked ? "관심 해제" : "관심 추가"}
          onClick={(e) => {
            e.stopPropagation();
            if (isRemoving) return;
            setLiked((prev) => {
              const next = !prev;
              if (!next) {
                onRemove?.();
              }
              return next;
            });
          }}
        >
          <LikeIcon isFilled={liked} size={14} color="#ef4444" strokeColor="#fff" />
        </BookmarkIcon>
      </ProductImageContainer>
      
      <ProductInfo>
        <BrandName>{brand}</BrandName>
        <ProductName>{name}</ProductName>
        {isQuickDelivery && <DeliveryBadge>⚡ 빠른배송</DeliveryBadge>}
        
        <PriceContainer>
          <Price>{formatPrice(price)}원</Price>
          <PriceLabel>즉시 구매가</PriceLabel>
        </PriceContainer>
      </ProductInfo>
    </ProductCardStyled>
  );
};
