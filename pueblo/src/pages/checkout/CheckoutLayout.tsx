import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProduct } from "../product/catalogApi";
export const CheckoutLayout = styled.div`
 background:#fff; padding:40px 20px 64px; min-height:65vh; color:#222; font-family:inherit; font-size:13px;
 > main {max-width:640px;margin:auto;} h1{text-align:left;font-size:20px;font-weight:500;margin:0 0 28px;} h2{font-size:14px;font-weight:600;margin:24px 0 12px;}
 .card{background:#fff;border-top:1px solid #e5e5e5;padding:16px 0;margin-bottom:16px;}
 .fields{display:grid;grid-template-columns:1fr 1fr;gap:14px;} label{display:block;font-size:12px;} input:not([type=checkbox]){width:100%;height:38px;box-sizing:border-box;padding:0 10px;border:1px solid #ddd;border-radius:0;margin-top:6px;font:inherit;font-size:13px;background:#fff;color:#222;} input:focus-visible{outline:1px solid #222;outline-offset:1px;}
 .wide{grid-column:1/-1;} .muted{color:#888;font-size:12px;line-height:1.6;} .notice{font-size:13px;line-height:1.7;color:#a33;}
 button{cursor:pointer;font:inherit;} button:disabled{opacity:.45;cursor:default;}
 .primary{border:1px solid #111;background:#111;color:white;border-radius:0;min-height:40px;padding:10px 16px;font-size:13px;font-weight:500;width:100%;}
 .bottom{background:white;padding:16px 0;border-top:1px solid #eee;}
 .product{display:flex;gap:16px;align-items:center;padding:12px 0;border-bottom:1px solid #f1f1f1;} .product:last-child{border:0;} .product img{width:72px;height:86px;object-fit:contain;background:#fff;} .product p{margin:4px 0;font-size:13px;} .product strong{display:block;margin-top:8px;font-size:13px;}
 details{margin-top:20px;font-size:12px;} summary{cursor:pointer;padding:12px 0;}
 @media(max-width:600px){padding:28px 16px 40px;h1{font-size:18px;margin-bottom:24px;}.fields{grid-template-columns:1fr;}.wide{grid-column:auto;}.product{gap:12px;}}

`;
export function OrderProducts() {
 const [rows,setRows]=useState<{id:string;name:string;image?:string;option:string;quantity:number;price:number}[]>([]);const [error,setError]=useState(false);
 useEffect(()=>{const c=new AbortController();
  async function load(){try{const items=JSON.parse(sessionStorage.getItem('pueblo-checkout-items')||'[]') as {productId:string;skuId:string;quantity:number}[];const products=await Promise.all(items.map(async i=>{const p=await getProduct(i.productId,c.signal);const sku=p.skus.find(s=>s.id===i.skuId);return {id:i.skuId,name:p.name,image:p.images?.[0],option:sku?Object.values(sku.options).join(' / '):'옵션 확인 필요',quantity:i.quantity,price:sku?.price??p.salePrice};}));if(!c.signal.aborted)setRows(products);}catch{if(!c.signal.aborted)setError(true);}}
  void load();return()=>c.abort();},[]);
 return <><h2>주문 상품</h2><div className="card">{error?<p role="alert">상품 정보를 불러오지 못했습니다.</p>:rows.length?rows.map(r=><div className="product" key={r.id}><img src={r.image} alt={r.name}/><div><p>{r.name}</p><p className="muted">{r.option} · {r.quantity}개</p><strong>{(r.price*r.quantity).toLocaleString('ko-KR')}원</strong></div></div>):<p className="muted">선택한 상품 정보를 확인하고 있습니다.</p>}<p className="muted">최종 결제 금액은 주문 확인 후 표시됩니다.</p></div></>;
}
