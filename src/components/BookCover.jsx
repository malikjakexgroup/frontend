import { coverUrl } from "../lib/books";

// Cover with a refined dark fallback when there's no thumbnail.
export default function BookCover({ book, className = "" }) {
  if (book.thumbnail) {
    return (
      <img
        src={coverUrl(book.thumbnail)}
        alt={book.title || "cover"}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface2 p-5">
      <div className="flex h-full w-full items-center justify-center border border-gold-dim/30 p-3">
        <span className="font-display text-sm leading-snug text-gold-dim line-clamp-4 text-center">
          {book.title || "Untitled"}
        </span>
      </div>
    </div>
  );
}
