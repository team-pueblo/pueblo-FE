import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBrand, type Brand } from "../product/catalogApi";
import RemoteCatalog from "../product/RemoteCatalog";
import BrandImage from "./BrandImage";
import * as S from "./BrandsPage.styled";
export default function BrandProductsPage() {
 const {slug}=useParams();const [brand,setBrand]=useState<Brand|null>(null);const [error,setError]=useState(false);
 useEffect(()=>{const c=new AbortController();setBrand(null);setError(false);if(slug)getBrand(slug,c.signal).then(data=>{if(!c.signal.aborted)setBrand(data);}).catch(()=>{if(!c.signal.aborted)setError(true);});return()=>c.abort();},[slug]);
 return <S.Page><S.BackLink to="/brands">전체 브랜드</S.BackLink>{error?<S.Empty><p role="alert">브랜드를 불러오지 못했습니다.</p><Link to="/brands">전체 브랜드 보기</Link></S.Empty>:!brand?<p role="status">브랜드를 불러오는 중입니다.</p>:<><S.Heading><BrandImage key={brand.id} brand={brand}/><h1>{brand.name}</h1>{brand.koreanName&&<p>{brand.koreanName}</p>}</S.Heading><RemoteCatalog key={brand.slug} filter={{brandSlug:brand.slug}}/></>}</S.Page>;
}
