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
export type ServerOrder = { orderId: string; status: string; totalAmount: number; currency?: string; createdAt?: string; shipping?: Shipping; items?: { productId: string; skuId: string; name: string; brand: string; options: Record<string,string>; unitPrice: number; quantity: number; amount: number }[] };
export async function getOrders(page = 1) {
  const response = await orders.get<{data:{items:ServerOrder[];total:number}}>("/me/orders", {params:{page,size:20},headers:auth()});
  return response.data.data;
}
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
export function validateShipping(shipping: Shipping) {
  if (!shipping.recipient.trim() || shipping.recipient.length > 80) throw new Error("수령인을 1~80자로 입력해주세요.");
  if (!/^[0-9+() -]{8,30}$/.test(shipping.phone)) throw new Error("연락처를 8~30자로 입력해주세요. 예: 01012345678");
  if (!/^[0-9]{5}$/.test(shipping.postalCode)) throw new Error("우편번호는 숫자 5자리로 입력해주세요.");
  if (!shipping.address1.trim() || shipping.address1.length > 200 || shipping.address2.length > 200) throw new Error("주소를 입력하고 기본·상세 주소는 각각 200자 이내로 작성해주세요.");
}
export async function createOrder(items: { productId: string; skuId: string; quantity: number }[], shipping: Shipping) {
  validateShipping(shipping);
  const headers = auth();
  const owner = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(headers.Authorization)))).map(x => x.toString(16).padStart(2, "0")).join("");
  const signature = JSON.stringify({ items, shipping, owner });
  const saved = sessionStorage.getItem("pueblo-order-request");
  let request = saved ? JSON.parse(saved) : null;
  if (request?.body?.shipping && !request.orderId) {
    try { validateShipping(request.body.shipping); }
    catch { request = null; } // Legacy invalid inputs cannot pass the server's Shipping validation.
  }
  if (request && request.signature !== signature) {
    // Requests rejected by input validation can be edited. Uncertain requests retain their key/body.
    if (request.validationRejected && !request.orderId) request = null;
    else throw new Error("이전 주문 요청을 먼저 확인해주세요. 주문 정보가 변경되었습니다.");
  }
  if (!request) {
    if (!items.length || items.some(i => !uuid.test(i.productId) || !uuid.test(i.skuId) || !Number.isInteger(i.quantity) || i.quantity < 1)) throw new Error("실제 상품·SKU UUID가 필요합니다. 샘플 상품으로 주문할 수 없습니다.");
    const quote = await orders.post("/checkout/quotes", { items }, { headers });
    if (!uuid.test(quote.data.data?.quoteId)) throw new Error("견적 응답이 올바르지 않습니다.");
    request = { signature, key: crypto.randomUUID(), body: { quoteId: quote.data.data.quoteId, shipping, purchaseTermsVersion: "purchase-v1", agreed: true } };
    sessionStorage.setItem("pueblo-order-request", JSON.stringify(request));
  }
  if (request.orderId) return request.orderId as string;
  let response;
  try {
    response = await orders.post("/orders", request.body, { headers: { ...headers, "Idempotency-Key": request.key } });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400 && error.response.data?.error?.code === "INVALID_INPUT") {
      sessionStorage.setItem("pueblo-order-request", JSON.stringify({ ...request, validationRejected: true }));
    }
    throw error;
  }
  const id = response.data.data?.orderId;
  if (!uuid.test(id)) throw new Error("주문 생성 응답을 확인할 수 없습니다. 동일 요청으로 재시도해주세요.");
  sessionStorage.setItem("pueblo-order-request", JSON.stringify({ ...request, orderId: id }));
  return id as string;
}
export function readPaymentStatus(body: { data?: { status?: unknown } }) {
  const status = body?.data?.status;
  if (typeof status !== "string" || !status.trim()) throw new Error("결제 응답에 상태 정보가 없습니다. 결제 상태를 다시 확인해주세요.");
  return status;
}
export async function confirm(orderId: string, paymentKey: string, amount: number) {
  const response = await payments.post("/payments/confirm", { orderId, paymentKey, amount }, { headers: auth() });
  const status = readPaymentStatus(response.data);
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
  const status = readPaymentStatus(response.data);
  if (status === "SUCCEEDED") {
    try {
      const request = JSON.parse(sessionStorage.getItem("pueblo-order-request") || "null");
      if (request?.orderId === orderId) sessionStorage.removeItem("pueblo-order-request");
    } catch { /* Approval remains valid even if local cleanup fails. */ }
  }
  return status;
}
export async function recheckPayment(orderId: string) {
  if (!uuid.test(orderId)) throw new Error("올바른 주문 UUID를 입력해주세요.");
  await payments.post(`/me/payments/orders/${orderId}/rechecks`, undefined, { headers: auth() });
  const order = await getOrder(orderId);
  const status = await paymentStatus(orderId);
  return { order, status };
}
export function message(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) return error.code === "ECONNABORTED" || error.code === "ETIMEDOUT"
      ? "서버 응답 시간이 초과되었습니다. 주문 생성 여부를 확인한 뒤 다시 조회해주세요."
      : "서버 응답을 받지 못했습니다. API 서버 연결 또는 브라우저 CORS 설정을 확인해주세요.";
    const code = error.response.data?.error?.code ?? error.response.data?.code;
    const label = typeof code === "string" && /^[A-Z0-9_]{1,80}$/.test(code) ? ` (${code})` : "";
    if (error.response?.status === 401) return "로그인이 만료되었습니다. 다시 로그인해주세요.";
    if (error.response?.status === 403) return "본인 주문에 대한 권한을 확인해주세요.";
    if (error.response.status === 404) return `요청한 주문 또는 결제 내역을 찾을 수 없습니다${label}. 현재 로그인한 계정의 주문 번호인지 확인해주세요.`;
    if (error.response.status === 409) return `현재 주문 상태와 요청이 충돌합니다${label}. 기존 주문 상태를 다시 확인해주세요.`;
    if (error.response?.status === 400) {
      return `주문 요청이 거절되었습니다${label}. 연락처·우편번호와 견적 유효기간을 확인해주세요.`;
    }
    return `서버 요청에 실패했습니다 (HTTP ${error.response.status})${label}. 잠시 후 주문 내역을 다시 확인해주세요.`;
  }
  return error instanceof Error ? error.message : "요청 처리 중 오류가 발생했습니다.";
}
