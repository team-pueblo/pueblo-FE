import React from "react";
import { PurchaseItemStyled, ProductImageStyled, ProductImageTag, ProductImageEmoji, ProductInfoStyled, ProductNameStyled, ProductSizeStyled, StatusStyled } from "./PurchaseItem.styled";

interface PurchaseItemProps {
  imageUrl?: string;
  image?: string;
  name: string;
  size?: string;
  status: string;
  statusColor: "error" | "secondary";
}

export const PurchaseItem: React.FC<PurchaseItemProps> = ({
  imageUrl,
  image,
  name,
  size,
  status,
  statusColor,
}) => {
  return (
    <PurchaseItemStyled>
      <ProductImageStyled>
        {imageUrl ? (
          <ProductImageTag src={imageUrl} alt={name} />
        ) : (
          <ProductImageEmoji>{image}</ProductImageEmoji>
        )}
      </ProductImageStyled>
      <ProductInfoStyled>
        <ProductNameStyled>{name}</ProductNameStyled>
        {size && <ProductSizeStyled>Size: {size}</ProductSizeStyled>}
      </ProductInfoStyled>
      <StatusStyled $statusColor={statusColor}>{status}</StatusStyled>
    </PurchaseItemStyled>
  );
};
