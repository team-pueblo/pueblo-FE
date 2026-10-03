import styled from "styled-components";

/* ---------- 컨테이너 ---------- */
export const ContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 20px 100px;
  min-height: 65vh;

  @media (max-width: 600px) {
    padding: 32px 16px 64px;
  }
  font-size: 13px;
  font-family: inherit;

  button, input {
    font: inherit;
    box-sizing: border-box;
  }

  button { cursor: pointer; }
  background: ${({ theme }) => theme.colors.surface}; /* 배경 연한 회색 제거 → 흰색 */
  color: #000;
`;

/* ---------- 상단 타이틀 & 탭 ---------- */
export const HeaderStyled = styled.header`
  padding: 0 0 18px;
  border-bottom: 1px solid #222;
  background: ${({ theme }) => theme.colors.surface};
`;

export const TitleStyled = styled.h1`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
`;

export const TabsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 320px;
  margin: 0 auto;
  align-items: end;
  position: relative;
  border-bottom: 1px solid #eee; /* 옅은 경계 */
`;

/* 탭 아이템: 활성 시 텍스트 색만 진하게 */
export const TabItemStyled = styled.button<{ $active?: boolean }>`
  position: relative;
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  .count {
    font-weight: 400;
    font-size: 12px;
    color: #000;
  }
  .label {
    font-size: 12px;
    color: ${({ theme, $active }) =>
      $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  }
`;

/* 탭 하단 슬라이딩 하이라이터 (pueblo 배송 ↔ 브랜드 배송) */
export const TabsIndicatorStyled = styled.div<{ $index: 0 | 1 }>`
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 1px;
  width: 50%;
  background: #000;
  transform: translateX(${({ $index }) => ($index === 0 ? "0%" : "100%")});
  transition: transform 200ms ease;
`;

/* ---------- 빈 장바구니 밴드 ---------- */
export const EmptyBandStyled = styled.section`
  padding: 12px 16px 72px;
  text-align: center;

  .msg {
    margin: 0 0 16px;
    color: #888;
    line-height: 1.6;
  }
  .cta {
    color: #222;
    font-weight: 600;
    text-underline-offset: 3px;
  }
`;

/* ---------- 리스트 & 카드 ---------- */
export const ListStyled = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const ItemCardStyled = styled.div`
  display: grid;
  grid-template-columns: 18px 80px minmax(0, 1fr);
  align-items: start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #eee; /* 옅은 경계 */
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: none;
`;

export const ThumbStyled = styled.img`
  width: 80px;
  height: 96px;
  object-fit: cover;
  border-radius: 0;
  border: 1px solid #eee;
`;

export const ItemMetaStyled = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-width: 0;

  .brand {
    color: #555;
    font-size: 12px;
  }
  .name {
    margin-top: 2px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub {
    margin-top: 2px;
    font-size: 12px;
    color: #555;
  }
  .limited {
    display: inline-block;
    margin-top: 4px;
    padding: 2px 6px;
    border: 1px solid #eee;
    border-radius: 0;
    font-size: 11px;
    color: #555;
  }
`;

export const RowStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QtyControlStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  button {
    width: 28px;
    height: 28px;
    border-radius: 0;
    border: 1px solid #eee;
    background: #fafafa;
    color: #000;
  }
  .qty {
    width: 28px;
    text-align: center;
    font-weight: 600;
    color: #000;
  }
`;

export const PriceBoxStyled = styled.div`
  text-align: right;
  .price {
    font-weight: 700;
    color: #000;
  }
  .fee {
    margin-top: 2px;
    font-size: 12px;
    color: #555;
  }
`;

/* ---------- 쿠폰 / 배송 / 합계 ---------- */
export const SectionStyled = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CouponBoxStyled = styled.div`
  display: grid;
  gap: 10px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #eee;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};

  .row {
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
  }
  input {
    flex: 1;
    min-width: 0;
    height: 40px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    border-radius: 0;
    border: 1px solid #eee;
    background: ${({ theme }) => theme.colors.inputBg};
    color: #000;
  }
  button {
    height: 40px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    border-radius: 0;
    border: 1px solid #000;
    background: ${({ theme }) => theme.colors.surface};
    color: #000;
  }
  .hint {
    font-size: 12px;
    color: #555;
  }
  .error {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const ShippingBoxStyled = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #eee;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};
`;

export const RadioStyled = styled.label<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #eee;
  border-radius: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.hover : theme.colors.surface};
  cursor: pointer;

  input {
    accent-color: #000;
  }
  .desc {
    font-size: 12px;
    color: #555;
  }
`;

export const SummaryCardStyled = styled.div`
  display: grid;
  gap: 22px;
  .line, .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .total {
    font-size: 15px;
    font-weight: 600;
  }
  .total span:last-child { color: #ff3b30; }
  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #eee;
    margin: 6px 0;
  }
`;

export const AgreeBoxStyled = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #eee;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #000;
  }
  .text {
    font-size: 13px;
    color: #555;
  }
  .link {
    background: transparent;
    border: none;
    padding: 0;
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }  
  a {
    color: #000;
    text-decoration: underline;
  }
`;

