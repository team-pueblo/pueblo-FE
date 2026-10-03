import { Link, useParams } from "react-router-dom";
import ProductListing from "../Main/ProductListing";
import { brands, getBrandProducts } from "./brands";
import * as S from "./BrandsPage.styled";

export default function BrandProductsPage() {
  const { slug } = useParams();
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) return <S.Page><S.Empty>
    <p>브랜드를 찾을 수 없습니다.</p><Link to="/brands">전체 브랜드 보기</Link>
  </S.Empty></S.Page>;

  const products = getBrandProducts(brand.name);
  return <S.Page>
    <S.BackLink to="/brands">전체 브랜드</S.BackLink>
    <S.Heading><S.BrandLogo src={`/images/brands/${brand.slug}.png`} alt="" width={100} height={52} /><h1>{brand.name}</h1><p>{brand.korean}</p></S.Heading>
    <S.Count>상품 {products.length}</S.Count>
    {products.length ? <ProductListing products={products} /> : <S.Empty>
      <p>상품을 준비 중입니다.</p>
      <span>{brand.name}의 새로운 상품을 기다려 주세요.</span>
      <Link to="/brands">다른 브랜드 둘러보기</Link>
    </S.Empty>}
  </S.Page>;
}
