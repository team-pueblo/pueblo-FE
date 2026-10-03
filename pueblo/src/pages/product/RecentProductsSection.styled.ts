import styled from "styled-components";
//
export const SectionWrap = styled.section`
  margin-top: 56px;
  h3{ font-size: 16px; font-weight: 800; margin-bottom: 16px; }
`;

export const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 24px;
  @media (max-width: 1180px){ grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media (max-width: 720px){ grid-template-columns: 1fr; }
`;

export const Card = styled.div`
  border: 1px solid #eee; border-radius: 12px; overflow: hidden; background:#fff; display:grid; grid-template-rows: auto auto;
  .imgWrap{ background:#f6f6f6; }
  .imgWrap img{ width: 100%; height: auto; display:block; }
  .meta{ padding: 12px; }
  .badge{ font-size: 12px; color:#8a8a8a; margin-bottom: 6px; }
  .brand{ font-size: 12px; color:#666; }
  .name{ font-weight: 800; margin-top: 2px; }
  .price{ font-weight: 700; margin-top: 6px; }
  .soldout{ color:#8a8a8a; margin-top: 6px; }
`;
