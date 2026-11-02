import { useState } from "react";
import { brandLogo } from "./brandLogo";
import { BrandLogo } from "./BrandsPage.styled";
import styled from "styled-components";
import bounds from "./logoBounds.json";
const LogoArea=styled.div`
 grid-column:1 / -1;height:100px;display:flex;align-items:center;
 > svg, > img { width:140px; height:64px; max-width:100%; }
 .brand-wordmark{font-size:22px;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:#222;margin:0;max-width:240px;overflow-wrap:anywhere;}
 @media(max-width:768px){height:76px;> svg, > img{width:112px;height:52px;}.brand-wordmark{font-size:18px;}}
`;
export default function BrandImage({brand}:{brand:{name:string;logoUrl?:string|null}}){
 const [failed,setFailed]=useState(false);const src=brandLogo(brand);
 const box=src ? (bounds as Record<string,{width:number;height:number;viewBox:string}>)[src] : undefined;
 return <LogoArea>{src&&!failed ? box ? <svg viewBox={box.viewBox} preserveAspectRatio="xMinYMid meet" aria-hidden="true"><image href={src} width={box.width} height={box.height} onError={()=>setFailed(true)}/></svg> : <BrandLogo src={src} alt="" width={140} height={64} onError={()=>setFailed(true)}/> : <span className="brand-wordmark" aria-hidden="true">{brand.name}</span>}</LogoArea>;
}
