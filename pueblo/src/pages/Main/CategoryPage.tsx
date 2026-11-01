import { useEffect, useState } from "react";
import { MainPageContainer } from "./MainPage.styled";
import * as S from "./MainHeader.styled";
import RemoteCatalog from "../product/RemoteCatalog";
import { getCategories } from "../product/catalogApi";
export default function CategoryPage({title}:{title:string}) {
 const [categories,setCategories]=useState<{id:string;name:string}[]>([]);const [categoryId,setCategoryId]=useState("");
 useEffect(()=>{const c=new AbortController();getCategories(c.signal).then(setCategories).catch(()=>{});return ()=>c.abort();},[]);
 const collection=({"남성":"men","여성":"women","생활":"lifestyle"} as Record<string,string>)[title];
 return <MainPageContainer><S.MainHeaderContainer><S.SubNavContainer><S.BrandTitle>{title}</S.BrandTitle><S.CategoryContainer>
 {[{id:"",name:"전체"},...categories].map(c=><S.CategoryLink key={c.id} href="#" $isActive={c.id===categoryId} onClick={e=>{e.preventDefault();setCategoryId(c.id);}}>{c.name}</S.CategoryLink>)}
 </S.CategoryContainer></S.SubNavContainer></S.MainHeaderContainer><RemoteCatalog key={`${title}-${categoryId}`} filter={{categoryId:categoryId||undefined,collection,onSale:title==="세일"?true:undefined}}/></MainPageContainer>;
}
