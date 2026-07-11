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
