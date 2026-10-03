import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { findBrands } from "./brands";
import * as S from "./BrandsPage.styled";

export default function BrandsPage() {
  const [query, setQuery] = useState("");
  const filtered = findBrands(query);

  return <S.Page>
    <S.Heading><h1>브랜드</h1><p>브랜드별 상품을 만나보세요.</p></S.Heading>
    <S.SearchField>
      <span>브랜드 검색</span>
      <div><Search size={18} aria-hidden="true" /><input type="search" value={query}
        onChange={(event) => setQuery(event.target.value)} placeholder="브랜드명을 입력하세요" /></div>
    </S.SearchField>
    <S.Count role="status">브랜드 {filtered.length}</S.Count>
    {filtered.length ? <S.Grid>
      {filtered.map((brand) => <S.BrandLink key={brand.slug} to={`/brands/${brand.slug}`}>
        <S.BrandLogo src={`/images/brands/${brand.slug}.png`} alt="" width={100} height={52} />
        <div><strong>{brand.name}</strong><span>{brand.korean}</span></div>
        <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </S.BrandLink>)}
    </S.Grid> : <S.Empty>
      <p>검색한 브랜드가 없습니다.</p>
      <button type="button" onClick={() => setQuery("")}>전체 브랜드 보기</button>
    </S.Empty>}
  </S.Page>;
}
