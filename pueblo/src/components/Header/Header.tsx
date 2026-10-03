import {
  HeaderContainer,
  HeaderTop,
  HeaderBottom,
  LeftNav,
  RightNav,
  Logo,
  LogoImage,
  NavItem,
  CategoryMenu,
  CategoryLink,
  HighlightItem,
} from "./Header.styled";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTop>
        <LeftNav>
          <NavItem>
            <Link to="/search" style={{ textDecoration: "none", color: "inherit" }}>검색</Link>
          </NavItem>
          <NavItem>
            <Link to="/favorites" style={{ textDecoration: "none", color: "inherit" }}>관심목록</Link>
          </NavItem>
        </LeftNav>

        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <LogoImage src="/images/pueblo_logo.png" alt="pueblo" />
          </Link>
        </Logo>

        <RightNav>
          <NavItem>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              장바구니
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              로그인
            </Link>
          </NavItem>
        </RightNav>
      </HeaderTop>

      <HeaderBottom>
        <CategoryMenu>
          <NavItem><CategoryLink to="/men">남성</CategoryLink></NavItem>
          <NavItem><CategoryLink to="/women">여성</CategoryLink></NavItem>
          <NavItem><CategoryLink to="/lifestyle">생활</CategoryLink></NavItem>
          <NavItem><CategoryLink to="/brands">브랜드</CategoryLink></NavItem>
          <HighlightItem><CategoryLink to="/sale">세일</CategoryLink></HighlightItem>
        </CategoryMenu>
      </HeaderBottom>
    </HeaderContainer>
  );
};

export default Header;
