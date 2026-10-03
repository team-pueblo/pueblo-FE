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

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const TitleStyled = styled.h2`
  font-size: 1.4vw;
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  color: #000;
  text-align: center;
`;

export const MessageStyled = styled.p`
  font-size: 13px;
  color: #000;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const IdDisplayStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 76px;
  padding: 16px 12px;
  overflow-wrap: anywhere;
  background: #f5f5f5;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #000;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ButtonContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FindPasswordButton = styled.button`
  width: 100%;
  height: 38px;
  background: ${({ theme }) => theme.colors.surface};
  color: #000;
  border: 1px solid #000;
  border-radius: 0;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 38px;
  background: #000;
  color: white;
  border: none;
  border-radius: 0;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #555;
  }
`;
