// 1) React / 라이브러리
import React, { useEffect, useMemo, useReducer, useState } from "react";
import * as Sentry from "@sentry/react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { readCart, saveCart, type CartItem } from "./cartStorage";

// 3) 상대경로 import (부모 → 자식)
import {
  ContainerStyled,
  CartLayoutStyled,
  CartContentStyled,
  SelectionBarStyled,
  OrderPanelStyled,
  CheckoutButtonStyled,
  HeaderStyled,
  TitleStyled,
  ListStyled,
  ItemCardStyled,
  ItemDetailsStyled,
  ThumbStyled,
  ItemMetaStyled,
  QtyControlStyled,
  PriceBoxStyled,
  SectionStyled,
  RowStyled,
  CouponBoxStyled,
  ShippingBoxStyled,
  RadioStyled,
  SummaryCardStyled,
  AgreeBoxStyled,
  RemoveButtonStyled,
  InputStyled,
  CheckboxStyled,
  EmptyBandStyled,
  ModalOverlayStyled,
  ModalContentStyled,
  ModalHeaderStyled,
  ModalBodyStyled,
  ModalFooterStyled,
  ModalCloseButtonStyled,
} from "./CartPage.styled.ts";

// ==============================
// Types
// ==============================
type ShippingMode = "일반" | "특급";

type State = {
  items: CartItem[];
  code: string;
  shipping: ShippingMode;
  agreement: boolean;
};

// ==============================
// Constants & Utils
// ==============================
const numberFormat = (n: number): string =>
  new Intl.NumberFormat("ko-KR").format(n);

const applyCoupon = (
  subtotal: number,
  code: string,
): { discount: number; label: string } => {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { discount: 0, label: "" };
  if (normalized === "WELCOME5")
    return { discount: Math.floor(subtotal * 0.05), label: "신규 5%" };
  if (normalized === "FREESHIP") return { discount: 3000, label: "배송비 지원" };
  if (/VIP\d{2}/.test(normalized))
    return { discount: 20000, label: "VIP 바우처" };
  return { discount: 0, label: "유효하지 않은 쿠폰" };
};

const getShippingFee = (mode: ShippingMode, itemCount: number): number => {
  if (itemCount === 0) return 0;
  return mode === "일반" ? 3000 : 7000;
};

const getServiceFee = (subtotal: number): number => {
  if (subtotal === 0) return 0;
  return Math.max(0, Math.floor(subtotal * 0.01));
};

// ==============================
// Reducer
// ==============================
type Action =
  | { type: "INIT"; payload: CartItem[] }
  | { type: "INC"; id: string }
  | { type: "DEC"; id: string }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "CODE"; code: string }
  | { type: "SHIP"; shipping: ShippingMode }
  | { type: "AGREE"; value: boolean }
  | { type: "ADD"; item: CartItem };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return { ...state, items: action.payload };
    case "INC":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, qty: Math.min(it.qty + 1, 9) } : it,
        ),
      };
    case "DEC":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, qty: Math.max(it.qty - 1, 1) } : it,
        ),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter((it) => it.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    case "CODE":
      return { ...state, code: action.code };
    case "SHIP":
      return { ...state, shipping: action.shipping };
    case "AGREE":
      return { ...state, agreement: action.value };
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.item.id);
      return exists
        ? {
            ...state,
            items: state.items.map((i) =>
              i.id === action.item.id ? { ...i, qty: Math.min(i.qty + 1, 9) } : i,
            ),
          }
        : { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    default:
      return state;
  }
};

// ==============================
// Component
// ==============================
export const CartPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, undefined, () => readCart());

  const [toast, setToast] = useState<string>("");
  const navigate = useNavigate();
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const selectedItems = useMemo(
    () => state.items.filter((item) => !excludedIds.includes(item.id)),
    [state.items, excludedIds],
  );
  const allSelected = state.items.length > 0 && selectedItems.length === state.items.length;
  const [policyOpen, setPolicyOpen] = useState<boolean>(false);


  // 토스트 자동 닫힘 (약 2.5초)
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

 useEffect(() => {
  if (!policyOpen) return;
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setPolicyOpen(false);
  };
  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, [policyOpen]);

