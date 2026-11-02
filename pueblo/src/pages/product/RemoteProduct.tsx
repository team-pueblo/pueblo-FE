import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProduct, skuLimit, type Product } from "./catalogApi";
import { addCartItem } from "../cart/cartStorage";
import styled from "styled-components";
import { X } from "lucide-react";
import ProductBrand from "./ProductBrand";
import ProductInformation from "./ProductInformation";
import * as S from "./ProductDetailPage.styled";
const Details = styled(S.Panel)`
 align-self:center;width:100%;max-width:440px;justify-self:center;box-sizing:border-box;padding:32px 20px;
 h1{font-size:16px;line-height:1.7;} > a{display:flex;align-items:center;justify-content:center;min-height:40px;border:1px solid #e5e5e5;color:#222;text-decoration:none;font-size:13px;}
 @media(max-width:768px){max-width:none;padding:12px 0 0;}
`;
const PurchaseDialog = styled.dialog`
 border:0;border-radius:20px;padding:0;width:min(520px,calc(100vw - 32px));max-height:85dvh;color:#222;box-shadow:0 15px 60px #0002;
 &::backdrop{background:#0006;} .head{padding:22px;border-bottom:1px solid #eee;} .close{border:0;background:none;display:block;padding:0;margin-bottom:20px;cursor:pointer;}
 .product{display:flex;gap:18px;align-items:center;} img{width:64px;height:76px;object-fit:contain;} h2{font-size:15px;margin:0 0 8px;} p{font-size:13px;color:#888;}
 .options{padding:20px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;min-height:180px;align-content:start;}
 .option{padding:14px 8px;border:1px solid #ddd;border-radius:10px;background:white;cursor:pointer;font:inherit;font-size:13px;} .option[aria-pressed=true]{border:2px solid #222;font-weight:600;} .option span{display:block;color:#ef6253;margin-top:6px;} button:disabled{opacity:.4;cursor:default;}
 .actions{padding:20px;background:white;position:sticky;bottom:0;border-top:1px solid #eee;} .buttons{display:flex;gap:8px;} .buttons button{flex:1;padding:18px 8px;border:0;border-radius:10px;background:#222;color:white;font:inherit;font-weight:600;cursor:pointer;} .buttons button:last-child{background:#ef6253;}
 @media(max-width:600px){margin:auto auto 0;width:100%;max-width:100%;border-radius:18px 18px 0 0;}
`;
export default function RemoteProduct({id}:{id:string}) {
 const [product,setProduct]=useState<Product|null>(null); const [skuId,setSkuId]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 useEffect(()=>{const c=new AbortController();getProduct(id,c.signal).then(p=>{if(!c.signal.aborted)setProduct(p);}).catch(()=>{if(!c.signal.aborted)setError("상품을 불러오지 못했습니다.");});return ()=>c.abort();},[id]);
 const dialog = useRef<HTMLDialogElement>(null); const navigate=useNavigate();
 const sku=product?.skus.find(s=>s.id===skuId);
 async function add(buyNow=false){
  if(!product||!sku||busy)return;setBusy(true);setMessage("");
  try {
   const current=await getProduct(id);setProduct(current);const selected=current.skus.find(s=>s.id===skuId);
   if(current.saleStatus!=="ON_SALE"||current.currency!=="KRW"||!selected||skuLimit(selected)<1)throw new Error("판매 상태 또는 재고가 변경되었습니다. 옵션을 다시 확인해주세요.");
   if(buyNow){
    sessionStorage.setItem("pueblo-checkout-items",JSON.stringify([{productId:current.id,skuId:selected.id,quantity:1}]));
    dialog.current?.close();navigate("/checkout/new");return;
   }
   const ok=addCartItem({id:`sku-${selected.id}`,productId:current.id,skuId:selected.id,brand:current.brand?.name||"",name:current.name,price:selected.price,img:current.images?.[0]||"",qty:1,option:Object.values(selected.options).join(" / "),maxQuantity:skuLimit(selected),condition:"새상품"});
   setMessage(ok?"장바구니에 담았습니다.":"구매 가능한 수량을 초과했습니다.");
  }catch(e){setMessage(e instanceof Error?e.message:"장바구니에 담지 못했습니다.");}finally{setBusy(false);}
 }
 if(!product)return <S.Page><p role="status">{error||"상품을 불러오는 중입니다."}</p><Link to="/">상품 목록</Link></S.Page>;
 return <S.Page><S.Container><S.Main><S.Viewer><img src={product.images?.[0]} alt={product.name}/></S.Viewer><Details><ProductBrand key={product.brand?.name} brand={product.brand??{name:"pueblo"}}/><S.Title>{product.name}</S.Title><S.PriceRow>{(sku?.price??product.salePrice).toLocaleString("ko-KR")}원</S.PriceRow>
 <S.CTA><S.CartButton disabled={product.saleStatus!=="ON_SALE"||product.currency!=="KRW"} onClick={()=>{setMessage("");dialog.current?.showModal();}}>구매하기</S.CartButton></S.CTA>
 <ProductInformation product={product}/>
 <PurchaseDialog ref={dialog} aria-labelledby="purchase-title" onClick={e=>{if(e.target===dialog.current&&!busy)dialog.current.close();}} onCancel={e=>{if(busy)e.preventDefault();}}>
 <div className="head"><button className="close" aria-label="닫기" disabled={busy} onClick={()=>dialog.current?.close()}><X size={24}/></button><div className="product"><img src={product.images?.[0]} alt=""/><div><h2 id="purchase-title">{product.name}</h2><p>{product.brand?.name}</p></div></div></div>
 <div className="options">{product.skus.map(s=><button className="option" key={s.id} aria-pressed={skuId===s.id} disabled={busy||skuLimit(s)<1} onClick={()=>{setSkuId(s.id);setMessage("");}}>{Object.values(s.options).join(" / ")}<span>{skuLimit(s)<1?"품절":`${s.price.toLocaleString("ko-KR")}원`}</span></button>)}</div>
 <div className="actions"><p>{sku?`선택 옵션: ${Object.values(sku.options).join(" / ")}`:"구매할 옵션을 선택해주세요."}</p>{message&&<p role="status">{message} <Link to="/cart">장바구니 보기</Link></p>}<div className="buttons"><button disabled={busy||!sku||skuLimit(sku)<1} onClick={()=>void add()}>장바구니 담기</button><button disabled={busy||!sku||skuLimit(sku)<1} onClick={()=>void add(true)}>{busy?"확인 중…":"즉시 구매하기"}</button></div></div>
 </PurchaseDialog></Details></S.Main></S.Container></S.Page>;
}
