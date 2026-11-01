import axios from "axios";
import { checkTokenExpiration } from "../../utils/auth";

const orders = axios.create({ baseURL: import.meta.env.DEV ? "http://localhost:8083/api/v1" : "/api/v1", timeout: 15000 });
const payments = axios.create({ baseURL: import.meta.env.DEV ? "http://localhost:8084/api/v1" : "/api/v1", timeout: 15000 });
export const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function auth() {
  checkTokenExpiration();
  const token = localStorage.getItem("token");
  if (!token) throw new Error("로그인이 필요합니다.");
  return { Authorization: `Bearer ${token}` };
}
export type ServerOrder = { orderId: string; status: string; totalAmount: number };
export async function getOrder(id: string) {
  if (!uuid.test(id)) throw new Error("올바른 주문 UUID를 입력해주세요.");
  const { data } = await orders.get<{ data: ServerOrder }>(`/me/orders/${id}`, { headers: auth() });
  if (data.data?.orderId !== id || typeof data.data.status !== "string") throw new Error("주문 응답을 확인할 수 없습니다.");
  return data.data;
}
export function payable(order: ServerOrder) {
  if (order.status !== "PENDING_PAYMENT") throw new Error(`결제 가능한 주문이 아닙니다 (${order.status}).`);
  if (!Number.isSafeInteger(order.totalAmount) || order.totalAmount <= 0) throw new Error("주문 금액이 올바르지 않습니다.");
  return order;
}
export type Shipping = { recipient: string; phone: string; postalCode: string; address1: string; address2: string };
export async function createOrder(items: { productId: string; skuId: string; quantity: number }[], shipping: Shipping) {
  const headers = auth();
  const owner = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(headers.Authorization)))).map(x => x.toString(16).padStart(2, "0")).join("");
  const signature = JSON.stringify({ items, shipping, owner });
  const saved = sessionStorage.getItem("pueblo-order-request");
  let request = saved ? JSON.parse(saved) : null;
  if (request && request.signature !== signature) throw new Error("이전 주문 요청을 먼저 확인해주세요. 주문 정보가 변경되었습니다.");
  if (!request) {
    if (!items.length || items.some(i => !uuid.test(i.productId) || !uuid.test(i.skuId) || !Number.isInteger(i.quantity) || i.quantity < 1)) throw new Error("실제 상품·SKU UUID가 필요합니다. 샘플 상품으로 주문할 수 없습니다.");
    const quote = await orders.post("/checkout/quotes", { items }, { headers });
    if (!uuid.test(quote.data.data?.quoteId)) throw new Error("견적 응답이 올바르지 않습니다.");
    request = { signature, key: crypto.randomUUID(), body: { quoteId: quote.data.data.quoteId, shipping, purchaseTermsVersion: "purchase-v1", agreed: true } };
    sessionStorage.setItem("pueblo-order-request", JSON.stringify(request));
  }
  if (request.orderId) return request.orderId as string;
  const response = await orders.post("/orders", request.body, { headers: { ...headers, "Idempotency-Key": request.key } });
  const id = response.data.data?.orderId;
  if (!uuid.test(id)) throw new Error("주문 생성 응답을 확인할 수 없습니다. 동일 요청으로 재시도해주세요.");
  sessionStorage.setItem("pueblo-order-request", JSON.stringify({ ...request, orderId: id }));
  return id as string;
}
export async function confirm(orderId: string, paymentKey: string, amount: number) {
  const response = await payments.post("/payments/confirm", { orderId, paymentKey, amount }, { headers: auth() });
  const status = response.data.data?.status as string | undefined;
  if (status === "SUCCEEDED") {
    try {
      const request = JSON.parse(sessionStorage.getItem("pueblo-order-request") || "null");
      if (request?.orderId === orderId) sessionStorage.removeItem("pueblo-order-request");
    } catch { /* Approval remains valid even if local cleanup fails. */ }
  }
  return status;
}
export async function paymentStatus(orderId: string) {
  const response = await payments.get(`/me/payments/orders/${orderId}`, { headers: auth() });
  const status = response.data.data?.status as string | undefined;
  if (status === "SUCCEEDED") {
    try {
      const request = JSON.parse(sessionStorage.getItem("pueblo-order-request") || "null");
      if (request?.orderId === orderId) sessionStorage.removeItem("pueblo-order-request");
    } catch { /* Approval remains valid even if local cleanup fails. */ }
  }
  return status;
}
export function message(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) return "로그인이 만료되었습니다. 다시 로그인해주세요.";
    if (error.response?.status === 403) return "본인 주문에 대한 권한을 확인해주세요.";
    return "서버 요청을 완료하지 못했습니다. 연결 상태와 주문 내역을 확인해주세요.";
  }
  return error instanceof Error ? error.message : "요청 처리 중 오류가 발생했습니다.";
}
