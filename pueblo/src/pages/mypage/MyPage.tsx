import React from "react";
import { ContainerStyled, ContentWrapperStyled, SidebarStyled, MainContentStyled, PageTitleStyled } from "./MyPage.styled";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserProfileCard } from "./UserProfileCard";
import { PurchaseHistory } from "./PurchaseHistory";
import { WishlistSection } from "./WishlistSection";

const MyPage: React.FC = () => {
  return(
    <ContainerStyled>
    <ContentWrapperStyled>
      <SidebarStyled>
        <PageTitleStyled>마이 페이지</PageTitleStyled>
        <SidebarNavigation />
      </SidebarStyled>
      <MainContentStyled>
        <UserProfileCard />
        <PurchaseHistory />
        <WishlistSection />
      </MainContentStyled>
    </ContentWrapperStyled>
  </ContainerStyled>
  );
};

export default MyPage;

