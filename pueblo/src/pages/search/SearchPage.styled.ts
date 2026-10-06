import { catalogPageTypography } from "../../theme/catalogPage";
import styled from "styled-components";

export const Page = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 56px 20px 80px;
  color: #222;
  ${catalogPageTypography}
  button, input { font-family: inherit; }
  button { cursor: pointer; }
  button:focus-visible { outline: 2px solid #222; outline-offset: 3px; }
  @media (max-width: 768px) { padding: 32px 16px 56px; }
`;

export const SearchArea = styled.div`
  max-width: 720px;
  margin: 0 auto 40px;
`;

export const Title = styled.h1`
  font-size: var(--catalog-title);
  font-weight: 400;
  margin: 0 0 24px;
`;

export const SearchForm = styled.form`
  label { display: block; font-size: var(--catalog-caption); margin-bottom: 8px; }
  .input-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 44px;
    border-bottom: 1px solid #222;
  }
  .input-row:focus-within { box-shadow: 0 1px 0 #222; }
  input {
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
    height: 60px;
    padding: 0 8px 0 0;
    border: 0;
    border-radius: 0;
    background: #fff;
    color: #222;
    font-size: var(--catalog-input);
    @media (max-width: 768px) { height: 48px; }
    outline: none;
  }
  button { display: grid; place-items: center; border: 0; background: #fff; color: #222; }
`;

export const Examples = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 12px;
  margin-top: 8px;
  color: #777;
  font-size: var(--catalog-caption);
  button { min-height: 44px; padding: 0 4px; background: none; border: 0; color: #555; font-size: var(--catalog-caption); }
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  p { min-width: 0; margin: 0; overflow-wrap: anywhere; line-height: 1.6; }
  strong { margin-left: 8px; font-weight: 500; }
  button { flex-shrink: 0; min-height: 44px; padding: 0; border: 0; background: none; color: #666; font-size: var(--catalog-caption); }
`;

export const EmptyState = styled.div`
  padding: 56px 0;
  text-align: center;
  line-height: 1.6;
  p { margin: 0 0 8px; }
  span { display: block; font-size: var(--catalog-caption); color: #777; }
  button { display: block; min-height: 44px; margin: 24px auto 0; padding: 0 20px; border: 1px solid #ddd; background: #fff; color: #222; }
`;
