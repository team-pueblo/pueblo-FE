import { catalogProducts } from "../product/catalog";

const aliases: Record<string, string> = {
  아식스: "asics",
  자켓: "jacket",
  재킷: "jacket",
  비니: "beanie",
};

export function searchProducts(query: string) {
  const terms = query.normalize("NFKC").trim().toLowerCase().split(/\s+/).filter(Boolean);
  return catalogProducts.filter((product) => {
    const text = `${product.brand} ${product.name}`.normalize("NFKC").toLowerCase();
    return terms.every((term) => text.includes(aliases[term] ?? term));
  });
}
