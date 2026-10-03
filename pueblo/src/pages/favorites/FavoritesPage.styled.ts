import styled from "styled-components";

export const Page = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 56px 20px 80px;
  font-size: 13px;
  color: #222;
  @media (max-width: 768px) { padding: 32px 16px 56px; }
`;

export const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid #222;
  padding-bottom: 20px;
  h1 { font-size: 18px; font-weight: 400; margin: 0; }
  span { font-size: 12px; color: #777; }
`;

export const Message = styled.p`
  min-height: 20px;
  margin: 12px 0;
  font-size: 12px;
  color: #666;
  overflow-wrap: anywhere;
`;

export const Item = styled.div`
  min-width: 0;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0;
  margin-top: 4px;
  border: 0;
  background: none;
  color: #888;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  &:hover { color: #222; }
  &:focus-visible { outline: 1px solid #222; outline-offset: 3px; }
`;

export const EmptyState = styled.div`
  padding: 48px 0;
  text-align: center;
  line-height: 1.6;
  > svg { color: #888; }
  p { margin: 20px 0 8px; }
  span { display: block; color: #777; font-size: 12px; }
  a { display: inline-flex; align-items: center; box-sizing: border-box; min-height: 34px; margin-top: 24px; padding: 0 16px; border: 1px solid #ddd; color: inherit; text-decoration: none; }
  @media (max-width: 768px) { a { min-height: 44px; } }
`;