useEffect(() => {
  if (policyOpen) {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }
}, [policyOpen]);

  // persist
  useEffect(() => {
    try {
      saveCart(state);
    } catch (error) {
      Sentry.captureException(error, { tags: { feature: "cart", action: "save" } });
      setToast("장바구니를 저장하지 못했습니다. 브라우저 저장 공간을 확인해주세요.");
    }
  }, [state]);

  const totals = useMemo(() => {
    const subtotalItems = selectedItems.reduce(
      (acc, it) => acc + it.price * it.qty + (it.fee || 0) * it.qty,
      0,
    );
    const coupon = applyCoupon(subtotalItems, selectedItems.length ? state.code : "");
    const ship = getShippingFee(state.shipping, selectedItems.length);
    const service = getServiceFee(subtotalItems);
    const discount = Math.min(coupon.discount, subtotalItems + service + ship);
    const total = Math.max(0, subtotalItems + service + ship - discount);
    return { subtotalItems, ship, service, coupon, discount, total };
  }, [selectedItems, state.code, state.shipping]);

  return (
    <ContainerStyled>
      <CartLayoutStyled>
        <CartContentStyled>
          <HeaderStyled><TitleStyled>장바구니</TitleStyled></HeaderStyled>
          <SelectionBarStyled>
            <label>
              <CheckboxStyled
                checked={allSelected}
                disabled={state.items.length === 0}
                ref={(node) => { if (node) node.indeterminate = selectedItems.length > 0 && !allSelected; }}
                onChange={(event) => setExcludedIds(event.target.checked ? [] : state.items.map((item) => item.id))}
              />
              전체 선택
            </label>
            <button
              disabled={selectedItems.length === 0}
              onClick={() => {
                dispatch({ type: "INIT", payload: state.items.filter((item) => excludedIds.includes(item.id)) });
                setToast("선택한 상품을 삭제했습니다.");
              }}
            >선택상품 삭제</button>
          </SelectionBarStyled>
          {state.items.length === 0 && (
            <EmptyBandStyled>
              <p className="msg">장바구니에 담은 상품이 없습니다.</p>
              <Link className="cta" to="/">계속 쇼핑하기</Link>
            </EmptyBandStyled>
          )}
      {/* Items */}
      {state.items.length > 0 && (
      <ListStyled>
        {state.items.map((it) => (
            <ItemCardStyled key={it.id}>
              <CheckboxStyled
                aria-label={`${it.name} 선택`}
                checked={!excludedIds.includes(it.id)}
                onChange={(event) => setExcludedIds((ids) => event.target.checked
                  ? ids.filter((id) => id !== it.id)
                  : [...ids, it.id])}
              />
              <ThumbStyled src={it.img} alt={it.name} />
              <ItemDetailsStyled>
                <RowStyled>
                  <div style={{ minWidth: 0 }}>
                    <ItemMetaStyled>
                      <div className="brand">
                        {it.brand} · {it.seller}
                      </div>
                      <div className="name">{it.name}</div>
                      <div className="sub">
                        옵션: {it.option || "단일"} · {it.condition}
                      </div>
                      {it.limited ? <span className="limited">한정</span> : null}
                    </ItemMetaStyled>
                  </div>
                  <RemoveButtonStyled
                    type="button"
                    aria-label={`${it.name} 삭제`}
                    onClick={() => {
                      dispatch({ type: "REMOVE", id: it.id });
                      setToast("상품을 삭제했습니다.");
                    }}
                    title="삭제"
                  >
                    <Trash2 size={18} strokeWidth={1.6} aria-hidden="true" />
                  </RemoveButtonStyled>
                </RowStyled>

                <RowStyled>
                  <QtyControlStyled>
                    <button onClick={() => dispatch({ type: "DEC", id: it.id })}>
                      -
                    </button>
                    <div className="qty">{it.qty}</div>
                    <button onClick={() => dispatch({ type: "INC", id: it.id })}>
                      +
                    </button>
                  </QtyControlStyled>

                  <PriceBoxStyled>
                    <div className="price">
                      {numberFormat(it.price * it.qty)}원
                    </div>
                    {it.fee ? (
                      <div className="fee">
                        수수료 {numberFormat((it.fee || 0) * it.qty)}원 포함
                      </div>
                    ) : null}
                  </PriceBoxStyled>
                </RowStyled>
              </ItemDetailsStyled>
            </ItemCardStyled>
          ))}
      </ListStyled>
      )}

          {state.items.length > 0 && (
            <SectionStyled>
        <CouponBoxStyled>
          <RowStyled>
            <strong>쿠폰/프로모션</strong>
          </RowStyled>
          <div className="row">
            <InputStyled
              placeholder="쿠폰 코드 입력 (WELCOME5, FREESHIP, VIP12)"
              value={state.code}
              onChange={(e) => dispatch({ type: "CODE", code: e.target.value })}
            />
            <button
              onClick={() =>
                setToast(
                  state.code ? "쿠폰을 적용했습니다." : "쿠폰 코드가 비어있어요.",
                )
              }
            >
              적용
            </button>
          </div>
          {state.code ? (
            <div
              className={`hint ${
                applyCoupon(totals.subtotalItems, state.code).label ===
                "유효하지 않은 쿠폰"
                  ? "error"
                  : ""
              }`}
            >
              {applyCoupon(totals.subtotalItems, state.code).label ||
                "쿠폰 코드 감지됨"}
            </div>
          ) : null}
        </CouponBoxStyled>

        <ShippingBoxStyled>
          <strong>배송 방법</strong>
          <RadioStyled $active={state.shipping === "일반"}>
            <input
              type="radio"
              name="shipping"
              checked={state.shipping === "일반"}
              onChange={() => dispatch({ type: "SHIP", shipping: "일반" })}
            />
            <div>
              <div>일반</div>
              <div className="desc">
                예상 2~3일 · {numberFormat(getShippingFee("일반", state.items.length))}
                원
              </div>
            </div>
          </RadioStyled>
          <RadioStyled $active={state.shipping === "특급"}>
            <input
              type="radio"
              name="shipping"
              checked={state.shipping === "특급"}
              onChange={() => dispatch({ type: "SHIP", shipping: "특급" })}
            />
            <div>
              <div>특급</div>
              <div className="desc">
                내일 도착(일부 제외) ·{" "}
                {numberFormat(getShippingFee("특급", state.items.length))}원
              </div>
            </div>
          </RadioStyled>
        </ShippingBoxStyled>

            </SectionStyled>
          )}
        </CartContentStyled>
        <OrderPanelStyled aria-labelledby="order-info-title">
          <h2 id="order-info-title">주문 정보</h2>
          <SummaryCardStyled>
            <div className="line"><span>상품 금액</span><span>{numberFormat(totals.subtotalItems)}원</span></div>
            <div className="line"><span>상품 할인</span><span>-{numberFormat(totals.discount)}원</span></div>
            <div className="line"><span>배송비</span><span>{numberFormat(totals.ship)}원</span></div>
            {totals.service > 0 && <div className="line"><span>서비스 수수료</span><span>{numberFormat(totals.service)}원</span></div>}
            <hr />
            <div className="total"><span>총 결제 금액</span><span>{numberFormat(totals.total)}원</span></div>
          </SummaryCardStyled>
          {selectedItems.length > 0 && (
        <AgreeBoxStyled>
            <CheckboxStyled
              aria-label="구매조건 및 환불·교환 정책 동의"
              checked={state.agreement}
              onChange={(e) => dispatch({ type: "AGREE", value: e.currentTarget.checked })}
            />
            <span className="text">
              구매조건 및 환불/교환 정책을 확인했어요.{" "}
              <button
                type="button"
                aria-label="policy"
                onClick={() => setPolicyOpen(true)}
                className="link"
              >
                자세히
              </button>
            </span>
        </AgreeBoxStyled>
          )}
          <CheckoutButtonStyled
            disabled={selectedItems.length === 0 || !state.agreement}
            onClick={() => navigate("/login")}
          >
            <img src="/images/toss-pay.svg" alt="토스페이" />
            결제하기
          </CheckoutButtonStyled>
          <Link className="continue" to="/">계속 쇼핑하기</Link>
        </OrderPanelStyled>
      </CartLayoutStyled>

      {/* 환불/교환 정책 모달 */}
        {policyOpen && (
          <ModalOverlayStyled
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setPolicyOpen(false);
            }}
          >
            <ModalContentStyled tabIndex={-1} autoFocus onKeyDown={(e) => { if (e.key === "Escape") setPolicyOpen(false); }}>
              <ModalHeaderStyled>
                <h3 id="policy-title">환불/교환 정책</h3>
                <ModalCloseButtonStyled onClick={() => setPolicyOpen(false)} aria-label="닫기">
                  닫기
                </ModalCloseButtonStyled>
              </ModalHeaderStyled>

              <ModalBodyStyled>
                <h4>1. 단순 변심에 의한 교환/환불</h4>
                <p>
                  상품 수령일 포함 <strong>7일 이내</strong> 가능하며, 상품 및 포장이 훼손되지 않은
                  경우에 한합니다. 왕복 배송비가 부과될 수 있습니다.
                </p>

                <h4>2. 상품 하자/오배송</h4>
                <p>
                  동일 상품 교환 또는 전액 환불 가능합니다. 사진 증빙과 함께 고객센터로 접수해 주세요.
                </p>

                <h4>3. 불가 사유</h4>
                <ul>
                  <li>착용/세탁/훼손/택 제거 등으로 재판매가 어려운 경우</li>
                  <li>구매 확정 혹은 사용 흔적이 명백한 경우</li>
                  <li>사전 고지된 한정/특가/맞춤 상품</li>
                </ul>

                <h4>4. 처리 절차</h4>
                <p>
                  마이페이지 &gt; 주문내역 &gt; 교환/환불 신청에서 접수하세요. 검수 완료 후 결제수단별 환불 규정에 따라 환급됩니다.
                </p>

                <p style={{ marginTop: 8 }}>
                  보다 자세한 내용은 이용약관 및 소비자분쟁해결기준을 따릅니다.
                </p>
              </ModalBodyStyled>

          <ModalFooterStyled>
            <ModalCloseButtonStyled
               onClick={() => {
                setPolicyOpen(false);
                  dispatch({ type: "AGREE", value: true }); //체크박스 자동 체크
                     }}
                     >
                  확인
            </ModalCloseButtonStyled>
          </ModalFooterStyled>

            </ModalContentStyled>
          </ModalOverlayStyled>
        )}

      {/* 간단 토스트 (데모) */}
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 96,
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 12,
            fontSize: 12,
          }}
        >
          {toast}
        </div>
      ) : null}
    </ContainerStyled>
  );
};

export default CartPage;
