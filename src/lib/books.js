// Pure, framework-free helpers — easy to unit test.

/** "James Clear, John Doe" or a fallback. */
export function authorLine(book) {
  return (book?.authors || []).join(", ") || "Unknown author";
}

/** Rating (0–5) rounded to a whole number of stars, clamped. */
export function starCount(rating) {
  const value = Number(rating) || 0;
  return Math.max(0, Math.min(5, Math.round(value)));
}
