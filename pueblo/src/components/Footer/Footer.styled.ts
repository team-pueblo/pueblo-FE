// src/components/Footer/styles.ts

import styled from "styled-components";

export const FooterContainer = styled.footer`
  bottom: 0;
  left: 0;
  width: 100%;

  background-color: #ffffff;
  color: #000000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-top: 1px solid #dfdfdf;
  z-index: 999;

  padding: 1vh 2vw 2vh;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 0.85vw;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

export const FooterLinks = styled.p`
  font-size: 0.75vw;
  font-weight: 300;
  margin: 0.5vh 0 0;
  line-height: 1.5;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 2.2vw;
  }
`;
