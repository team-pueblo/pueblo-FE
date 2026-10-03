// src/components/Footer/Footer.tsx

import React from "react";
import { FooterContainer, FooterText, FooterLinks } from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>
        <FooterText>© 2025 FitNow. All rights reserved.</FooterText>
        <FooterLinks>
          Team. 우아한 남매들 (김동민, 이조은, 이제현, 최홍석, 홍윤기) |
          이용약관 | 개인정보취급방침
        </FooterLinks>
      </div>
    </FooterContainer>
  );
};

export default Footer;
