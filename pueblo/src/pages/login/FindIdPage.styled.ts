import styled from "styled-components";
import { mobileAuthLayout } from "./mobileAuthLayout";

export const PageStyled = styled.div`
  min-height: calc(100dvh - 200px);
  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  box-sizing: border-box;
  ${mobileAuthLayout}

`;

export const CardStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 464px;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  margin: 0 auto;
  flex-shrink: 0;
  position: relative;

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
  @media (max-width: 768px) {
    padding: 24px 16px;
  }

`;

export const TitleStyled = styled.h2`
  font-size: 1.4vw;
  font-weight: 400;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: #000;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.5;
  }

`;

export const FormStyled = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FieldStyled = styled.div`
  display: grid;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LabelStyled = styled.label`
  font-size: 12px;
  color: #000;
  text-align: left;
`;

export const PhoneInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PhoneInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  outline: none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  color: #000;
  background: ${({ theme }) => theme.colors.inputBg};
  text-align: center;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.focusRing};
  }

  &:nth-child(2) {
    position: relative;
  }
`;

export const VerificationContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const VerificationInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
  outline: none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  color: #000;
  background: ${({ theme }) => theme.colors.inputBg};
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.focusRing};
  }
`;

export const VerifyButton = styled.button`
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  color: #000;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: background 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  @media (max-width: 768px) {
    margin-top: 0;
    gap: 12px;
  }
`;

export const SendButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 500;
  font-size: 13px;
  color: #000;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const NextButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  height: 40px;
  border: 0;
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ $disabled, theme }) => 
    $disabled ? theme.colors.border : theme.colors.primary};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $disabled, theme }) => 
      $disabled ? theme.colors.border : theme.colors.primary};
  }
`;
