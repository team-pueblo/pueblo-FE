import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const ContentWrap = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <ContentWrap>
        <Outlet />
      </ContentWrap>
      <Footer />
    </AppContainer>
  );
};

export default App;