import styled from "styled-components";

export const ProfileSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

export const ProfileCardStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const AvatarStyled = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.text.secondary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const UserInfoStyled = styled.div`
  flex: 1;
`;

export const UsernameStyled = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const EmailStyled = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ButtonStyled = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.secondary};
    color: ${({ theme }) => theme.colors.background};
  }

  &:focus {
    outline: none;
  }
`;
