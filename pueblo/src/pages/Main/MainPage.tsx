import React from "react";
import * as S from "./MainPage.styled";
import MainHeader from "./MainHeader";
import ProductListing from "./ProductListing";


const MainPage: React.FC = () => {
  return (
    <S.MainPageContainer>
      <MainHeader />
      <ProductListing />
    </S.MainPageContainer>
  );
};

export default MainPage;
