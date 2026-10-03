import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import ProductListing from "../Main/ProductListing";
import { searchProducts } from "./searchProducts";
import * as S from "./SearchPage.styled";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const products = query ? searchProducts(query) : [];

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    setParams(value ? { q: value } : {});
  };

  return (
    <S.Page>
      <S.SearchArea>
        <S.Title>검색</S.Title>
        <S.SearchForm key={query} role="search" onSubmit={search}>
          <label htmlFor="product-search">상품명 또는 브랜드</label>
          <div className="input-row">
            <input id="product-search" name="q" type="search" defaultValue={query}
              placeholder="상품명 또는 브랜드를 입력하세요" enterKeyHint="search" />
            <button type="submit" aria-label="상품 검색"><Search size={20} strokeWidth={1.5} aria-hidden="true" /></button>
          </div>
        </S.SearchForm>
        <S.Examples aria-label="검색어 예시">
          <span>검색어 예시</span>
          {["ASICS", "자켓", "비니"].map((term) => (
            <button key={term} type="button" onClick={() => setParams({ q: term })}>{term}</button>
          ))}
        </S.Examples>
      </S.SearchArea>

      {query && <>
      <S.ResultHeader>
        <p role="status">‘{query}’ 검색 결과 <strong>{products.length}</strong></p>
        <button type="button" onClick={() => setParams({})}>검색 초기화</button>
      </S.ResultHeader>
      {products.length ? <ProductListing products={products} /> : (
        <S.EmptyState>
          <p>검색 결과가 없습니다.</p>
          <span>상품명이나 브랜드를 다른 검색어로 입력해 보세요.</span>
          <button type="button" onClick={() => setParams({})}>검색 초기화</button>
        </S.EmptyState>
      )}
      </>}
    </S.Page>
  );
}
