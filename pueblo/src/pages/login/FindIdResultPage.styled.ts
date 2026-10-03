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
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const TitleStyled = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
`;

export const MessageStyled = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: left;
`;

export const IdDisplayStyled = styled.div`
  width: 100%;
  height: 120px;
  background: #f5f5f5;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ButtonContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FindPasswordButton = styled.button`
  width: 100%;
  height: 36px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 0;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 36px;
  background: ${({ theme }) => theme.colors.textPrimary};
  color: white;
  border: none;
  border-radius: 0;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;
