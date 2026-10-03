import { catalogProducts } from "../product/catalog";

export const brands = [
  { slug: "adidas", name: "ADIDAS", korean: "아디다스" },
  { slug: "asics", name: "ASICS", korean: "아식스" },
  { slug: "converse", name: "CONVERSE", korean: "컨버스" },
  { slug: "fila", name: "FILA", korean: "휠라" },
  { slug: "new-balance", name: "NEW BALANCE", korean: "뉴발란스" },
  { slug: "nike", name: "NIKE", korean: "나이키" },
  { slug: "roa", name: "ROA", korean: "로아" },
  { slug: "salomon", name: "SALOMON", korean: "살로몬" },
  { slug: "stussy", name: "STÜSSY", korean: "스투시" },
];

const normalize = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[\s-]/g, "");

export function findBrands(query: string) {
  const term = normalize(query);
  return brands.filter((brand) => [brand.name, brand.korean, brand.slug].some((value) => normalize(value).includes(term)));
}

export function getBrandProducts(name: string) {
  return catalogProducts.filter((product) => normalize(product.brand) === normalize(name));
}
