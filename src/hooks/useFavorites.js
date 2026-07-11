import { useCallback, useSyncExternalStore } from "react";

// ponytail: favorites live in localStorage — no user backend in v1.
const KEY = "favorites";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function subscribe(cb) {
  window.addEventListener("storage", cb);
  window.addEventListener("favorites", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("favorites", cb);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, () => localStorage.getItem(KEY) || "[]");
  const list = JSON.parse(favorites);

  const toggle = useCallback((book) => {
    const current = read();
    const exists = current.some((b) => b.google_id === book.google_id);
    const next = exists
      ? current.filter((b) => b.google_id !== book.google_id)
      : [...current, book];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favorites"));
  }, []);

  const isFavorite = (id) => list.some((b) => b.google_id === id);
  return { favorites: list, toggle, isFavorite };
}
