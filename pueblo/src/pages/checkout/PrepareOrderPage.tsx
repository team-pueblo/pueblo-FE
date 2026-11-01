import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, getOrder, payable, paymentStatus, uuid, message, type Shipping } from "./paymentApi";
import CheckoutPage from "./CheckoutPage";
import { CheckoutLayout, OrderProducts } from "./CheckoutLayout";
export default function PrepareOrderPage() {
 const [shipping, setShipping] = useState<Shipping>({recipient:"",phone:"",postalCode:"",address1:"",address2:""});
 const [agreed, setAgreed] = useState(false);
 const [id, setId] = useState(() => {
  try {
   const saved = JSON.parse(sessionStorage.getItem("pueblo-order-request") || "null");
   return typeof saved?.orderId === "string" && uuid.test(saved.orderId) ? saved.orderId : "";
  } catch { return ""; }
 }); const [busy,setBusy] = useState(false); const [error,setError] = useState("");
 const [ready, setReady] = useState(false);
 const navigate=useNavigate();
 const lock = useRef(false);
 async function prepare(existing: boolean) {
  if (lock.current) return; lock.current = true; setBusy(true); setError("");
  try {
   let orderId = id.trim();
   if (!existing) {
    if (!agreed || !shipping.recipient.trim() || !shipping.phone.trim() || !shipping.postalCode.trim() || !shipping.address1.trim()) throw new Error("배송지와 구매 약관 동의를 확인해주세요.");
    const items = JSON.parse(sessionStorage.getItem("pueblo-checkout-items") || "[]");
    orderId = await createOrder(items, shipping); setId(orderId);
   }
   const order = await getOrder(orderId);
   if (order.status === "PREPARING") { setError("재고 확보 중입니다. 잠시 후 주문 확인을 눌러주세요."); return; }
   if (order.status === "RECONCILIATION_REQUIRED") {
    setError("이 주문은 결제 결과 대조가 필요합니다. 결제 성공·실패가 확정되지 않았으므로 다시 결제하지 말고 담당자의 토스 결제 내역 확인을 기다려주세요.");
    return;
   }
   if (order.status === "PAYMENT_PROCESSING") {
    const status = await paymentStatus(orderId);
    setError(status === "REVIEW_REQUIRED"
     ? "이 주문은 결제 내역 확인이 필요합니다. 승인 성공·실패가 확정되지 않았으므로 다시 결제하지 말고 담당자의 확인을 기다려주세요."
     : status === "SUCCEEDED" ? "결제는 승인되었으며 주문 처리 상태를 확인 중입니다. 다시 결제하지 마세요."
     : `결제 처리 상태: ${status}. 결제를 다시 요청하지 않고 기존 주문을 확인합니다.`);
    return;
   }
   payable(order);
   sessionStorage.setItem("pueblo-sandbox-order", JSON.stringify({ source:"backend", orderId:order.orderId, orderName:"pueblo 주문", amount:order.totalAmount, shipping: existing ? undefined : shipping }));
   setReady(true);
  } catch(e) { setError(message(e)); } finally { lock.current=false; setBusy(false); }
 }
 if (ready) return <CheckoutPage/>;
 return <CheckoutLayout><main><h1>배송 / 결제</h1><h2>배송 주소</h2><div className="card"><div className="fields">
  {Object.entries({recipient:"받는 분",phone:"연락처",postalCode:"우편번호",address1:"주소",address2:"상세 주소"}).map(([key,label])=><label className={key.startsWith("address")?"wide":""} key={key}>{label}<input autoComplete={key==="recipient"?"name":key==="phone"?"tel":key==="postalCode"?"postal-code":key==="address1"?"address-line1":"address-line2"} disabled={busy} value={shipping[key as keyof Shipping]} onChange={e=>setShipping({...shipping,[key]:e.target.value})}/></label>)}
  </div></div><OrderProducts/>
  <h2>결제 방법</h2><div className="card"><strong>토스페이먼츠</strong><p className="muted">배송지 입력 후 결제를 계속하면 결제 수단을 선택할 수 있습니다.</p></div>
  <div className="card"><label><input type="checkbox" disabled={busy} checked={agreed} onChange={e=>setAgreed(e.target.checked)}/> 주문 내용 및 구매 약관에 동의합니다.</label></div>
  {error && <p className="notice" role="alert">{error}</p>}
  <div className="bottom"><button className="primary" disabled={busy||!agreed} onClick={()=>void prepare(false)}>{busy?"주문 확인 중…":"결제 계속하기"}</button></div>
  <details><summary>기존 주문 확인</summary><div className="card"><label>기존 주문 번호<input disabled={busy} value={id} onChange={e=>{setId(e.target.value);setError("");}}/></label><p className="muted">이미 생성한 주문은 새 주문을 만들지 않고 상태를 확인해주세요.</p><button disabled={busy||!id.trim()} onClick={()=>navigate(`/orders/${encodeURIComponent(id.trim())}`)}>기존 주문 상태 확인</button></div></details>
  <Link to="/cart">장바구니로 돌아가기</Link>
 </main></CheckoutLayout>;
}
