import { useQuery } from "@tanstack/react-query";
import { searchBooks, getBook } from "../services/api";

export function useSearch(q) {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () => searchBooks(q),
    enabled: !!q,
  });
}

export function useBook(id) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
    enabled: !!id,
  });
}

// A curated set for the landing page — a few popular topics merged and de-duped,
// keeping only books that have a cover so the showcase looks rich.
export function useFeatured() {
  return useQuery({
    queryKey: ["featured"],
    staleTime: Infinity,
    queryFn: async () => {
      const topics = ["bestselling novels", "science", "history", "fantasy", "philosophy"];
      const lists = await Promise.all(
        topics.map((t) => searchBooks(t).catch(() => []))
      );
      const seen = new Set();
      const merged = [];
      for (const list of lists) {
        for (const b of list) {
          if (b.thumbnail && !seen.has(b.google_id)) {
            seen.add(b.google_id);
            merged.push(b);
          }
        }
      }
      return merged.slice(0, 28);
    },
  });
}
