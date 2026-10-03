import styled from "styled-components";

export const SectionWrap = styled.section`
  margin-top: 48px;
  h3{ font-size: 16px; font-weight: 800; margin-bottom: 16px; }
`;

export const Card = styled.div`
  width: 240px; display: grid; gap: 8px;
  img{ width: 100%; height: auto; display: block; border-radius: 10px; border: 1px solid #eee; background:#fafafa; }
  .meta{ display:grid; gap: 2px; }
  .brand{ font-size: 12px; color:#666; }
  .name{ font-weight: 800; font-size: 13px; }
  .price{ font-size: 13px; }
`;
