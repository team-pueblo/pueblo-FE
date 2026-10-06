import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Page = styled.main`
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  border-inline: 1px solid #eee;
  color: #111;
  background: #fff;
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  border-bottom: 1px solid #ddd;
  > div { position: relative; display: flex; align-items: center; justify-content: center; min-height: 56px; padding: 0 56px; }
  h1 { margin: 0; font-size: 15px; font-weight: 500; text-align: center; }
  button { position: absolute; left: 8px; display: grid; place-items: center; width: 44px; height: 44px; border: 0; background: none; color: inherit; cursor: pointer; }
  nav { display: flex; }
  button:focus-visible { outline: 2px solid #111; outline-offset: -4px; }
`;

export const Tab = styled(NavLink)`
  flex: 1;
  padding: 14px 8px;
  color: #777;
  text-align: center;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  &[aria-current="page"] { color: #111; border-bottom-color: #111; font-weight: 600; }
  &:focus-visible { outline: 2px solid #111; outline-offset: -4px; }
`;

export const Body = styled.article`
  padding: 28px 16px 64px;
  p { margin: 0 0 20px; }
  section { margin-top: 32px; }
  h2 { margin: 0 0 18px; font-size: 15px; font-weight: 600; }
  ol, ul { padding-left: 22px; margin: 0 0 20px; }
  li + li { margin-top: 8px; }
  a { color: inherit; text-underline-offset: 3px; }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  margin: 20px 0;
  &:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
  table { width: 100%; min-width: 480px; border-collapse: collapse; font-size: 13px; }
  caption { text-align: left; margin-bottom: 10px; font-weight: 500; }
  th, td { border: 1px solid #333; padding: 10px 8px; vertical-align: top; }
  th { background: #fafafa; font-weight: 500; }
`;
