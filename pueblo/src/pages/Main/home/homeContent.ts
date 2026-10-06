import { catalogProducts } from "../../product/catalog";

export const promotions = [
  {
    id: "outerwear",
    title: "지금 필요한\n나만의 아우터",
    description: "계절을 준비하는 pueblo의 스타일 셀렉션",
    image: "/images/home/outerwear-campaign.png",
    to: "/search?q=JACKET",
    campaign: true,
  },
  {
    id: "asics",
    title: "매일의 움직임을\n새롭게, ASICS",
    description: "일상에 더하는 스포티한 감각",
    image: catalogProducts[2].imageUrl,
    to: "/brands/asics",
    campaign: false,
  },
];

export const shortcuts = [
  "아우터", "패딩", "후드집업", "맨투맨",
  "니트", "셔츠", "티셔츠", "바지",
  "데님", "스니커즈", "부츠", "샌들/슬리퍼",
  "모자", "가방", "액세서리", "라이프",
].map((label, index) => ({
  id: label,
  label,
  to: `/search?q=${encodeURIComponent(label)}`,
  imagePosition: `${(index % 4) * 100 / 3}% ${Math.floor(index / 4) * 100 / 3}%`,
}));

export const featuredProducts = [...catalogProducts].sort((a, b) => Number(b.isNew) - Number(a.isNew));
