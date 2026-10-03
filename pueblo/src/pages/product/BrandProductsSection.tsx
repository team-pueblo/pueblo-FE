import { SectionWrap, Grid, Card } from "./BrandProductsSection.styled";
import { type Product } from "./data";
import { currency } from "./data";

// 브랜드 상품 목록
export default function BrandProductsSection({ items }: { items: Product[] }) {
  return (
    <SectionWrap>
      <h3>브랜드 상품</h3>
      <Grid>
        {items.map((p, i) => (
          <Card key={i}>
            <img src={p.img!} alt={p.name} />
            <div className="brand">{p.brand}</div>
            <div className="name">{p.name}</div>
            <div className="price">₩ {currency(p.price)}</div>
          </Card>
        ))}
      </Grid>
    </SectionWrap>
  );
}
