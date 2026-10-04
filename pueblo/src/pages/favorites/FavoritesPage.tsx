import { useState } from "react";
import { captureHandledError } from "../../monitoring/errors";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { catalogProducts } from "../product/catalog";
import { useFavorites } from "./useFavorites";
import * as Product from "../Main/MainPage.styled";
import * as S from "./FavoritesPage.styled";

export default function FavoritesPage() {
  const { ids, setFavorite } = useFavorites();
  const [message, setMessage] = useState("");
  const products = ids.flatMap((id) => catalogProducts.filter((product) => product.id === id));
  const remove = (id: number) => {
    try {
      setFavorite(id, false);
      setMessage("관심목록에서 삭제했습니다.");
    } catch (error) {
      captureHandledError(error, { feature: "favorites", action: "remove" });
      setMessage("관심목록을 저장하지 못했습니다. 브라우저 저장 공간을 확인해주세요.");
    }
  };

  return (
    <S.Page>
      <S.Heading>
        <h1>관심목록</h1>
        <span>상품 {products.length}</span>
      </S.Heading>
      <S.Message role="status">{message}</S.Message>
      {products.length ? <Product.ProductGrid>
        {products.map((product) => <S.Item key={product.id}>
          <Product.ProductCard to={`/product/${product.id}`}>
            <Product.ProductImage src={product.imageUrl} alt={product.name} />
            <Product.ProductInfo>
              <Product.ProductBrand>{product.brand}</Product.ProductBrand>
              <Product.ProductName>{product.name}</Product.ProductName>
              <Product.ProductPrice>{product.price.toLocaleString("ko-KR")}원</Product.ProductPrice>
            </Product.ProductInfo>
          </Product.ProductCard>
          <S.RemoveButton type="button" aria-label={`${product.name} 관심목록에서 삭제`} onClick={() => remove(product.id)}>
            <Trash2 size={16} strokeWidth={1.5} aria-hidden="true" />
            <span>삭제</span>
          </S.RemoveButton>
        </S.Item>)}
      </Product.ProductGrid> : <S.EmptyState>
        <Heart size={28} strokeWidth={1.2} aria-hidden="true" />
        <p>아직 관심 상품이 없습니다.</p>
        <span>상품 상세에서 하트를 눌러 마음에 드는 상품을 담아보세요.</span>
        <Link to="/">상품 둘러보기</Link>
      </S.EmptyState>}
    </S.Page>
  );
}
