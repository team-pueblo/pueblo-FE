import { Link } from "react-router-dom";
import { featuredProducts } from "./homeContent";
import * as S from "./Home.styled";

export default function FeaturedProducts() {
  return <section aria-labelledby="featured-products-title">
    <S.SectionHeading><h2 id="featured-products-title">지금 주목할 아이템</h2><Link to="/search?q=ASICS">전체 보기</Link></S.SectionHeading>
    <S.FeaturedGrid>
      {featuredProducts.map((product) => <S.FeaturedCard key={product.id} to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <strong>{product.brand}</strong>
        <p>{product.name}</p>
        <b>{product.price.toLocaleString("ko-KR")}원</b>
      </S.FeaturedCard>)}
    </S.FeaturedGrid>
  </section>;
}
