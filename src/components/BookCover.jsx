// Book cover with a nice fallback when there's no thumbnail (common until Google covers load).
export default function BookCover({ book, className = "" }) {
  if (book.thumbnail) {
    return (
      <img
        src={book.thumbnail}
        alt={book.title || "cover"}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50 p-3 text-center ${className}`}
    >
      <span className="mb-1 text-2xl opacity-60">📖</span>
      <span className="line-clamp-3 font-serif text-sm font-medium leading-tight text-amber-900/80">
        {book.title || "Untitled"}
      </span>
    </div>
  );
}
