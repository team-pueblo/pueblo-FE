import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import styled from "styled-components";
import { getOrder, payable, confirm, paymentStatus, message } from "./paymentApi";

const Panel = styled.section`
  max-width: 640px; margin: 40px auto; padding: 0 20px;
  h1 { font-size: 20px; } p { font-size: 13px; line-height: 1.7; }
  button { width: 100%; min-height: 44px; margin: 16px 0; background: #111; color: white; border: 0; cursor: pointer; }
  button:disabled { opacity: .4; cursor: default; }
`;
const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #222;
  font-size: 13px;
  text-decoration: none;
  &:visited { color: #222; }
  &:hover { background: #f5f5f5; }
  &:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
`;
type Order = { orderId: string; orderName: string; amount: number };
function readOrder(): Order | null {
  try {
    const value = JSON.parse(sessionStorage.getItem("pueblo-sandbox-order") || "null");
    return value && value.source === "backend" && typeof value.orderId === "string" && typeof value.orderName === "string" && Number.isSafeInteger(value.amount) && value.amount > 0 ? value : null;
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
      const current = payable(await getOrder(order.orderId));
      if (current.totalAmount !== order.amount) throw new Error("주문 금액이 변경되었습니다. 주문을 다시 확인해주세요.");
      await widgets.current.requestPayment({ orderId: order.orderId, orderName: order.orderName,
        successUrl: `${location.origin}/checkout/success`, failUrl: `${location.origin}/checkout/fail` });
    } catch (e) {
      setError(message(e));
    } finally { lock.current = false; setBusy(false); }
  }
  return <Panel aria-label="결제">
    {order ? <><div id="payment-methods" /><div id="payment-agreement" />
      <button disabled={!ready || busy} onClick={() => void pay()}>{busy ? "결제 요청 중…" : "결제하기"}</button></> : <p>장바구니에서 결제할 상품을 먼저 선택해주세요.</p>}
    {error && <p role="alert">{error}</p>}<BackButton to="/cart">장바구니로 돌아가기</BackButton></Panel>;
}

export function CheckoutResultPage() {
  const location = useLocation();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const params = new URLSearchParams(location.search);
  const order = readOrder();
  const authenticated = location.pathname.endsWith("/success") && order && params.get("orderId") === order.orderId && Number(params.get("amount")) === order.amount && !!params.get("paymentKey");
  async function approve(checkOnly: boolean) {
    if (!authenticated || !order || lock.current) return;
    lock.current = true; setBusy(true); setError("");
    try {
      if (checkOnly) { setStatus(await paymentStatus(order.orderId)); return; }
      const current = payable(await getOrder(order.orderId));
      if (current.totalAmount !== order.amount) throw new Error("주문 금액이 일치하지 않습니다.");
      // Persist before sending: uncertain responses must be reconciled by GET, not a repeated POST.
      sessionStorage.setItem(`pueblo-confirm:${order.orderId}`, "requested");
      setStatus(await confirm(order.orderId, params.get("paymentKey")!, current.totalAmount));
    } catch (e) { setError(message(e)); } finally { lock.current = false; setBusy(false); }
  }
  const requested = order && sessionStorage.getItem(`pueblo-confirm:${order.orderId}`);
  return <Panel><h1>{status === "SUCCEEDED" ? "결제 승인 성공" : "결제 승인 확인"}</h1>
    {status === "SUCCEEDED" ? <p>결제가 승인되었습니다. 주문 완료 및 재고 확정 처리는 아직 연동되지 않았습니다.</p> : authenticated ? <>
      <p>{status === "UNKNOWN" ? "서버에서 결제 승인 결과를 아직 확정하지 못했습니다. 잠시 후 결제 상태를 다시 확인해주세요." : status ? `현재 결제 상태: ${status}` : requested ? "결제 승인 요청을 전송했습니다. 결제 상태를 확인해주세요." : "결제 인증이 완료되었습니다. 서버 승인을 진행해주세요."}</p>
      <button disabled={busy} onClick={() => void approve(Boolean(requested))}>{busy ? "확인 중…" : requested ? "결제 상태 다시 확인" : "결제 승인 요청"}</button>
    </> : <p>인증 결과가 주문 정보와 일치하지 않습니다. 주문을 다시 확인해주세요.</p>}
    {error && <p role="alert">{error}</p>}
    <BackButton to="/checkout/new">주문 확인으로 돌아가기</BackButton>
  </Panel>;
}
