import { catalogProducts } from "../product/catalog";

export const FAVORITES_KEY = "PUEBLO_FAVORITES_V1";
export const FAVORITES_CHANGED = "pueblo:favorites-changed";
type FavoritesStorage = Pick<Storage, "getItem" | "setItem">;

export function parseFavorites(raw: string | null): number[] {
  try {
    const value: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is number =>
      typeof id === "number" && catalogProducts.some((product) => product.id === id)))];
  } catch {
    return [];
  }
}

export function saveFavorite(id: number, saved: boolean, storage: FavoritesStorage = window.localStorage) {
  if (!catalogProducts.some((product) => product.id === id)) return;
  const ids = parseFavorites(storage.getItem(FAVORITES_KEY));
  const next = saved ? [...new Set([...ids, id])] : ids.filter((value) => value !== id);
  storage.setItem(FAVORITES_KEY, JSON.stringify(next));
}
