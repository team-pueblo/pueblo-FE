import { useState, lazy, Suspense } from "react";
import { Search, ShoppingCart, User, Bell, Bookmark } from "lucide-react";
import {
  Page, TopBar, Container, Main, Viewer, Panel, PanelTop, Title, SubTitle, SmallText,
  PriceRow, SizeGrid, SizePill, FitInfo, Links, CTA, BigButton, IconBtn,
  Accordion, Section, SectionHead, SectionBody, CartButton, BuyButton
} from "./ProductDetailPage.styled";
import { PRODUCT, BRAND_PRODUCTS, RECENT_PRODUCTS, WITH_ITEM, INVENTORY, currency, type Size } from './data';

const WithItemSection = lazy(() => import("./WithItemSection"));
const BrandProductsSection = lazy(() => import("./BrandProductsSection"));
const RecentProductsSection = lazy(() => import("./RecentProductsSection"));

export default function ProductDetailPage() {
  const [img, setImg] = useState(0);
  const [size, setSize] = useState<Size | null>(null);
  const [open, setOpen] = useState<{ [k: string]: boolean }>({ 상세정보: true, 배송안내: false, 반품안내: false });
  
  // 두 개의 위시리스트 상태 관리
  const [isInProductWishlist, setIsInProductWishlist] = useState(false);
  const [isInBrandWishlist, setIsInBrandWishlist] = useState(false);

  const IMAGES = PRODUCT?.images ?? [];
  const SIZES  = PRODUCT?.sizes ?? [];
  const FIT    = PRODUCT?.fit;

  const toggle = (k: string) => setOpen((p) => ({ ...p, [k]: !p[k] }));
  const addToCart = () => {
    if (!size) return alert("사이즈를 선택해주세요");
    alert(`장바구니 담기: ${PRODUCT.name} / ${size}`);
  };

  const handleImageClick = (direction: "next" | "prev") => {
    if (direction === "next") {
      setImg((prev) => (prev + 1) % IMAGES.length);
    } else if (direction === "prev") {
      setImg((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  // 상품 위시리스트 토글
  const toggleProductWishlist = () => {
    setIsInProductWishlist((prevState) => !prevState);
    alert(isInProductWishlist ? "상품 위시리스트에서 제거되었습니다." : "상품 위시리스트에 추가되었습니다.");
  };

  // 브랜드 위시리스트 토글
  const toggleBrandWishlist = () => {
    setIsInBrandWishlist((prevState) => !prevState);
    alert(isInBrandWishlist ? "브랜드 위시리스트에서 제거되었습니다." : "브랜드 위시리스트에 추가되었습니다.");
  };

  return (
    <Page>
      <TopBar>
        <div className="left" />
        <div className="right">
          <Search size={18} /><ShoppingCart size={18} /><User size={18} /><Bell size={18} />
        </div>
      </TopBar>

      <Container>
        <Main>
          <Viewer>
            {IMAGES.length > 0 && (
              <>
                <img
                  src={IMAGES[img]}
                  alt={`모델 이미지 ${img + 1}`}
                  onClick={() => handleImageClick("next")} 
                />
              </>
            )}
          </Viewer>

          <Panel>
            <PanelTop>
              <span className="brand">{PRODUCT.brand}</span>
              {/* 브랜드 위시리스트 버튼 */}
              <button className="bookmark" aria-label="브랜드 위시리스트" onClick={toggleBrandWishlist}>
                <Bookmark size={18} color={isInBrandWishlist ? "#0d5e4c" : "#e3e3e3"} />
              </button>
              
            </PanelTop>

            <Title>{PRODUCT.name}</Title>
            <SubTitle><b>{PRODUCT.color}</b></SubTitle>
            <SmallText>{PRODUCT.koName}</SmallText>
            <SmallText>{PRODUCT.sku}</SmallText>

            <PriceRow>
              <span className="label">정상가</span>
              <span className="price">{currency(PRODUCT.price)}원</span>
            </PriceRow>

            <SizeGrid>
              {SIZES.map((s) => {
                const left = INVENTORY?.[s] ?? 0;
                const soldout = left === 0;
                return (
                  <SizePill key={s} as="button" $active={size === s} disabled={soldout} onClick={() => setSize(s)} title={soldout ? "일시 품절" : `잔여 ${left}`}>
                    {s}
                  </SizePill>
                );
              })}
            </SizeGrid>

            {FIT && (
              <FitInfo>
                <div>키/몸무게: {FIT.hw}</div>
                <div>착용 사이즈 : {FIT.wearing}</div>
              </FitInfo>
            )}

            <Links>
              <a href="#" onClick={(e) => e.preventDefault()}>사이즈 가이드</a>
              <a href="#" onClick={(e) => e.preventDefault()}>상품 정보 고시</a>
            </Links>

            <CTA>
              {/* 조건에 따라 두 개의 버튼을 나란히 보이게 */}
              {!size ? (
              <BigButton disabled={!size} style={{ width: "100%" }}>
                사이즈를 선택해주세요.
              </BigButton>
              ) : (
                <div style={{ display: "flex", width: "100%" }}>
                  <CartButton onClick={addToCart} style={{ flex: 1, marginRight: "8px" }}>
                    장바구니
                  </CartButton>
                  <BuyButton onClick={() => alert("구매하기")} $disabled={false} style={{ flex: 1 }}>
                    구매하기
                  </BuyButton>
                </div>
              )}
              {/* 상품 위시리스트 버튼 */}
              <IconBtn className="bookmark" aria-label="상품 위시리스트" onClick={toggleProductWishlist}>
                <Bookmark size={18} color={isInProductWishlist ? "#0d5e4c" : "#e3e3e3"} />
              </IconBtn>
            </CTA>

            {/* 아코디언 */}
            <Accordion>
              <Section>
                <SectionHead onClick={() => toggle("상세정보")}>
                  <span>상세정보</span>
                  <span>{open["상세정보"] ? "▴" : "▾"}</span>
                </SectionHead>
               {open["상세정보"] && <SectionBody>ROA Hiking은 2015년 이탈리아에서 시작된 하이브리드 아웃도어 브랜드입니다...</SectionBody>}
              </Section>

              <Section>
                <SectionHead onClick={() => toggle("배송안내")}>
                  <span>배송 안내</span>
                  <span>{open["배송안내"] ? "▴" : "▾"}</span>
                </SectionHead>
                {open["배송안내"] && <SectionBody>배송은 3일 이내에 완료됩니다. 자세한 사항은 배송 정책을 참조해주세요.</SectionBody>}
              </Section>

              <Section>
                <SectionHead onClick={() => toggle("반품안내")}>
                  <span>반품 안내</span>
                  <span>{open["반품안내"] ? "▴" : "▾"}</span>
                </SectionHead>
                {open["반품안내"] && <SectionBody>상품에 대한 반품은 배송 완료 후 7일 이내에 가능합니다.</SectionBody>}
              </Section>

              <Section>
                <SectionHead onClick={() => toggle("A/S 안내")}>
                  <span>A/S 안내</span>
                    <span>{open["A/S 안내"] ? "▴" : "▾"}</span>
                </SectionHead>
               {open["A/S 안내"] && <SectionBody>제품에 대한 A/S는 구매 후 1년 이내에 제공됩니다.</SectionBody>}
              </Section>
            </Accordion>

          </Panel>
        </Main>

        {/* 🔥 섹션도 Suspense로 감싸서 안전하게 로드 */}
        <Suspense fallback={null}>
          <WithItemSection item={WITH_ITEM} />
        </Suspense>
        <Suspense fallback={null}>
          <BrandProductsSection items={BRAND_PRODUCTS} />
        </Suspense>
        <Suspense fallback={null}>
          <RecentProductsSection items={RECENT_PRODUCTS} />
        </Suspense>
      </Container>
    </Page>
  );
}
