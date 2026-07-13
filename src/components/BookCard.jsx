import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { authorLine } from "../lib/books";
import BookCover from "./BookCover";
import Stars from "./Stars";

export default function BookCard({ book }) {
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(book.google_id);

  return (
    <div className="group transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1.5">
      <Link
        to={`/book/${book.google_id}`}
        className="relative block aspect-[2/3] overflow-hidden rounded-[2px] bg-surface ring-1 ring-line transition duration-300 group-hover:ring-gold/45 group-hover:shadow-[0_24px_60px_-20px_rgba(198,161,91,0.45)]"
      >
        <BookCover book={book} className="transition duration-700 ease-out group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(book);
          }}
          aria-label={fav ? "Remove favorite" : "Add favorite"}
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition ${
            fav
              ? "border-rose/40 bg-black/50 text-rose"
              : "border-white/10 bg-black/40 text-white/60 opacity-0 hover:text-rose group-hover:opacity-100"
          }`}
        >
          {fav ? "♥" : "♡"}
        </button>
      </Link>

      <div className="mt-3.5">
        <Link
          to={`/book/${book.google_id}`}
          className="block font-display text-[15px] leading-snug text-ink transition-colors line-clamp-2 group-hover:text-gold"
        >
          {book.title || "Untitled"}
        </Link>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted line-clamp-1">
          {authorLine(book)}
        </p>
        <div className="mt-2">
          <Stars rating={book.rating} />
        </div>
      </div>
    </div>
  );
}
