import * as S from "./MainPage.styled";

import { catalogProducts } from "../product/catalog";

const ProductListing = () => (
      <S.ProductGrid>
        {catalogProducts.map((product) => (
          <S.ProductCard key={product.id} to={`/product/${product.id}`}>
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
);

export default ProductListing;
