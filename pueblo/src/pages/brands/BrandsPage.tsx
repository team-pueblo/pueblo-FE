import { useEffect, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getBrands, type Brand } from "../product/catalogApi";
import BrandImage from "./BrandImage";
import * as S from "./BrandsPage.styled";
export default function BrandsPage() {
 const [params,setParams]=useSearchParams();const query=params.get('q')??'';const page=Math.max(1,Number(params.get('page'))||1);
 const [brands,setBrands]=useState<Brand[]>([]);const [total,setTotal]=useState(0);const [loading,setLoading]=useState(true);const [error,setError]=useState(false);
 useEffect(()=>{const c=new AbortController();setLoading(true);setError(false);setBrands([]);const timer=setTimeout(()=>{getBrands(page,query.trim(),c.signal).then(data=>{if(!c.signal.aborted){setBrands(data.items);setTotal(data.total);}}).catch(()=>{if(!c.signal.aborted)setError(true);}).finally(()=>{if(!c.signal.aborted)setLoading(false);});},200);return()=>{clearTimeout(timer);c.abort();};},[page,query]);
 const changePage=(next:number)=>setParams({...query?{q:query}:{},page:String(next)});
 return <S.Page><S.Heading><h1>브랜드</h1><p>브랜드별 상품을 만나보세요.</p></S.Heading>
 <S.SearchField><span>브랜드 검색</span><div><Search size={18} aria-hidden="true"/><input type="search" value={query} onChange={e=>setParams(e.target.value?{q:e.target.value}:{},{replace:true})} placeholder="브랜드명을 입력하세요"/></div></S.SearchField>
 <S.Count role="status">{loading?'브랜드를 불러오는 중입니다.':error?'브랜드를 불러오지 못했습니다.':`브랜드 ${total}`}</S.Count>
 {error?<S.Empty><p role="alert">서버 연결을 확인하고 다시 시도해주세요.</p><button onClick={()=>window.location.reload()}>다시 시도</button></S.Empty>:!loading&&brands.length===0?<S.Empty><p>검색한 브랜드가 없습니다.</p><button onClick={()=>setParams({})}>전체 브랜드 보기</button></S.Empty>:<S.Grid>{brands.map(brand=><S.BrandLink key={brand.id} to={`/brands/${encodeURIComponent(brand.slug)}`}><BrandImage brand={brand}/><div><strong>{brand.name}</strong>{brand.koreanName&&<span>{brand.koreanName}</span>}</div><ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true"/></S.BrandLink>)}</S.Grid>}
 {!error&&<S.Pagination aria-label="브랜드 페이지"><button disabled={loading||page===1} onClick={()=>changePage(page-1)}>이전</button><span>{page}</span><button disabled={loading||page*24>=total} onClick={()=>changePage(page+1)}>다음</button></S.Pagination>}
 </S.Page>;
}
