import { brandLogo } from "../brands/brandLogo";
import { useState } from "react";
import styled from "styled-components";
const Mark=styled.div`
 margin-bottom:28px;min-height:48px;display:flex;align-items:center;
 img{display:block;max-width:150px;max-height:60px;object-fit:contain;object-position:left center;}
 span{font-size:22px;font-weight:600;letter-spacing:.04em;line-height:1.3;overflow-wrap:anywhere;}
`;
export default function ProductBrand({brand}:{brand:{name:string;logoUrl?:string|null}}){
 const [failed,setFailed]=useState(false);const src=brandLogo(brand);
 return <Mark>{src&&!failed?<img src={src} alt={brand.name} onError={()=>setFailed(true)}/>:<span>{brand.name}</span>}</Mark>;
}
