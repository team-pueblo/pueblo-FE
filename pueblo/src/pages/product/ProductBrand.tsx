import { brandLogo } from "../brands/brandLogo";
import { useState } from "react";
import styled from "styled-components";
import bounds from "../brands/logoBounds.json";
const Mark=styled.div`
 margin-bottom:28px;min-height:48px;display:flex;align-items:center;
 img,svg{display:block;width:140px;max-width:100%;height:64px;object-fit:contain;object-position:left center;}
 span{font-size:22px;font-weight:600;letter-spacing:.04em;line-height:1.3;overflow-wrap:anywhere;}
`;
export default function ProductBrand({brand}:{brand:{name:string;logoUrl?:string|null}}){
 const [failed,setFailed]=useState(false);const src=brandLogo(brand);
 const box=src ? (bounds as Record<string,{width:number;height:number;viewBox:string}>)[src] : undefined;
 return <Mark>{src&&!failed ? box ? <svg viewBox={box.viewBox} preserveAspectRatio="xMinYMid meet" role="img" aria-label={brand.name}><image href={src} width={box.width} height={box.height} onError={()=>setFailed(true)}/></svg> : <img src={src} alt={brand.name} onError={()=>setFailed(true)}/> : <span>{brand.name}</span>}</Mark>;
}
