import styled from "styled-components";

export const NavigationStyled = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["2xl"]};
`;

export const SectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitleStyled = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const NavItemStyled = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: all 0.2s ease;
  outline: none;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
  }

  &.active {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;
