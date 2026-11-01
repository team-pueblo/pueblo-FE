import axios from "axios";
export type Sku = { id: string; options: Record<string,string>; price: number; availableQuantity: number; purchaseLimit: number; saleStatus: string };
export type Product = { id: string; name: string; brand: { name: string }; imageUrl?: string; images?: string[]; salePrice: number; listPrice: number; currency: string; saleStatus: string; isNew: boolean; skus: Sku[] };
const client = axios.create({ baseURL: import.meta.env.DEV ? "http://localhost:8082/api/v1" : "/api/v1", timeout: 15000 });
export type CatalogFilter = { categoryId?: string; collection?: string; onSale?: boolean; q?: string; brandSlug?: string };
export async function getProducts(page: number, signal?: AbortSignal, filter: CatalogFilter = {}) {
 const response = await client.get<{data:{items:Product[];total:number}}>("/products", {params:{page,size:20,...filter},signal});
 return response.data.data;
}
export async function getProduct(id: string, signal?: AbortSignal) {
 const response = await client.get<{data:Product}>(`/products/${encodeURIComponent(id)}`, {signal});
 return response.data.data;
}
export const skuLimit = (sku: Sku) => sku.saleStatus === "ON_SALE" && Number.isSafeInteger(sku.availableQuantity) && Number.isSafeInteger(sku.purchaseLimit) ? Math.max(0,Math.min(9,sku.availableQuantity,sku.purchaseLimit)) : 0;

export async function getCategories(signal?: AbortSignal) {
 const response = await client.get<{data:{id:string;name:string}[]}>("/categories", {signal});
 return response.data.data;
}
