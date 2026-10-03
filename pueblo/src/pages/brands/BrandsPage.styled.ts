import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 56px 20px 80px;
  color: #222;
  font-size: 13px;
  @media (max-width: 768px) { padding: 32px 16px 56px; }
`;

export const Heading = styled.div`
  margin-bottom: 28px;
  img { margin-bottom: 20px; }
  h1 { font-size: 18px; font-weight: 400; margin: 0 0 10px; }
  p { margin: 0; color: #777; font-size: 12px; }
`;

export const SearchField = styled.label`
  display: block;
  max-width: 400px;
  margin-bottom: 32px;
  > span { display: block; margin-bottom: 8px; font-size: 12px; }
  > div { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #222; }
  svg { flex-shrink: 0; }
  input { box-sizing: border-box; width: 100%; min-width: 0; height: 44px; border: 0; border-radius: 0; padding: 0; font: inherit; font-size: 16px; background: #fff; color: #222; outline: none; }
  > div:focus-within { box-shadow: 0 1px 0 #222; }
`;

export const Count = styled.p`
  margin: 0 0 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #222;
  font-size: 12px;
  color: #666;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 28px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 16px; }
`;

export const BrandLink = styled(Link)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16px;
  align-items: center;
  gap: 16px 8px;
  min-width: 0;
  padding: 24px 0;
  border-bottom: 1px solid #eee;
  color: inherit;
  text-decoration: none;
  > img { grid-column: 1 / -1; }
  > div { min-width: 0; }
  strong { display: block; font-size: 14px; font-weight: 500; line-height: 1.5; overflow-wrap: anywhere; }
  span { display: block; color: #888; font-size: 12px; margin-top: 6px; }
  svg { flex-shrink: 0; color: #888; }
  &:hover { color: #666; }
  &:focus-visible { outline: 1px solid #222; outline-offset: 3px; }
`;

export const BrandLogo = styled.img`
  display: block;
  width: 100px;
  max-width: 100%;
  height: 52px;
  object-fit: contain;
  object-position: left center;
  @media (max-width: 768px) { width: 88px; height: 46px; }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-bottom: 16px;
  color: #777;
  font-size: 12px;
  text-underline-offset: 4px;
`;

export const Empty = styled.div`
  padding: 48px 0;
  text-align: center;
  line-height: 1.6;
  p { margin: 0 0 8px; }
  span { display: block; color: #777; font-size: 12px; }
  a, button { display: inline-flex; box-sizing: border-box; align-items: center; min-height: 34px; padding: 0 16px; margin-top: 24px; background: #fff; border: 1px solid #ddd; color: inherit; font: inherit; text-decoration: none; cursor: pointer; }
  @media (max-width: 768px) { a, button { min-height: 44px; } }
`;
