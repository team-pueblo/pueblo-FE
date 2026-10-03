import { useSyncExternalStore } from "react";
import { FAVORITES_KEY, FAVORITES_CHANGED, parseFavorites, saveFavorite } from "./favoritesStorage";

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === FAVORITES_KEY || event.key === null) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(FAVORITES_CHANGED, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(FAVORITES_CHANGED, notify);
  };
}

function getSnapshot() {
  try { return window.localStorage.getItem(FAVORITES_KEY); }
  catch { return null; }
}

export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const ids = parseFavorites(raw);
  const setFavorite = (id: number, saved: boolean) => {
    saveFavorite(id, saved);
    window.dispatchEvent(new Event(FAVORITES_CHANGED));
  };
  return { ids, setFavorite };
}
