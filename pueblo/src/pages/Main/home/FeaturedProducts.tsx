import RemoteCatalog from "../../product/RemoteCatalog";
import * as S from "./Home.styled";
export default function FeaturedProducts() {
 return <section aria-labelledby="featured-products-title"><S.SectionHeading><h2 id="featured-products-title">지금 주목할 아이템</h2></S.SectionHeading><RemoteCatalog /></section>;
}
