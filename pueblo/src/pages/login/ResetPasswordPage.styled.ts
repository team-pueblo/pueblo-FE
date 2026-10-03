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

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const VideoIcon = styled.video`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
`;

export const TitleStyled = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
  line-height: 1.3;
`;

export const DescriptionStyled = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: left;
  line-height: 1.5;
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
  width: 94%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const PrimaryButtonStyled = styled.button`
  width: auto;
  min-width: 80px;
  height: 36px;
  border: 0;
  font-weight: 600;
  color: white;
  background: #9ca3af;
  cursor: pointer;
  transition: background 0.15s ease;
  padding: 0 ${({ theme }) => theme.spacing.md};

  &:hover {
    background: #6b7280;
  }
`;

export const OutlineButtonStyled = styled.button`
  width: auto;
  height: 36px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  border-radius: 0;
  font-weight: 400;
  cursor: pointer;
  transition: color 0.15s ease;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
