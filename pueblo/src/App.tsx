import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const ContentWrap = styled.main<{ $wide: boolean }>`
  flex: 1;
  width: ${({ $wide }) => $wide ? "min(100%, calc(80vw + 40px))" : "100%"};
  max-width: ${({ $wide }) => $wide ? "1680px" : "1200px"};
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const App: React.FC = () => {
  const { pathname } = useLocation();
  const wideCatalog = ["/", "/men", "/women", "/lifestyle", "/sale", "/search", "/favorites", "/brands"].includes(pathname)
    || pathname.startsWith("/brands/");
  return (
    <AppContainer>
      <Header />
      <ContentWrap $wide={wideCatalog}>
        <Outlet />
      </ContentWrap>
      <Footer />
    </AppContainer>
  );
};

export default App;
