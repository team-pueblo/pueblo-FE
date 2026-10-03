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
  font-weight: 400;

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
  font-size: 1.4vw;
  font-weight: 400;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 18px;
  }

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
    font-weight: 500;
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
  @media (max-width: 768px) {
    grid-template-columns: 20px 64px minmax(0, 1fr);
    gap: 8px;
    padding: 12px 8px;
  }

`;

export const ThumbStyled = styled.img`
  box-sizing: border-box;
  width: 80px;
  height: 96px;
  object-fit: cover;
  border-radius: 0;
  border: 1px solid #eee;
  @media (max-width: 768px) {
    width: 64px;
    height: 84px;
  }

`;

export const ItemDetailsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  min-height: 96px;
  gap: 12px;
  @media (max-width: 768px) {
    gap: 12px;
    > div { flex-wrap: wrap; gap: 8px; }
    > div:first-child { flex-wrap: nowrap; align-items: flex-start; }
  }

`;

export const ItemMetaStyled = styled.div`
  display: grid;
  gap: 3px;
  line-height: 1.4;
  min-width: 0;

  .brand {
    color: #555;
    font-size: 12px;
    font-weight: 600;
  }
  .name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub {
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
  @media (max-width: 768px) {
    .name { white-space: normal; overflow-wrap: anywhere; line-height: 1.5; }
    .sub { line-height: 1.5; overflow-wrap: anywhere; }
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
    font-weight: 500;
    color: #000;
  }
  @media (max-width: 768px) {
    gap: 0;
    button { width: 40px; height: 44px; }
    .qty { width: 28px; }
  }

`;

export const PriceBoxStyled = styled.div`
  text-align: right;
  .price {
    font-weight: 500;
    color: #000;
  }
  .fee {
    margin-top: 2px;
    font-size: 12px;
    color: #555;
  }
  @media (max-width: 768px) {
    width: 100%;
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
  @media (max-width: 768px) {
    input { min-width: 0; font-size: 16px; }
    button { min-height: 44px; }
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
    font-weight: 500;
  }
  .total span:last-child {
    color: #ff3b30;
    font-weight: 700;
  }
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
    font-weight: 500;
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
export const RemoveButtonStyled = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  padding: 0;
  border-radius: 0;
  border: none;
  background: transparent;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #555;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.15);
  }
  @media (max-width: 768px) {
    width: 36px;
    height: 44px;
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
  @media (max-width: 768px) {
    font-size: 16px;
    min-width: 0;
    min-height: 44px;
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
    font-weight: 500;
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
    font-weight: 500;
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
    font-weight: 500;
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
    font-weight: 500;
    letter-spacing: -0.01em;
  }
`;

export const ModalBodyStyled = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  overflow: auto;

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    font-size: 13px;
    font-weight: 500;
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
  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
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
  @media (max-width: 768px) {
    button, label { min-height: 44px; }
    label { gap: 8px; }
  }

`;

export const OrderPanelStyled = styled.aside`
  box-sizing: border-box;
  padding: 24px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  position: sticky;
  top: 24px;
  min-width: 0;

  h2 { margin: 0 0 28px; font-size: 1.4vw; font-weight: 400; }
  .continue {
    display: block;
    margin-top: 14px;
    color: #222;
    text-align: center;
    font-weight: 500;
    text-underline-offset: 3px;
  }
  ${AgreeBoxStyled} {
    border: 0;
    padding: 20px 0 0;
    align-items: flex-start;
    line-height: 1.6;
  }
  @media (max-width: 600px) { position: static; }
  @media (max-width: 768px) {
    position: static;
    padding: 20px 16px;
    h2 { font-size: 16px; margin-bottom: 24px; }
  }

`;

export const CheckoutButtonStyled = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 36px;
  margin: 16px auto 0;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  &:hover:not(:disabled) { background: #f8f9fa; }
  &:disabled { color: #999; cursor: not-allowed; }
  img {
    display: block;
    width: auto;
    height: 14px;
  }
  @media (max-width: 768px) {
    min-height: 44px;
  }

`;
