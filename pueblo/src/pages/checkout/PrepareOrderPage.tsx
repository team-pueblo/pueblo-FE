import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, getOrder, payable, paymentStatus, uuid, message, type Shipping } from "./paymentApi";
import styled from "styled-components";
const Form = styled.section`
 max-width: 600px; margin: 40px auto; padding: 20px;
 h1 { font-size: 20px; } label { display: block; margin: 12px 0; font-size: 13px; }
 input:not([type=checkbox]) { width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #ddd; }
 button { padding: 12px 20px; margin: 12px 0; } p { font-size: 13px; }
`;
export default function PrepareOrderPage() {
 const [shipping, setShipping] = useState<Shipping>({recipient:"",phone:"",postalCode:"",address1:"",address2:""});
 const [agreed, setAgreed] = useState(false);
 const [id, setId] = useState(() => {
  try {
   const saved = JSON.parse(sessionStorage.getItem("pueblo-order-request") || "null");
   return typeof saved?.orderId === "string" && uuid.test(saved.orderId) ? saved.orderId : "";
  } catch { return ""; }
 }); const [busy,setBusy] = useState(false); const [error,setError] = useState("");
 const lock = useRef(false); const navigate = useNavigate();
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
   if (order.status === "PAYMENT_PROCESSING") {
    const status = await paymentStatus(orderId);
    setError(status === "REVIEW_REQUIRED"
     ? "이 주문은 결제 내역 확인이 필요합니다. 승인 성공·실패가 확정되지 않았으므로 다시 결제하지 말고 담당자의 확인을 기다려주세요."
     : status === "SUCCEEDED" ? "결제는 승인되었으며 주문 처리 상태를 확인 중입니다. 다시 결제하지 마세요."
     : `결제 처리 상태: ${status}. 결제를 다시 요청하지 않고 기존 주문을 확인합니다.`);
    return;
   }
   payable(order);
   sessionStorage.setItem("pueblo-sandbox-order", JSON.stringify({ source:"backend", orderId:order.orderId, orderName:"pueblo 주문", amount:order.totalAmount }));
   navigate("/checkout");
  } catch(e) { setError(message(e)); } finally { lock.current=false; setBusy(false); }
 }
 return <Form><h1>주문 준비</h1>
  {Object.entries({recipient:"수령인",phone:"연락처",postalCode:"우편번호",address1:"주소",address2:"상세 주소"}).map(([key,label])=><label key={key}>{label}<input disabled={busy} value={shipping[key as keyof Shipping]} onChange={e=>setShipping({...shipping,[key]:e.target.value})}/></label>)}
  <label><input type="checkbox" disabled={busy} checked={agreed} onChange={e=>setAgreed(e.target.checked)}/> 구매 약관(purchase-v1)에 동의합니다.</label>
  <button disabled={busy} onClick={()=>void prepare(false)}>주문 생성</button>
  <label>기존 주문 번호<input disabled={busy} value={id} onChange={e=>{setId(e.target.value);setError("");}}/></label>
  <p>이미 생성한 주문은 배송지를 다시 입력하지 않고 아래 버튼으로 확인해주세요. 결제 가능한 상태일 때만 결제 화면으로 이동합니다.</p>
  <button disabled={busy || !id.trim()} onClick={()=>void prepare(true)}>기존 주문 상태 확인</button>
  {error && <p role="alert">{error}</p>}<p>서버에서 재고와 결제 금액을 확인합니다.</p><Link to="/cart">장바구니로 돌아가기</Link>
 </Form>;
}
