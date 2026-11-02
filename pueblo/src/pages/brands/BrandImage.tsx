import { useState } from "react";
import { brandLogo } from "./brandLogo";
import { BrandLogo } from "./BrandsPage.styled";
import styled from "styled-components";
const LogoArea=styled.div`
 grid-column:1 / -1;height:100px;display:flex;align-items:center;
 .brand-wordmark{font-size:22px;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:#222;margin:0;max-width:240px;overflow-wrap:anywhere;}
 @media(max-width:768px){height:76px;.brand-wordmark{font-size:18px;}}
`;
export default function BrandImage({brand}:{brand:{name:string;logoUrl?:string|null}}){
 const [failed,setFailed]=useState(false);const src=brandLogo(brand);
 return <LogoArea>{src&&!failed?<BrandLogo src={src} alt="" width={100} height={52} onError={()=>setFailed(true)}/>:<span className="brand-wordmark" aria-hidden="true">{brand.name}</span>}</LogoArea>;
}
