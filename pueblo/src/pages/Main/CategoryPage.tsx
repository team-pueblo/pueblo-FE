import { MainPageContainer } from "./MainPage.styled";
import MainHeader from "./MainHeader";
import ProductListing from "./ProductListing";

const CategoryPage = ({ title }: { title: string }) => (
  <MainPageContainer>
    <MainHeader key={title} title={title} />
    <ProductListing />
  </MainPageContainer>
);

export default CategoryPage;
