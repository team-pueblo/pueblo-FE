import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct, skuLimit, type Product } from "./catalogApi";
import { addCartItem } from "../cart/cartStorage";
import * as S from "./ProductDetailPage.styled";
export default function RemoteProduct({id}:{id:string}) {
 const [product,setProduct]=useState<Product|null>(null); const [skuId,setSkuId]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 useEffect(()=>{const c=new AbortController();getProduct(id,c.signal).then(p=>{if(!c.signal.aborted)setProduct(p);}).catch(()=>{if(!c.signal.aborted)setError("상품을 불러오지 못했습니다.");});return ()=>c.abort();},[id]);
 const sku=product?.skus.find(s=>s.id===skuId);
 async function add(){
  if(!product||!sku||busy)return;setBusy(true);setMessage("");
  try {
   const current=await getProduct(id);setProduct(current);const selected=current.skus.find(s=>s.id===skuId);
   if(current.saleStatus!=="ON_SALE"||current.currency!=="KRW"||!selected||skuLimit(selected)<1)throw new Error("판매 상태 또는 재고가 변경되었습니다. 옵션을 다시 확인해주세요.");
   const ok=addCartItem({id:`sku-${selected.id}`,productId:current.id,skuId:selected.id,brand:current.brand?.name||"",name:current.name,price:selected.price,img:current.images?.[0]||"",qty:1,option:Object.values(selected.options).join(" / "),maxQuantity:skuLimit(selected),condition:"새상품"});
   setMessage(ok?"장바구니에 담았습니다.":"구매 가능한 수량을 초과했습니다.");
  }catch(e){setMessage(e instanceof Error?e.message:"장바구니에 담지 못했습니다.");}finally{setBusy(false);}
 }
 if(!product)return <S.Page><p role="status">{error||"상품을 불러오는 중입니다."}</p><Link to="/">상품 목록</Link></S.Page>;
 return <S.Page><S.Container><S.Main><S.Viewer><img src={product.images?.[0]} alt={product.name}/></S.Viewer><S.Panel><S.PanelTop>{product.brand?.name}</S.PanelTop><S.Title>{product.name}</S.Title><S.PriceRow>{(sku?.price??product.salePrice).toLocaleString("ko-KR")}원</S.PriceRow>
 <label htmlFor="sku-select">상품 옵션</label><select id="sku-select" disabled={busy} value={skuId} onChange={e=>setSkuId(e.target.value)} style={{width:"100%",padding:12,margin:"12px 0"}}><option value="">옵션을 선택해주세요</option>{product.skus.map(s=><option key={s.id} value={s.id} disabled={skuLimit(s)<1}>{Object.values(s.options).join(" / ")}{skuLimit(s)<1?" (품절)":""}</option>)}</select>
 {sku && <S.SmallText>구매 가능 수량: {skuLimit(sku)}개</S.SmallText>}
 <S.CTA><S.CartButton disabled={busy||!sku||skuLimit(sku)<1||product.saleStatus!=="ON_SALE"||product.currency!=="KRW"} onClick={()=>void add()}>{busy?"확인 중…":"장바구니 담기"}</S.CartButton></S.CTA>
 {message&&<S.SmallText role="status">{message}</S.SmallText>}<Link to="/cart">장바구니 보기</Link></S.Panel></S.Main></S.Container></S.Page>;
}
