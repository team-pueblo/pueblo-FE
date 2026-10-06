import { catalogProducts } from "../product/catalog";

const aliases: Record<string, string> = {
  아식스: "asics",
  자켓: "jacket",
  재킷: "jacket",
  비니: "beanie",
  아우터: "jacket",
  패딩: "puffer",
  후드집업: "hoodie",
  맨투맨: "sweatshirt",
  니트: "knit",
  셔츠: "shirt",
  티셔츠: "t-shirt",
  바지: "pants",
  데님: "denim",
  스니커즈: "sneakers",
  부츠: "boots",
  "샌들/슬리퍼": "slides",
  모자: "beanie",
  가방: "bag",
  액세서리: "accessory",
  라이프: "tumbler",
};

export function searchProducts(query: string) {
  const terms = query.normalize("NFKC").trim().toLowerCase().split(/\s+/).filter(Boolean);
  return catalogProducts.filter((product) => {
    const text = `${product.brand} ${product.name}`.normalize("NFKC").toLowerCase();
    return terms.every((term) => text.includes(aliases[term] ?? term));
  });
}
