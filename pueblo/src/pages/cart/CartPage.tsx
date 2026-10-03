// 1) React / 라이브러리
import React, { useEffect, useMemo, useReducer, useState } from "react";

// 3) 상대경로 import (부모 → 자식)
import {
  ContainerStyled,
  HeaderStyled,
  TitleStyled,
  ListStyled,
  ItemCardStyled,
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
  StickyBarStyled,
  EmptyStyled,
  ButtonStyled,
  InputStyled,
  CheckboxStyled,
  TabsStyled,
  TabItemStyled,
  EmptyBandStyled,
  RecoSectionStyled,
  RecoHeaderStyled,
  RecoGridStyled,
  RecoCardStyled,
  RecoThumbWrapStyled,
  RecoThumbStyled,
  RecoMetaStyled,
  RecoPriceRowStyled,
  DividerStyled,
  TabsIndicatorStyled,
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

type CartItem = {
  id: string;
  brand: string;
  name: string;
  option?: string;
  price: number;
  fee?: number;
  img: string;
  qty: number;
  seller?: string;
  condition?: "새상품" | "중고" | "미개봉";
  limited?: boolean;
};

type State = {
  items: CartItem[];
  code: string;
  shipping: ShippingMode;
  agreement: boolean;
};

// ==============================
// Constants & Utils
// ==============================
const STORAGE_KEY = "CART_V1";

const SEED: CartItem[] = [
  {
    id: "nk-dunk-01",
    brand: "NIKE",
    name: "Dunk Low Retro Panda",
    option: "270",
    price: 169000,
    fee: 2000,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    qty: 1,
    seller: "스니커즈셀러 A",
    condition: "새상품",
    limited: true,
  },
  {
    id: "ad-yeezy-02",
    brand: "ADIDAS",
    name: "Yeezy Boost 350 V2",
    option: "260",
    price: 299000,
    fee: 2000,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    qty: 1,
    seller: "한정판샵 B",
    condition: "미개봉",
    limited: false,
  },
];

// 추천 상품 (데모)
const RECO_SEED: CartItem[] = [
  {
    id: "nk-aj1-03",
    brand: "NIKE",
    name: "Air Jordan 1 Retro High",
    price: 359000,
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop",
    qty: 1,
  },
  {
    id: "ad-forum-04",
    brand: "ADIDAS",
    name: "Forum 84 Low",
    price: 159000,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    qty: 1,
  },
  {
    id: "nb-2002r-05",
    brand: "NEW BALANCE",
    name: "2002R",
    price: 189000,
    img: "https://images.unsplash.com/photo-1620799139509-41b4ad0c000d?q=80&w=800&auto=format&fit=crop",
    qty: 1,
  },
  {
    id: "cnv-ct70-06",
    brand: "CONVERSE",
    name: "Chuck 70",
    price: 99000,
    img: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop",
    qty: 1,
  },
  {
    id: "nk-dunk-07",
    brand: "NIKE",
    name: "Dunk Low",
    price: 179000,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    qty: 1,
  },
];

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
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    code: "",
    shipping: "일반" as ShippingMode,
    agreement: false,
  });

  const [toast, setToast] = useState<string>("");
  const [wishes, setWishes] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"fitnow" | "brand">("fitnow");
  const [policyOpen, setPolicyOpen] = useState<boolean>(false);


  // 토스트 자동 닫힘 (약 2.5초)
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  // init (localStorage → fallback SEED)
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as State;
        dispatch({ type: "INIT", payload: parsed.items || [] });
      } catch {
        dispatch({ type: "INIT", payload: SEED });
      }
    } else {
      dispatch({ type: "INIT", payload: SEED });
    }
  }, []);

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
    const data: State = { ...state };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [state]);

  const totals = useMemo(() => {
    const subtotalItems = state.items.reduce(
      (acc, it) => acc + it.price * it.qty + (it.fee || 0) * it.qty,
      0,
    );
    const coupon = applyCoupon(subtotalItems, state.code);
    const ship = getShippingFee(state.shipping, state.items.length);
    const service = getServiceFee(subtotalItems);
    const discount = Math.min(coupon.discount, subtotalItems + service + ship);
    const total = Math.max(0, subtotalItems + service + ship - discount);
    return { subtotalItems, ship, service, coupon, discount, total };
  }, [state.items, state.code, state.shipping]);

  const itemCount = state.items.reduce((n, it) => n + it.qty, 0);
  const brandCount = 0; // 브랜드 배송 (연동 전 0 고정)

  const addToCart = (it: CartItem) => {
    dispatch({ type: "ADD", item: it });
    setToast("장바구니에 담았습니다.");
  };

  const toggleWish = (id: string) => {
    setWishes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ContainerStyled>
      {/* Header + Tabs */}
      <HeaderStyled>
        <TitleStyled>장바구니</TitleStyled>

        <TabsStyled>
          <TabItemStyled
            $active={activeTab === "fitnow"}
            onClick={() => setActiveTab("fitnow")}
          >
            <div className="count">{itemCount}</div>
            <div className="label">F!t Now 배송</div>
          </TabItemStyled>

          <TabItemStyled
            $active={activeTab === "brand"}
            onClick={() => setActiveTab("brand")}
          >
            <div className="count">{brandCount}</div>
            <div className="label">브랜드 배송</div>
          </TabItemStyled>

          {/* 이동하는 하이라이터 */}
          <TabsIndicatorStyled $index={activeTab === "fitnow" ? 0 : 1} />
        </TabsStyled>
      </HeaderStyled>

      {/* Empty band */}
      {state.items.length === 0 && (
        <EmptyBandStyled>
          <p className="msg">
            장바구니에 담긴 상품이 없습니다.
            <br />
            원하는 상품을 장바구니에 담아보세요!
          </p>
          <a className="cta" href="/shop">
            SHOP 바로가기
          </a>
        </EmptyBandStyled>
      )}

      {/* Items */}
      <ListStyled>
        {state.items.length === 0 ? (
          <EmptyStyled>
            <div className="title">장바구니가 비어 있어요</div>
            <div className="desc">원하는 상품을 담아 결제를 시작해보세요.</div>
            <div style={{ display: "flex", gap: 8 }}>
              <ButtonStyled>인기 상품 보러가기</ButtonStyled>
              <ButtonStyled
                onClick={() => {
                  dispatch({ type: "INIT", payload: SEED });
                  setToast("데모 상품을 담았습니다.");
                }}
              >
                데모 상품 담기
              </ButtonStyled>
            </div>
          </EmptyStyled>
        ) : (
          state.items.map((it) => (
            <ItemCardStyled key={it.id}>
              <ThumbStyled src={it.img} alt={it.name} />
              <div>
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
                  <ButtonStyled
                    aria-label="remove"
                    onClick={() => {
                      dispatch({ type: "REMOVE", id: it.id });
                      setToast("상품을 삭제했습니다.");
                    }}
                    title="삭제"
                  >
                    삭제
                  </ButtonStyled>
                </RowStyled>

                <RowStyled style={{ marginTop: 10 }}>
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
              </div>
            </ItemCardStyled>
          ))
        )}
      </ListStyled>

      {/* Coupon / Shipping / Summary / Agreement */}
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
                내일도착(일부 제외) ·{" "}
                {numberFormat(getShippingFee("특급", state.items.length))}원
              </div>
            </div>
          </RadioStyled>
        </ShippingBoxStyled>

        <SummaryCardStyled>
          <div className="line">
            <span>상품 금액</span>
            <span>{numberFormat(totals.subtotalItems)}원</span>
          </div>
          <div className="line">
            <span>서비스 수수료</span>
            <span>{numberFormat(totals.service)}원</span>
          </div>
          <div className="line">
            <span>배송비</span>
            <span>{numberFormat(totals.ship)}원</span>
          </div>
          {totals.discount > 0 ? (
            <div className="line">
              <span>할인 ({applyCoupon(totals.subtotalItems, state.code).label})</span>
              <span>-{numberFormat(totals.discount)}원</span>
            </div>
          ) : null}
          <hr />
          <div className="total">
            <span>결제 예정 금액</span>
            <span>{numberFormat(totals.total)}원</span>
          </div>
        </SummaryCardStyled>

        <AgreeBoxStyled>
            <CheckboxStyled
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

      </SectionStyled>

      <DividerStyled />

      {/* 추천 상품 */}
      <RecoSectionStyled aria-label="추천 상품">
        <RecoHeaderStyled>
          <h2>이런 상품은 어떠세요?</h2>
          <button onClick={() => setToast("추천 알고리즘 안내")}>
            더 보기
          </button>
        </RecoHeaderStyled>

        <RecoGridStyled>
          {RECO_SEED.map((p) => (
            <RecoCardStyled key={p.id}>
              <RecoThumbWrapStyled>
                <RecoThumbStyled src={p.img} alt={p.name} />
              </RecoThumbWrapStyled>
              <RecoMetaStyled>
                <div className="brand">{p.brand}</div>
                <div className="name">{p.name}</div>
              </RecoMetaStyled>
              <RecoPriceRowStyled>
                <div className="price">{numberFormat(p.price)}원</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="wish" onClick={() => setToast("로그인 필요")}>
                    {wishes[p.id] ? "★" : "☆"}
                  </button>
                  <button className="wish" onClick={() => addToCart(p)}>
                    담기
                  </button>
                </div>
              </RecoPriceRowStyled>
            </RecoCardStyled>
          ))}
        </RecoGridStyled>
      </RecoSectionStyled>

      {/* Sticky Checkout Bar */}
      <StickyBarStyled>
        <div className="inner">
          <div className="info">
            <div className="label">총 {itemCount}개 · 결제 예정</div>
            <div className="value">{numberFormat(totals.total)}원</div>
          </div>
          <button
            disabled={!state.agreement || state.items.length === 0}
            className="primary"
            onClick={() => setToast("결제 플로우로 이동")}
          >
            결제하기
          </button>
          <button onClick={() => setToast("주문서 요약 열기")}>
            상세보기
          </button>
          {state.items.length > 0 ? (
            <button onClick={() => dispatch({ type: "CLEAR" })}>전체 비우기</button>
          ) : null}
        </div>
      </StickyBarStyled>

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
