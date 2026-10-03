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
  font-weight: 400;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: #000;
  text-align: left;
`;

export const ErrorTextStyled = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  margin: 0;
  text-align: left;
  min-height: 1.2em;
`;

export const FormStyled = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FieldStyled = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LabelStyled = styled.label`
  font-size: 12px;
  color: #000;
  text-align: left;
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
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

export const RowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckboxLabelStyled = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 12px;
  color: #555;

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LinkGroupStyled = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: #555;

  button {
    background: none;
    border: 0;
    padding: 0;
    font-size: 12px;
    color: #555;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }

  .divider {
    color: ${({ theme }) => theme.colors.border};
  }
`;

export const ActionsStyled = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const PrimaryButtonStyled = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 40px;
  border: 0;
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: transform 0.02s ease, opacity 0.2s ease;

  &:active {
    transform: translateY(1px);
  }

  ${({ $loading }) =>
    $loading &&
    `
    opacity: .7;
    cursor: not-allowed;
  `}
`;

export const OutlineButtonStyled = styled.button`
  width: 100%;
  height: 40px;
  background: ${({ theme }) => theme.colors.surface};
  color: #000;
  border: 1px solid #000;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const NoticeStyled = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: 12px;
  color: #555;

  .emph {
    color: ${({ theme }) => theme.colors.danger};
    text-decoration: underline;
    font-weight: 500;
  }
`;
