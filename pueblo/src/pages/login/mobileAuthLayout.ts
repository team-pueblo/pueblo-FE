import { css } from "styled-components";

export const mobileAuthLayout = css`
  @media (max-width: 768px) {
    box-sizing: border-box;
    align-items: flex-start;
    padding: 16px 0 32px;

    input:not([type="checkbox"]):not([type="radio"]):not([type="file"]),
    select,
    textarea {
      box-sizing: border-box;
      min-width: 0;
      min-height: 44px;
      font-size: 16px;
    }

    button {
      min-height: 44px;
    }
  }
`;
