export type CartItem = {
  id: string;
  brand: string;
  name: string;
  option?: string;
  price: number;
  fee?: number;
  img: string;
  qty: number;
  seller?: string;
  condition?: "새상품" | "중고" | "미개봉";
  limited?: boolean;
};

export type CartState = {
  items: CartItem[];
  code: string;
  shipping: "일반" | "특급";
  agreement: boolean;
};

const STORAGE_KEY = "CART_V1";
type CartStorage = Pick<Storage, "getItem" | "setItem">;

export function readCart(storage: CartStorage = window.localStorage): CartState {
  const empty: CartState = { items: [], code: "", shipping: "일반", agreement: false };
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
    if (!value || !Array.isArray(value.items)) return empty;
    const items = value.items.filter((item: CartItem) => item &&
      typeof item.id === "string" && typeof item.name === "string" &&
      typeof item.brand === "string" && typeof item.img === "string" &&
      Number.isFinite(item.price) && item.price >= 0 &&
      Number.isInteger(item.qty) && item.qty >= 1 && item.qty <= 9);
    return { items, code: typeof value.code === "string" ? value.code : "", shipping: value.shipping === "특급" ? "특급" : "일반", agreement: false };
  } catch {
    return empty;
  }
}

export function saveCart(state: CartState, storage: CartStorage = window.localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addCartItem(item: CartItem, storage: CartStorage = window.localStorage) {
  const state = readCart(storage);
  const existing = state.items.find((entry) => entry.id === item.id);
  if (existing && existing.qty >= 9) return false;
  const items = existing
    ? state.items.map((entry) => entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry)
    : [...state.items, { ...item, qty: 1 }];
  saveCart({ ...state, items, agreement: false }, storage);
  return true;
}
