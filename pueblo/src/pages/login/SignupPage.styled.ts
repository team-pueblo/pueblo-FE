import styled from "styled-components";

export const PageStyled = styled.div`
  min-height: calc(100dvh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const CardStyled = styled.div`
  width: 100%;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

export const TitleStyled = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  outline: none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.inputBg};

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.focusRing};
  }
`;

export const SelectStyled = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  outline: none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  color: ${({ theme }) => theme.colors.textPrimary};
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
  height: 36px;
  border: 1px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
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
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.inputBg};
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.focus};
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 36px;
  border: 0;
  border-radius: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: transform 0.02s ease;

  &:active {
    transform: translateY(1px);
  }
`;
