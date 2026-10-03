import React from "react";
import * as S from "./MainPage.styled"; // 변경된 스타일 파일 import
import MainHeader from "./MainHeader";

const products = [
  // ... (이전과 동일한 상품 데이터)
  {
    id: 1,
    brand: "ASICS",
    name: "WINTER RUN BEANIE",
    price: 30000,
    imageUrl:
      "https://image.msscdn.net/thumbnails/images/goods_img/20230817/3473153/3473153_17542954015640_big.jpg?w=1200",
    isNew: false,
  },
  {
    id: 2,
    brand: "ASICS",
    name: "ROAD WINTER JACKET",
    price: 245000,
    imageUrl:
      "https://image.msscdn.net/thumbnails/images/goods_img/20231006/3608998/3608998_16971799016828_big.jpg?w=1200",
    isNew: true,
  },
  {
    id: 3,
    brand: "ASICS",
    name: "ROAD WINTER JACKET",
    price: 245000,
    imageUrl:
      "https://image.msscdn.net/thumbnails/images/goods_img/20240819/4344495/4344495_17576476281663_big.jpg?w=1200",
    isNew: true,
  },
  {
    id: 4,
    brand: "ASICS",
    name: "ROAD WINTER JACKET",
    price: 255000,
    imageUrl:
      "https://image.msscdn.net/thumbnails/images/goods_img/20230306/3125292/3125292_16976153322800_big.jpg?w=1200",
    isNew: true,
  },
  {
    id: 5,
    brand: "ASICS",
    name: "ROAD WINTER JACKET",
    price: 245000,
    imageUrl:
      "https://image.msscdn.net/thumbnails/images/goods_img/20240819/4344495/4344495_17576476281663_big.jpg?w=1200",
    isNew: false,
  },
  {
    id: 6,
    brand: "ASICS",
    name: "ROAD WINTER JACKET",
    price: 255000,
    imageUrl:
      "https://image.msscdn.net/thumbnails/images/goods_img/20230306/3125292/3125292_16976153322800_big.jpg?w=1200",
    isNew: false,
  },
];

const MainPage: React.FC = () => {
  return (
    <S.MainPageContainer>
      <MainHeader />
      <S.ProductGrid>
        {products.map((product) => (
          <S.ProductCard key={product.id}>
            <S.ProductImage src={product.imageUrl} alt={product.name} />
            <S.ProductInfo>
              {product.isNew && <S.ProductTag>신상품</S.ProductTag>}
              <S.ProductBrand>{product.brand}</S.ProductBrand>
              <S.ProductName>{product.name}</S.ProductName>
              <S.ProductPrice>
                {product.price.toLocaleString("ko-KR")}원
              </S.ProductPrice>
            </S.ProductInfo>
          </S.ProductCard>
        ))}
      </S.ProductGrid>
    </S.MainPageContainer>
  );
};

export default MainPage;
