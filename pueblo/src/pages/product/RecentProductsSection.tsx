import { SectionWrap, Grid, Card } from "./RecentProductsSection.styled";
import { type RecentItem } from "./data";
import { currency } from "./data";

//최근 본 상품
export default function RecentProductsSection({ items }: { items: RecentItem[] }) {
  return (
    <SectionWrap>
      <h3>최근 본 상품</h3>
      <Grid>
        {items.map((p, i) => (
          <Card key={i}>
            <div className="imgWrap">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="meta">
              {p.badge && <div className="badge">{p.badge}</div>}
              <div className="brand">{p.brand}</div>
              <div className="name">{p.name}</div>
              {p.soldout ? (
                <div className="soldout">품절</div>
              ) : (
                <div className="price">{currency(p.price as number)}원</div>
              )}
            </div>
          </Card>
        ))}
      </Grid>
    </SectionWrap>
  );
}
