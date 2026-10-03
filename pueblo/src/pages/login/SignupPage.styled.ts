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
  ${mobileAuthLayout}

`;

export const CardStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 464px;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
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
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FieldStyled = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const LabelStyled = styled.label`
  font-size: 12px;
  color: #000;
  text-align: left;
`;

export const InputStyled = styled.input`
  width: 100%;
  box-sizing: border-box;
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

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.focusRing};
  }
`;

export const SelectStyled = styled.select`
  width: 100%;
  box-sizing: border-box;
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

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.focusRing};
  }
`;

export const GenderButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const GenderButton = styled.button<{ $selected?: boolean }>`
  flex: 1;
  height: 38px;
  border: 1px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.onPrimary : theme.colors.textPrimary};
  background: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.inputBg};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $selected }) => 
      $selected ? theme.colors.primary : theme.colors.hover};
  }
`;

export const FileUploadContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const FileInput = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  color: #000;
  background: ${({ theme }) => theme.colors.inputBg};
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.focus};
  }
  @media (max-width: 768px) {
    height: auto;
    min-height: 44px;
    padding: 10px 12px;
  }

`;

export const ButtonContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const SignupButton = styled.button`
  font-size: 13px;
  width: 100%;
  height: 38px;
  border: 0;
  border-radius: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: transform 0.02s ease;

  &:active {
    transform: translateY(1px);
  }
`;
