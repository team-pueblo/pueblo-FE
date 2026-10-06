import { css } from "styled-components";

export const catalogPageTypography = css`
  --catalog-title: clamp(24px, 1.6vw, 32px);
  --catalog-body: clamp(16px, 0.9vw, 18px);
  --catalog-caption: clamp(14px, 0.8vw, 16px);
  --catalog-input: clamp(18px, 1vw, 20px);
  font-size: var(--catalog-body);
  line-height: 1.6;

  @media (max-width: 768px) {
    --catalog-title: 22px;
    --catalog-body: 14px;
    --catalog-caption: 12px;
    --catalog-input: 16px;
  }
`;
