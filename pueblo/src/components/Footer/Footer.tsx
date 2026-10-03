// src/components/Footer/Footer.tsx

import React from "react";
import { FooterContainer, FooterText, FooterLinks } from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>
        <FooterText>© 2025 pueblo. All rights reserved.</FooterText>
        <FooterLinks>
          Team-pueblo(최홍석,허완) |
          이용약관 | 개인정보취급방침
        </FooterLinks>
      </div>
    </FooterContainer>
  );
};

export default Footer;
