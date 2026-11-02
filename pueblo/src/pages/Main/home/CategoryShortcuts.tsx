import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCategories } from "../../product/catalogApi";
import * as S from "./Home.styled";
const CategoryGrid = styled(S.ShortcutGrid)`
 grid-template-columns:repeat(6,minmax(0,1fr));
 @media(max-width:768px){grid-template-columns:repeat(3,minmax(0,1fr));}
`;
const categoryLabels:Record<string,string>={jacket:"자켓",tshirt:"상의",pants:"바지",shoes:"신발",hat:"모자",accessory:"액세서리"};
const spriteIndexes:Record<string,number>={jacket:0,tshirt:6,pants:7,shoes:9,hat:12,accessory:14};
export default function CategoryShortcuts() {
 const [categories,setCategories]=useState<Awaited<ReturnType<typeof getCategories>>>([]);const [error,setError]=useState(false);
 useEffect(()=>{const c=new AbortController();getCategories(c.signal).then(data=>{if(!c.signal.aborted)setCategories(data);}).catch(()=>{if(!c.signal.aborted)setError(true);});return()=>c.abort();},[]);
 if(error)return <p role="status">카테고리를 불러오지 못했습니다. 잠시 후 새로고침해주세요.</p>;
 return <CategoryGrid aria-label="상품 카테고리 바로가기">
    {categories.map(c=>{const index=spriteIndexes[c.slug];return <S.ShortcutLink key={c.id} to={`/categories/${encodeURIComponent(c.slug)}`}>
      {index!==undefined&&<S.ShortcutImage aria-hidden="true" style={{ backgroundPosition: `${(index%4)*100/3}% ${Math.floor(index/4)*100/3}%` }} />}
      <span>{categoryLabels[c.slug]??c.name}</span>
    </S.ShortcutLink>;})}
  </CategoryGrid>;
}
