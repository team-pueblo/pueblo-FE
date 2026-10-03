import styled from "styled-components";
//
export const SectionWrap = styled.section`
  margin-top: 40px;
  h3{ font-size: 16px; font-weight: 800; margin-bottom: 14px; }
`;

export const Grid = styled.div`
  display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px;
  @media (max-width: 1024px){ grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media (max-width: 520px){ grid-template-columns: 1fr; }
`;

export const Card = styled.div`
  border: 1px solid #eee; border-radius: 12px; overflow: hidden; background:#fff;
  img{ width: 100%; height: auto; display: block; }
  .brand{ font-size: 12px; color:#666; padding: 10px 10px 0; }
  .name{ padding: 0 10px; font-weight: 800; }
  .price{ padding: 8px 10px 12px; font-weight: 700; }
`;
