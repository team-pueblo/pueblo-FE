import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  color: #222;
  background: #fff;
  font-family: inherit;
  font-size: 13px;
  button { font-family: inherit; font-size: inherit; }
  button:focus-visible, a:focus-visible { outline: 2px solid #222; outline-offset: 3px; }
`;

export const Container = styled.div`
  padding: 20px 20px 64px;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 32px;
  align-items: start;
  @media (max-width: 640px) { grid-template-columns: minmax(0, 1fr); gap: 24px; }
`;

export const Viewer = styled.div`
  min-width: 0;
  background: #fff;
  img { display: block; width: 100%; aspect-ratio: 3 / 4; object-fit: contain; }
`;

export const Panel = styled.aside`
  min-width: 0;
  padding: 20px 0 0;
`;

export const PanelTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  .brand { font-size: 14px; font-weight: 600; }
  button { display: grid; place-items: center; padding: 4px; border: 0; background: none; cursor: pointer; }
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 12px;
`;

export const SmallText = styled.p`
  margin: 0 0 12px;
  font-size: 12px;
  color: #777;
  line-height: 1.6;
`;

export const Badge = styled.p`
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
`;

export const PriceRow = styled.div`
  margin: 32px 0;
  font-size: 14px;
`;

export const InfoLink = styled.button`
  border: 0;
  padding: 0;
  background: none;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  margin-bottom: 28px;
`;

export const CTA = styled.div`
  display: grid;
  gap: 8px;
  margin: 24px 0 28px;
  .actions { display: grid; grid-template-columns: 42px 42px minmax(0, 1fr); gap: 8px; }
`;

export const IconBtn = styled.button`
  height: 42px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background: #fff;
  display: grid;
  place-items: center;
  color: #222;
  cursor: pointer;
`;

export const CartButton = styled.button`
  min-height: 42px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background: #fff;
  color: #222;
  font-weight: 500;
  &:disabled { color: #888; cursor: not-allowed; }
`;

export const BuyButton = styled(CartButton)`
  background: #000;
  color: #fff;
  border-color: #000;
  &:disabled { background: #888; border-color: #888; color: #fff; }
`;

export const Accordion = styled.div``;
export const Section = styled.div`
  border-bottom: 1px solid #eee;
`;
export const SectionHead = styled.button`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  background: #fff;
  color: #333;
  text-align: left;
  cursor: pointer;
`;
export const SectionBody = styled.div`
  padding: 0 0 20px;
  line-height: 1.8;
  font-size: 13px;
  color: #555;
`;

export const Recommendations = styled.section`
  margin-top: 64px;
  h2 { margin: 0 0 16px; font-size: 14px; font-weight: 600; }
`;
export const RecommendationList = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - 36px) / 4);
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 12px;
  @media (max-width: 640px) { grid-auto-columns: 72%; }
`;
export const RecommendationCard = styled(Link)`
  display: block;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  text-align: center;
  scroll-snap-align: start;
  img { display: block; width: 100%; aspect-ratio: 2 / 3; object-fit: contain; background: #fff; margin-bottom: 12px; }
  p { margin: 4px 0; font-size: 12px; line-height: 1.5; }
  .brand, .price { font-weight: 600; }
`;
