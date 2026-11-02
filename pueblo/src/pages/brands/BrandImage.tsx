import { useState } from "react";
import { brandLogo } from "./brandLogo";
import { BrandLogo } from "./BrandsPage.styled";
export default function BrandImage({brand}:{brand:{name:string;logoUrl?:string|null}}){
 const [failed,setFailed]=useState(false);const src=brandLogo(brand);
 return src&&!failed?<BrandLogo src={src} alt="" width={100} height={52} onError={()=>setFailed(true)}/>:null;
}