/* ---------- 스티키 바 ---------- */
export const StickyBarStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  border-top: 1px solid #eee;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};

  .inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    .info { margin-right: auto; }
    gap: ${({ theme }) => theme.spacing.xs};
    align-items: center;
  }
  .info .label {
    font-size: 12px;
    color: #555;
  }
  .info .value {
    font-weight: 700;
    font-size: 15px;
    color: #000;
  }
  button {
    border-radius: 0;
    padding: 10px 16px;
    border: 1px solid #000;
    background: ${({ theme }) => theme.colors.surface};
    color: #000;
  }
  .primary {
    background: #000;
    color: ${({ theme }) => theme.colors.onPrimary};
    border: none;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ---------- 버튼/인풋/체크박스 ---------- */
export const ButtonStyled = styled.button`
  padding: 10px 14px;
  border-radius: 0;
  border: 1px solid #eee;
  background: #fafafa;
  color: #000;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.15);
  }
`;

export const InputStyled = styled.input`
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border-radius: 0;
  border: 1px solid #eee;
  background: ${({ theme }) => theme.colors.inputBg};
  color: #000;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.15);
  }
`;

export const CheckboxStyled = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  margin: 0;
  flex-shrink: 0;
  accent-color: #111;
`;

/* ---------- 추천 상품 섹션 ---------- */
export const RecoSectionStyled = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const RecoHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  h2 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
  }
  button {
    border: none;
    background: transparent;
    color: #555;
    font-size: 12px;
    cursor: pointer;
  }
`;

export const RecoGridStyled = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
`;

export const RecoThumbWrapStyled = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0;
  border: 1px solid #eee;

  img {
    transition: transform 250ms ease;
    will-change: transform;
  }
`;

export const RecoThumbStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RecoCardStyled = styled.div`
  min-width: 0;
  background: #fff;
  display: grid;
  align-content: start;
  gap: 12px;
`;

export const RecoMetaStyled = styled.div`
  .brand {
    font-size: 12px;
    color: #555;
  }
  .name {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const RecoPriceRowStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .price {
    font-weight: 700;
  }
  .wish {
    border: 1px solid #000;
    border-radius: 0;
    padding: 6px 12px;
    background: ${({ theme }) => theme.colors.surface};
    color: #000;
    cursor: pointer;
    transition: background 120ms ease;

    &:hover {
      background: #fafafa;
    }
  }
`;

export const DividerStyled = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

/* ---------- 추가: BadgeStyled & EmptyStyled ---------- */
export const BadgeStyled = styled.span`
  padding: 2px 8px;
  border-radius: 0;
  border: 1px solid #eee;
  background: #fafafa;
  font-size: 12px;
  color: #555;
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

export const EmptyStyled = styled.div`
  display: grid;
  place-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 48px ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid #eee;
  border-radius: 0;
  text-align: center;

  .title {
    font-weight: 700;
    color: #000;
  }
  .desc {
    font-size: 13px;
    color: #555;
  }
`;

/* ---------- 환불 정책 모달 ---------- */
export const ModalOverlayStyled = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
`;

export const ModalContentStyled = styled.div`
  width: min(720px, calc(100% - 32px));
  max-height: calc(100vh - 120px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: ${({ theme }) => theme.colors.surface};
  color: #000;
  border: 1px solid #eee;
  border-radius: 0;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  overflow: hidden;
`;

export const ModalHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid #eee;

  h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
`;

export const ModalBodyStyled = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  overflow: auto;

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    font-size: 13px;
    font-weight: 600;
  }
  p, li {
    font-size: 13px;
    color: #555;
    line-height: 1.6;
  }
  ul {
    margin: ${({ theme }) => theme.spacing.sm} 0;
    padding-left: 1.1rem;
  }
`;

export const ModalFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-top: 1px solid #eee;
  background: ${({ theme }) => theme.colors.surface};
`;

export const ModalCloseButtonStyled = styled.button`
  padding: 10px 14px;
  border-radius: 0;
  border: 1px solid #000;
  background: ${({ theme }) => theme.colors.surface};
  color: #000;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.focusRing};
  }
`;


export const CartLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 29%);
  gap: 24px;
  align-items: start;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
`;

export const CartContentStyled = styled.div`
  min-width: 0;
`;

export const SelectionBarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  gap: 12px;

  label { display: flex; align-items: center; gap: 12px; }
  button { border: 0; padding: 0; background: none; color: #444; }
  button:disabled { color: #888; cursor: default; }
`;

export const OrderPanelStyled = styled.aside`
  box-sizing: border-box;
  padding: 24px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  position: sticky;
  top: 24px;
  min-width: 0;

  h2 { margin: 0 0 28px; font-size: 15px; font-weight: 600; }
  .continue {
    display: block;
    margin-top: 14px;
    color: #222;
    text-align: center;
    font-weight: 600;
    text-underline-offset: 3px;
  }
  ${AgreeBoxStyled} {
    border: 0;
    padding: 20px 0 0;
    align-items: flex-start;
    line-height: 1.6;
  }
  @media (max-width: 600px) { position: static; }
`;

export const CheckoutButtonStyled = styled.button`
  width: 100%;
  min-height: 44px;
  margin-top: 20px;
  border: 0;
  border-radius: 5px;
  background: #111;
  color: #fff;
  font-weight: 600;
  &:disabled { background: #8c8c8c; cursor: not-allowed; }
`;
