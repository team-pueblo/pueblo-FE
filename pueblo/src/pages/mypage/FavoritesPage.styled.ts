import styled from "styled-components";

export const PageContainer = styled.div`
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.xxl};
`;

export const HeaderRow = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

export const TabsRow = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  margin-bottom: -1px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.textPrimary : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.textPrimary : theme.colors.textSecondary)};
`;

export const FiltersRow = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const Chip = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  margin-right: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background-color: ${({ $active }) => ($active ? "#111827" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#111827")};
  cursor: pointer;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RadioItem = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const List = styled.div`
  max-width: 1200px;
  width: 100%;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Brand = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SizeText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const LikeButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
`;


