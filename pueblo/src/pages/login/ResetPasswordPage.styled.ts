import styled from "styled-components";

export const PageStyled = styled.div`
  min-height: calc(100dvh - 200px);
  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const CardStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 464px;
  padding: ${({ theme }) => theme.spacing.xl};
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
  font-size: 1.4vw;
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: #000;
  text-align: left;
  line-height: 1.3;
`;

export const DescriptionStyled = styled.p`
  font-size: 12px;
  color: #555;
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
  font-size: 12px;
  color: #000;
  text-align: left;
`;

export const InputStyled = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  height: 38px;
  font-size: 13px;
  border: 0;
  font-weight: 500;
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
  height: 38px;
  font-size: 13px;
  background: transparent;
  color: #000;
  border: none;
  border-radius: 0;
  font-weight: 400;
  cursor: pointer;
  transition: color 0.15s ease;
  padding: 0;

  &:hover {
    color: #555;
  }
`;
