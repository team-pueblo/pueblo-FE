import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOrder, getOrders, payable, paymentStatus, recheckPayment, message, type ServerOrder } from "./paymentApi";
import { getProduct } from "../product/catalogApi";
const Layout=styled.div`
 max-width:1100px;margin:60px auto;padding:0 24px;display:grid;grid-template-columns:180px minmax(0,1fr);gap:50px;color:#222;
 aside p{color:#aaa;font-size:13px;} aside a{display:block;margin:24px 0;} a{color:inherit;text-decoration:none;} h1{font-size:25px;margin:0 0 40px;} h2{font-size:17px;margin:28px 0 16px;} .number{font-size:13px;overflow-wrap:anywhere;padding-bottom:18px;border-bottom:1px solid #eee;}
 .product{display:flex;gap:20px;padding:24px 0;align-items:center;} .product img{width:90px;height:100px;object-fit:contain;background:#f5f5f5;border-radius:12px;} .product p{margin:6px 0;font-size:14px;} .muted{color:#999;font-size:13px;} .status{background:#faf6f5;padding:24px;margin:24px 0;line-height:1.7;} .status strong{display:block;border-top:4px solid #222;padding-top:16px;} dl{border-top:2px solid #222;padding-top:16px;} dl div{display:flex;justify-content:space-between;gap:24px;padding:12px 0;font-size:14px;} dd{margin:0;text-align:right;overflow-wrap:anywhere;} dt{color:#777;flex-shrink:0;}
 button,.button{border:1px solid #ddd;border-radius:10px;padding:12px 20px;background:white;cursor:pointer;font:inherit;font-size:13px;display:inline-block;margin:8px 8px 8px 0;} button:disabled{opacity:.5;} .primary{background:#222;color:white;} .order{display:block;padding:24px 0;border-bottom:1px solid #eee;} .order strong{display:block;margin-bottom:12px;} .notice{line-height:1.7;font-size:14px;}
 @media(max-width:650px){margin:30px auto;padding:0 18px;grid-template-columns:1fr;gap:20px;aside{display:flex;gap:20px;align-items:center;}aside a{margin:0;}h1{font-size:22px;margin-bottom:24px;}}
`;
const labels:Record<string,string>={PAID:"결제 완료",PREPARING:"주문 준비 중",PENDING_PAYMENT:"결제 대기",PAYMENT_PROCESSING:"결제 확인 중",RECONCILIATION_REQUIRED:"결제 결과 확인 필요",COMPLETED:"주문 완료",CANCELED:"주문 취소",CANCELLED:"주문 취소",EXPIRED:"주문 만료",FAILED:"주문 실패"};
const paymentLabels:Record<string,string>={SUCCEEDED:"승인 완료",REVIEW_REQUIRED:"결제 재확인 필요",UNKNOWN:"결과 확인 중",FAILED:"승인 실패"};
export default function OrdersPage(){
 const recheckLock=useRef(false);
 const {orderId}=useParams();const navigate=useNavigate();const [order,setOrder]=useState<ServerOrder|null>(null);const [rows,setRows]=useState<ServerOrder[]>([]);const [images,setImages]=useState<Record<string,string>>({});const [page,setPage]=useState(1);const [total,setTotal]=useState(0);const [error,setError]=useState("");const [payment,setPayment]=useState("");const [busy,setBusy]=useState(false);const [revision,setRevision]=useState(0);
 useEffect(()=>{let active=true;setBusy(true);setError("");setOrder(null);setPayment("");setImages({});
  async function load(){try{if(orderId){const data=await getOrder(orderId);if(!active)return;setOrder(data);
   const results=await Promise.all((data.items??[]).map(async i=>{try{return [i.productId,(await getProduct(i.productId)).images?.[0]??""] as const;}catch{return [i.productId,""] as const;}}));if(active)setImages(Object.fromEntries(results));
   if(data.status!=="PREPARING"&&data.status!=="PENDING_PAYMENT"){try{const status=await paymentStatus(orderId);if(active)setPayment(status);}catch{if(active)setPayment("결제 내역을 조회하지 못했습니다.");}}
  }else{const data=await getOrders(page);if(active){setRows(data.items);setTotal(data.total);}}}catch(e){if(active)setError(message(e));}finally{if(active)setBusy(false);}}
  void load();return()=>{active=false;};},[orderId,page,revision]);
 async function recheck(){
  if(!orderId||busy||recheckLock.current)return;
  recheckLock.current=true;setBusy(true);setError("");
  try{const result=await recheckPayment(orderId);setOrder(result.order);setPayment(result.status);}
  catch(e){setError(message(e));}finally{recheckLock.current=false;setBusy(false);}
 }
 async function resume(){if(!orderId||busy)return;setBusy(true);try{const data=payable(await getOrder(orderId));sessionStorage.setItem("pueblo-sandbox-order",JSON.stringify({source:"backend",orderId:data.orderId,orderName:"pueblo 주문",amount:data.totalAmount}));navigate('/checkout');}catch(e){setError(message(e));}finally{setBusy(false);}}
 return <Layout><aside><p>쇼핑 정보</p><Link to="/orders"><strong>구매 내역</strong></Link><Link to="/favorites">관심목록</Link></aside><section><h1>{orderId?"주문 상세":"구매 내역"}</h1>{error&&<p role="alert">{error}</p>}{busy&&<p role="status">확인 중입니다.</p>}
 {order?<><p className="number">주문번호 {order.orderId}</p>{order.items?.map(i=><div key={i.skuId} className="product">{images[i.productId]&&<img src={images[i.productId]} alt={i.name}/>}<div><p>{i.name}</p><p className="muted">{i.brand}</p><p><strong>{Object.values(i.options??{}).join(' / ')} · {i.quantity}개</strong></p><Link className="button" to={`/product/${i.productId}`}>상품 상세</Link></div></div>)}
 <div className="status"><h2>진행 상황</h2><strong>{labels[order.status]??order.status}</strong>{order.status==='RECONCILIATION_REQUIRED'&&<p className="notice">결제 승인 여부를 대조하고 있습니다. 결과가 확인되기 전에는 다시 결제하지 마세요.</p>}</div>
 <h2>결제 내역</h2><dl><div><dt>주문 금액</dt><dd><strong>{order.totalAmount.toLocaleString('ko-KR')}원</strong></dd></div><div><dt>결제 상태</dt><dd>{paymentLabels[payment]??(payment||'승인 내역 미확인')}</dd></div></dl>
 {order.shipping&&<><h2>배송 주소</h2><dl><div><dt>받는 분</dt><dd>{order.shipping.recipient}</dd></div><div><dt>연락처</dt><dd>{order.shipping.phone}</dd></div><div><dt>주소</dt><dd>[{order.shipping.postalCode}] {order.shipping.address1} {order.shipping.address2}</dd></div></dl></>}
 {(payment==='REVIEW_REQUIRED'||order.status==='RECONCILIATION_REQUIRED')&&<><p className="notice">토스 결제 내역을 다시 확인합니다. 결과에 따라 주문 확정 또는 취소·환불 처리가 진행될 수 있습니다. 결과가 불확실하면 확인 필요 상태가 유지됩니다.</p><button disabled={busy} onClick={()=>void recheck()}>{busy?"재조회 중…":"결제 결과 재조회"}</button></>}<button disabled={busy} onClick={()=>setRevision(n=>n+1)}>상태 새로고침</button>{order.status==='PENDING_PAYMENT'&&<button className="primary" disabled={busy} onClick={()=>void resume()}>결제 계속하기</button>}<Link className="button" to="/orders">구매 내역 목록</Link>
 </>:!orderId&&!busy&&!error?<>{rows.length?rows.map(r=><Link className="order" key={r.orderId} to={`/orders/${r.orderId}`}><strong>{labels[r.status]??r.status} · {r.totalAmount.toLocaleString('ko-KR')}원</strong><span className="number">{r.orderId}</span></Link>):<p>구매 내역이 없습니다.</p>}<button disabled={page===1} onClick={()=>setPage(p=>p-1)}>이전</button><span>{page}</span><button disabled={page*20>=total} onClick={()=>setPage(p=>p+1)}>다음</button></>:null}
 </section></Layout>;
}
