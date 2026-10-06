import styled from "styled-components";
import { Link } from "react-router-dom";

export const Home = styled.div`
  padding-bottom: 64px;
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: #000;
  color: #fff;
  aspect-ratio: 2.5 / 1;
  @media (max-width: 768px) { aspect-ratio: auto; height: 430px; border-radius: 12px; }
`;

export const HeroLink = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
  &:focus-visible { outline: 2px solid #fff; outline-offset: -6px; }
`;

export const HeroImage = styled.img<{ $campaign: boolean }>`
  position: absolute;
  inset: 0 0 0 auto;
  width: ${({ $campaign }) => $campaign ? "100%" : "60%"};
  height: 100%;
  object-fit: cover;
  object-position: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 65%;
    object-position: ${({ $campaign }) => $campaign ? "70% center" : "center 30%"};
  }
`;

export const HeroCopy = styled.div`
  position: absolute;
  left: 10%;
  bottom: 17%;
  max-width: 48%;
  h1 { margin: 0 0 12px; font-size: clamp(24px, 2.65vw, 44px); line-height: 1.3; font-weight: 700; white-space: pre-line; letter-spacing: -0.04em; }
  p { margin: 0; color: #c7c7c7; font-size: clamp(12px, 1.05vw, 16px); line-height: 1.6; }
  @media (max-width: 768px) {
    left: 24px;
    right: 24px;
    bottom: 48px;
    max-width: none;
    h1 { font-size: 26px; margin-bottom: 8px; }
    p { font-size: 12px; }
  }
`;

export const Arrow = styled.button<{ $direction: "previous" | "next" }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => $direction === "previous" ? "left: 8px;" : "right: 8px;"}
  transform: translateY(-50%);
  width: 48px;
  height: 56px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: #aaa;
  cursor: pointer;
  &:hover { color: #fff; }
  &:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
  @media (max-width: 768px) { top: 32%; width: 44px; }
`;

export const Pagination = styled.span`
  position: absolute;
  right: 16px;
  bottom: 14px;
  padding: 3px 12px;
  border-radius: 20px;
  background: #d2d2d2;
  color: #333;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

export const ShortcutGrid = styled.nav`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 24px 20px;
  padding: 56px 0 64px;
  @media (max-width: 768px) { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px 12px; padding: 32px 0 40px; }
`;

export const ShortcutLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  gap: 12px;
  color: #111;
  text-decoration: none;
  text-align: center;
  font-size: 12px;
  line-height: 1.5;
  > span:first-child { transition: transform 160ms ease; }
  &:hover > span:first-child { transform: translateY(-3px); }
  &:focus-visible { outline: 2px solid #111; outline-offset: 4px; }
  @media (prefers-reduced-motion: reduce) { > span:first-child { transition: none; } &:hover > span:first-child { transform: none; } }
  @media (max-width: 768px) { font-size: 11px; }
`;

export const ShortcutImage = styled.span`
  display: block;
  width: 84px;
  max-width: 100%;
  aspect-ratio: 1;
  background-image: url('/images/home/category-products.png');
  background-size: 400% 400%;
  background-repeat: no-repeat;
  @media (max-width: 768px) { width: 64px; }
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin: 16px 0 28px;
  h2 { margin: 0; font-size: 18px; font-weight: 600; }
  a { color: #666; font-size: 12px; text-underline-offset: 4px; }
  @media (max-width: 768px) { h2 { font-size: 16px; } }
`;

export const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px 16px; }
  @media (max-width: 520px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 12px; }
`;

export const FeaturedCard = styled(Link)`
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: #111;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.6;
  img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; margin-bottom: 18px; }
  strong { font-size: 13px; font-weight: 600; }
  p { margin: 4px 0 6px; color: #666; overflow-wrap: anywhere; }
  b { font-size: 13px; font-weight: 600; }
  &:focus-visible { outline: 2px solid #111; outline-offset: 4px; }
`;
