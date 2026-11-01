import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import styled from "styled-components";

const Panel = styled.section`
  max-width: 640px; margin: 40px auto; padding: 0 20px;
  h1 { font-size: 20px; } p { font-size: 13px; line-height: 1.7; }
  button { width: 100%; min-height: 44px; margin: 16px 0; background: #111; color: white; border: 0; cursor: pointer; }
  button:disabled { opacity: .4; cursor: default; }
`;
type Order = { orderId: string; orderName: string; amount: number };
function readOrder(): Order | null {
  try {
    const value = JSON.parse(sessionStorage.getItem("pueblo-sandbox-order") || "null");
    return value && typeof value.orderId === "string" && typeof value.orderName === "string" && Number.isSafeInteger(value.amount) && value.amount > 0 ? value : null;
  } catch { return null; }
}
type Widgets = ReturnType<Awaited<ReturnType<typeof loadTossPayments>>["widgets"]>;

export default function CheckoutPage() {
  const [order] = useState(readOrder);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const widgets = useRef<Widgets | null>(null);
  const lock = useRef(false);
  useEffect(() => {
    if (!order) return;
    let cancelled = false;
    const cleanup: Array<() => void> = [];
    async function init() {
      try {
        const response = await fetch("/toss-sandbox.json", { cache: "no-store" });
        if (!response.ok) throw new Error("결제 설정을 불러오지 못했습니다.");
        const { clientKey } = await response.json();
        if (typeof clientKey !== "string" || !clientKey.startsWith("test_gck_")) throw new Error("위젯용 테스트 클라이언트 키 설정이 필요합니다.");
        const sdk = await loadTossPayments(clientKey);
        if (cancelled) return;
        const instance = sdk.widgets({ customerKey: ANONYMOUS });
        await instance.setAmount({ currency: "KRW", value: order!.amount });
        if (cancelled) return;
        const methods = await instance.renderPaymentMethods({ selector: "#payment-methods", variantKey: "DEFAULT" });
        if (cancelled) { methods.destroy(); return; }
        cleanup.push(() => { void methods.destroy(); });
        const agreement = await instance.renderAgreement({ selector: "#payment-agreement", variantKey: "AGREEMENT" });
        if (cancelled) { agreement.destroy(); return; }
        cleanup.push(() => { void agreement.destroy(); });
        widgets.current = instance;
        setReady(true);
      } catch {
        if (!cancelled) setError("결제위젯을 준비하지 못했습니다. 테스트 키와 네트워크 설정을 확인해주세요.");
      }
    }
    void init();
    return () => { cancelled = true; widgets.current = null; cleanup.forEach(fn => fn()); };
  }, [order]);
  async function pay() {
    if (!order || !widgets.current || lock.current) return;
    lock.current = true; setBusy(true); setError("");
    try {
      await widgets.current.requestPayment({ orderId: order.orderId, orderName: order.orderName,
        successUrl: `${location.origin}/checkout/success`, failUrl: `${location.origin}/checkout/fail` });
    } catch {
      setError("결제가 취소되었거나 요청에 실패했습니다. 다시 시도해주세요.");
    } finally { lock.current = false; setBusy(false); }
  }
  return <Panel><h1>테스트 결제</h1><p>샌드박스 결제입니다. 실제 청구되지 않습니다.</p>
    {order ? <><p>{order.orderName} · {order.amount.toLocaleString("ko-KR")}원</p><div id="payment-methods" /><div id="payment-agreement" />
      <button disabled={!ready || busy} onClick={() => void pay()}>{busy ? "결제 요청 중…" : "테스트 결제하기"}</button></> : <p>장바구니에서 결제할 상품을 먼저 선택해주세요.</p>}
    {error && <p role="alert">{error}</p>}<Link to="/cart">장바구니로 돌아가기</Link></Panel>;
}

export function CheckoutResultPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const order = readOrder();
  const authenticated = location.pathname.endsWith("/success") && order && params.get("orderId") === order.orderId && Number(params.get("amount")) === order.amount && !!params.get("paymentKey");
  return <Panel><h1>{authenticated ? "테스트 결제 인증 결과 수신" : "테스트 결제를 완료하지 못했습니다"}</h1>
    <p>{authenticated ? "아직 결제가 승인되지 않았습니다. 서버에서 주문 금액을 검증하고 토스 결제 승인 API를 호출해야 결제가 완료됩니다." : "결제가 취소되었거나 요청 정보가 일치하지 않습니다. 장바구니에서 다시 시도해주세요."}</p>
    <Link to="/cart">장바구니로 돌아가기</Link></Panel>;
}
