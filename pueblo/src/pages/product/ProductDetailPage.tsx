import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bookmark, Heart, Share2, ChevronUp, ChevronDown } from "lucide-react";
import { catalogProducts } from "./catalog";
import { currency } from "./data";
import { addCartItem } from "../cart/cartStorage";
import { useFavorites } from "../favorites/useFavorites";
import * as S from "./ProductDetailPage.styled";

type CatalogProduct = (typeof catalogProducts)[number];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = catalogProducts.find((item) => String(item.id) === id);
  if (!product) {
    return <S.Page><S.Container><h1>상품을 찾을 수 없습니다.</h1><Link to="/">상품 목록으로 돌아가기</Link></S.Container></S.Page>;
  }
  return <ProductDetailContent key={product.id} product={product} />;
}

function ProductDetailContent({ product }: { product: CatalogProduct }) {
  const { ids, setFavorite } = useFavorites();
  const wish = ids.includes(product.id);
  const [wishMessage, setWishMessage] = useState("");
  const [brandWish, setBrandWish] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({ details: true });
  const sections = [
    { id: "details", title: "상세 정보", text: `${product.brand} ${product.name}의 상세 정보는 준비 중입니다.` },
    { id: "shipping", title: "배송 안내", text: "상품별 배송 일정과 배송비는 주문 전 안내됩니다." },
    { id: "returns", title: "교환 및 반품 안내", text: "교환 및 반품 조건은 상품 정보 등록 후 안내됩니다." },
    { id: "service", title: "A/S 안내", text: "상품별 A/S 정보는 준비 중입니다." },
  ];

  const addToCart = () => {
    try {
      const added = addCartItem({
        id: `catalog-${product.id}`,
        brand: product.brand,
        name: product.name,
        price: product.price,
        img: product.imageUrl,
        qty: 1,
        option: "옵션 미선택",
        seller: "pueblo",
        condition: "새상품",
      });
      setMessage(added ? "장바구니에 담았습니다." : "같은 상품은 최대 9개까지 담을 수 있습니다.");
    } catch {
      setMessage("장바구니에 담지 못했습니다. 브라우저 저장 공간을 확인해주세요.");
    }
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("상품 링크를 복사했습니다.");
    } catch {
      setMessage("주소창의 상품 링크를 복사해 주세요.");
    }
  };

  return (
    <S.Page>
      <S.Container>
        <S.Main>
          <S.Viewer><img src={product.imageUrl} alt={product.name} /></S.Viewer>
          <S.Panel>
            <S.PanelTop>
              <span className="brand">{product.brand}</span>
              <button type="button" aria-label="브랜드 관심 등록" aria-pressed={brandWish} onClick={() => setBrandWish(!brandWish)}>
                <Bookmark size={16} fill={brandWish ? "currentColor" : "none"} />
              </button>
            </S.PanelTop>
            {product.isNew && <S.Badge>신상품</S.Badge>}
            <S.Title>{product.name}</S.Title>
            <S.PriceRow>{currency(product.price)}원</S.PriceRow>
            <S.InfoLink type="button" onClick={() => {
              setOpen((previous) => ({ ...previous, details: true }));
              document.getElementById("product-details-heading")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }}>상품 정보 고시</S.InfoLink>
            <S.SmallText>상품 옵션을 준비 중입니다.</S.SmallText>
            <S.CTA>
              <div className="actions">
                <S.IconBtn type="button" aria-label={wish ? "상품 관심 해제" : "상품 관심 등록"} aria-pressed={wish} onClick={() => {
                  try {
                    setFavorite(product.id, !wish);
                    setWishMessage(wish ? "관심목록에서 삭제했습니다." : "관심목록에 저장했습니다.");
                  } catch {
                    setWishMessage("관심목록을 저장하지 못했습니다. 브라우저 저장 공간을 확인해주세요.");
                  }
                }}>
                  <Heart size={18} fill={wish ? "currentColor" : "none"} />
                </S.IconBtn>
                <S.IconBtn type="button" aria-label="상품 공유" onClick={share}><Share2 size={17} /></S.IconBtn>
                <S.CartButton type="button" onClick={addToCart}>장바구니 담기</S.CartButton>
              </div>
              <S.BuyButton disabled>구매하기</S.BuyButton>
            </S.CTA>
            {wishMessage && <S.SmallText role="status">{wishMessage} <Link to="/favorites">관심목록 보기</Link></S.SmallText>}
            {message && <S.SmallText role="status">{message} <Link to="/cart">장바구니 보기</Link></S.SmallText>}
            <S.Accordion>
              {sections.map((section) => (
                <S.Section key={section.id}>
                  <S.SectionHead id={`product-${section.id}-heading`} aria-expanded={!!open[section.id]} aria-controls={`product-${section.id}-body`} onClick={() => setOpen((previous) => ({ ...previous, [section.id]: !previous[section.id] }))}>
                    {section.title}{open[section.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </S.SectionHead>
                  <S.SectionBody id={`product-${section.id}-body`} hidden={!open[section.id]}>{section.text}</S.SectionBody>
                </S.Section>
              ))}
            </S.Accordion>
          </S.Panel>
        </S.Main>
        <S.Recommendations aria-labelledby="recommendation-heading">
          <h2 id="recommendation-heading">추천 상품</h2>
          <S.RecommendationList>
            {catalogProducts.filter((item) => item.id !== product.id).map((item) => (
              <S.RecommendationCard key={item.id} to={`/product/${item.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>
                <img src={item.imageUrl} alt={item.name} loading="lazy" />
                {item.isNew && <p>신상품</p>}
                <p className="brand">{item.brand}</p>
                <p>{item.name}</p>
                <p className="price">{currency(item.price)}원</p>
              </S.RecommendationCard>
            ))}
          </S.RecommendationList>
        </S.Recommendations>
      </S.Container>
    </S.Page>
  );
}
