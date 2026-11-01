import { useEffect, useState } from "react";
import { getProducts, type Product, type CatalogFilter } from "./catalogApi";
import * as S from "../Main/MainPage.styled";
export default function RemoteCatalog({filter = {}}: {filter?: CatalogFilter}) {
 const filterKey = JSON.stringify(filter);
 const [page,setPage]=useState(1);const [items,setItems]=useState<Product[]>([]);const [total,setTotal]=useState(0);const [loading,setLoading]=useState(true);const [error,setError]=useState(false);
 useEffect(()=>{const c=new AbortController(); setLoading(true);setError(false);setItems([]);
 getProducts(page,c.signal,JSON.parse(filterKey)).then(data=>{if(!c.signal.aborted){setItems(data.items);setTotal(data.total);}}).catch(()=>{if(!c.signal.aborted)setError(true);}).finally(()=>{if(!c.signal.aborted)setLoading(false);});return ()=>c.abort();},[page,filterKey]);
 return <section aria-label="상품 목록">
 {loading && <p role="status">상품을 불러오는 중입니다.</p>}{error && <p role="alert">상품을 불러오지 못했습니다. 카탈로그 서버 연결을 확인해주세요.</p>}
 <S.ProductGrid>{items.map(p=><S.ProductCard key={p.id} to={`/product/${p.id}`}><S.ProductImage src={p.imageUrl} alt={p.name}/><S.ProductInfo><S.ProductBrand>{p.brand?.name}</S.ProductBrand><S.ProductName>{p.name}</S.ProductName><S.ProductPrice>{p.salePrice.toLocaleString("ko-KR")}원</S.ProductPrice>{p.saleStatus!=="ON_SALE" && <span>판매 중지</span>}</S.ProductInfo></S.ProductCard>)}</S.ProductGrid>
 {!loading && !error && items.length===0 && <p>등록된 상품이 없습니다.</p>}
 <nav aria-label="상품 페이지" style={{display:"flex",justifyContent:"center",gap:20,margin:"32px 0"}}><button disabled={loading||page===1} onClick={()=>setPage(p=>p-1)}>이전</button><span>{page}</span><button disabled={loading||page*20>=total} onClick={()=>setPage(p=>p+1)}>다음</button></nav>
 </section>;
}
