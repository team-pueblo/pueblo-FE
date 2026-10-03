import styled, { css } from "styled-components";

export const MainHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 메인 컨텐츠(max-width: 1200px)와 시각적 기준을 맞춰줌 */
  width: 100%;
  max-width: 1200px; /* App의 ContentWrap과 동일 */
  margin: 0 auto;

  padding: 0 2vw 2vh 2vw;
  border-bottom: 1px solid #eee;
  box-sizing: border-box; /* 패딩 포함 계산 */
`;

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center; /* ✅ 가로 중앙 정렬 */
  align-items: center;
  gap: 3vw;
  margin-bottom: 3vh;
  width: 100%;
`;

export const NavLink = styled.a<{ $isActive?: boolean; $isSale?: boolean }>`
  font-size: 1.1vw;
  color: #333;
  text-decoration: none;
  padding-bottom: 1vh;
  cursor: pointer;

  ${(props) =>
    props.$isActive &&
    css`
      border-bottom: 0.15vw solid #000;
      font-weight: bold;
    `}

  ${(props) =>
    props.$isSale &&
    css`
      color: red;
    `}
`;

export const SubNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로축 가운데 */
  justify-content: center; /* ✅ 세로 기준도 정확히 중앙 */
  gap: 2vh;
  width: 100%;
  text-align: center;
`;

export const BrandTitle = styled.p`
  font-size: 1.4vw;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: center; /* ✅ 가로 중앙 정렬 */
  align-items: center;
  gap: 2vw;
  width: 100%;
`;

export const CategoryLink = styled.a<{ $isActive?: boolean }>`
  font-size: 0.85vw;
  color: #555;
  text-decoration: none;
  padding-bottom: 0.5vh;
  cursor: pointer;

  ${(props) =>
    props.$isActive &&
    css`
      border-bottom: 0.1vw solid #000;
      font-weight: 500;
      color: #000;
    `}
`;
