import { SectionWrap, Card } from "./WithItemSection.styled";
import { type Product } from "./data";
import { currency } from "./data";

//함께 착용한 상품
export default function WithItemSection({ item }: { item: Product }) {
  return (
    <SectionWrap>
      <h3>함께 착용한 상품</h3>
      <Card>
        <img src={item.img!} alt={item.name} />
        <div className="meta">
          <div className="brand">{item.brand}</div>
          <div className="name">{item.name}</div>
          <div className="price">₩ {currency(item.price)}원</div>
        </div>
      </Card>
    </SectionWrap>
  );
}
