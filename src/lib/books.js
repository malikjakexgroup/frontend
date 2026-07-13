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

/**
 * A sharper cover URL. Google's default `zoom=1` thumbnails are ~128px (blurry when
 * enlarged); `zoom=0` returns a much larger image. We also drop the fake page-curl.
 */
export function coverUrl(url) {
  if (!url) return null;
  return url
    .replace(/^http:\/\//, "https://")
    .replace(/&edge=curl/g, "")
    .replace(/([?&])zoom=\d+/g, "$1zoom=0");
}
