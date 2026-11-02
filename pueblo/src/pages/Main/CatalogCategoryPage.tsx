import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategories } from "../product/catalogApi";
import RemoteCatalog from "../product/RemoteCatalog";
import { MainPageContainer } from "./MainPage.styled";
export default function CatalogCategoryPage(){
 const {slug}=useParams();const [categories,setCategories]=useState<Awaited<ReturnType<typeof getCategories>>|null>(null);const [error,setError]=useState(false);
 useEffect(()=>{const c=new AbortController();getCategories(c.signal).then(data=>{if(!c.signal.aborted)setCategories(data);}).catch(()=>{if(!c.signal.aborted)setError(true);});return()=>c.abort();},[]);
 const category=categories?.find(c=>c.slug===slug);
 const labels:Record<string,string>={jacket:"자켓",tshirt:"상의",pants:"바지",shoes:"신발",hat:"모자",accessory:"액세서리"};
 return <MainPageContainer><h1 style={{fontSize:18,fontWeight:500,textAlign:"center",margin:"32px 0"}}>{category?(labels[category.slug]??category.name):"상품 카테고리"}</h1>
 {error?<p role="alert">카테고리를 불러오지 못했습니다.</p>:!categories?<p role="status">카테고리를 불러오는 중입니다.</p>:!category?<p>존재하지 않는 카테고리입니다. <Link to="/">홈으로 돌아가기</Link></p>:<><nav aria-label="상품 분류" style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:20,marginBottom:32}}>{categories.map(c=><Link key={c.id} to={`/categories/${encodeURIComponent(c.slug)}`} aria-current={c.id===category.id?"page":undefined} style={{color:c.id===category.id?"#111":"#777",fontSize:13,textDecoration:c.id===category.id?"underline":"none"}}>{labels[c.slug]??c.name}</Link>)}</nav><RemoteCatalog key={category.id} filter={{categoryId:category.id}}/></>}
 </MainPageContainer>;
}
