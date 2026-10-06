import React from "react";
import * as S from "./MainPage.styled";
import PromotionBanner from "./home/PromotionBanner";
import CategoryShortcuts from "./home/CategoryShortcuts";
import FeaturedProducts from "./home/FeaturedProducts";
import { Home } from "./home/Home.styled";


const MainPage: React.FC = () => {
  return (
    <S.MainPageContainer>
      <Home>
        <PromotionBanner />
        <CategoryShortcuts />
        <FeaturedProducts />
      </Home>
    </S.MainPageContainer>
  );
};

export default MainPage;
