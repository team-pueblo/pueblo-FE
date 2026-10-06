// src/components/Footer/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";
import { FooterContainer, FooterLogo, FooterInfo, FooterText, FooterLinks } from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLogo to="/" aria-label="pueblo 홈으로 이동">
        <img src="/images/pueblo_logo.png" alt="pueblo" width={220} height={110} />
      </FooterLogo>
      <FooterInfo>
      <FooterText>
        © 2025–{new Date().getFullYear()} pueblo. All rights reserved. | 통신판매업신고: 2026-주식회사-푸에블로 | 사업자등록번호: 356-432-1233 (예시)
      </FooterText>
      <FooterText>
        상호명: pueblo(푸에블로) | 주소: 전북특별자치도 전주시 덕진구 백제대로 567 전북대학교 공과대학 7호관 | 전자우편주소: pueblo.team@icloud.com | 대표: 최홍석, 허완 | 전화: 042-1123-1123
      </FooterText>
      <FooterLinks>
        <Link to="/terms">이용약관</Link>
        <Link to="/privacy">개인정보처리방침</Link>
      </FooterLinks>
      </FooterInfo>
    </FooterContainer>
  );
};

export default Footer;
