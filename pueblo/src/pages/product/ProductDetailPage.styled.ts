import styled, { css } from "styled-components";

export const Page = styled.div`
  color:#1a1a1a; background:#fff;
  font-family: ui-sans-serif, system-ui, -apple-system, "Noto Sans KR", Roboto, Helvetica, Arial, sans-serif;
`;

export const TopBar = styled.div`
  height:44px; display:flex; align-items:center; justify-content:space-between; padding:0 16px; border-bottom:1px solid #eee;
  .right{display:flex; gap:14px; color:#666}
`;

export const Container = styled.div`
  max-width: 1280px; margin:0 auto; padding: 24px 16px 80px;
`;

export const Main = styled.div`
  display:grid; grid-template-columns: 1.35fr .65fr; gap: 40px; align-items:start;
  @media (max-width: 1024px){ grid-template-columns:1fr; }
`;

export const Viewer = styled.div`
  position:relative; border-radius: 16px; overflow:hidden; background:#fafafa; border:1px solid #eee;
  img{ width:100%; height:auto; display:block; cursor:pointer; }
  .nav{ position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,.85); border:1px solid #ddd; border-radius:999px; padding:6px; cursor:pointer; }
  .prev{ left: 10px; }
  .next{ right: 10px; }
`;

export const Panel = styled.aside``;

export const PanelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  .brand { font-weight: 700; letter-spacing: .3px; color: #222; flex-grow: 1; }
  .bookmark {
    width: 34px; height: 34px; border: 1px solid #e3e3e3; border-radius: 8px;
    display: grid; place-items: center; background: #fff; cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-size: 28px; font-weight: 800; margin: 0 0 4px; line-height:1.15;
`;

export const SubTitle = styled.div`
  color:#222; margin-bottom: 6px; letter-spacing:.4px;
`;

export const SmallText = styled.div`
  color:#777; font-size: 13px; margin-bottom: 2px;
`;

export const PriceRow = styled.div`
  display:flex; align-items:center; gap:10px; margin: 12px 0 18px; font-weight:700;
  .label{ color:#666; font-size: 13px; font-weight:600; }
  .price{ font-size: 18px; }
`;

export const SizeGrid = styled.div`
  display:flex; gap: 10px; flex-wrap:wrap; margin-bottom: 10px;
`;

export const SizePill = styled.span<{ $active?: boolean }>`
  padding: 10px 16px; border-radius: 12px; border:1px solid #ddd; background:#fff; font-weight:700; font-size:13px; cursor:pointer;
  ${({ $active }) => $active && css`border-color:#0d5e4c; color:#0d5e4c; box-shadow:0 0 0 3px rgba(13,94,76,.08);`}
  &:disabled{ opacity:.35; cursor:not-allowed; text-decoration:line-through; }
`;

export const FitInfo = styled.div`
  color:#666; font-size:12px; display:grid; grid-template-columns: 1fr; gap:4px; margin: 8px 0 10px;
`;

export const Links = styled.div`
  display:flex; gap:18px; margin-bottom: 14px;
  a{ color:#0d5e4c; font-weight:700; font-size:13px; }
`;

export const CTA = styled.div`
  display:grid; grid-template-columns: 1fr 42px; gap: 8px; align-items:center; margin-bottom: 18px;
`;

export const BigButton = styled.button<{ $disabled?: boolean }>`
  height:48px; border-radius:10px; border:1px solid ${({ $disabled }) => ($disabled ? "#e3e3e3" : "#0d5e4c")};
  background: ${({ $disabled }) => ($disabled ? "#f6f7f8" : "#0d5e4c")};
  color: ${({ $disabled }) => ($disabled ? "#777" : "#fff")};
  font-weight:800; letter-spacing:.2px;
  width: 100%;
`;

export const IconBtn = styled.button`
  width: 42px; height: 48px; border: 1px solid #e3e3e3; border-radius: 10px; background:#fff; display:grid; place-items:center;
`;

// 아코디언
export const Accordion = styled.div`
  margin-top: 14px; border-top: 1px solid #eee;
`;

export const Section = styled.div`
  border-bottom: 1px solid #eee;
`;

export const SectionHead = styled.div`
  background-color: white;
  color: #333;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1f1f1;
  }
  &:focus {
    outline: none;
  }
`;

export const SectionBody = styled.div`
  padding: 15px;
  font-size: 14px;
  line-height: 1.6;
  border-top: 1px solid #e0e0e0;
`;

// 장바구니 버튼 스타일
export const CartButton = styled(BigButton)`
  background: #0d5e4c;
  border: 1px solid #0d5e4c;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #0a4d3b;
  }
`;

// 구매하기 버튼 스타일 (하얀색 배경)
export const BuyButton = styled(BigButton)`
  background: #fff;
  border: 1px solid #0d5e4c;
  color: #0d5e4c;
  cursor: pointer;
  &:hover {
    background: #f6f7f8;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;