import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import BookCover from "./BookCover";
import Stars from "./Stars";

export default function BookCard({ book }) {
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(book.google_id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/book/${book.google_id}`} className="relative block aspect-[3/4] overflow-hidden bg-stone-100">
        <BookCover book={book} className="transition duration-300 group-hover:scale-105" />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(book);
          }}
          aria-label={fav ? "Remove favorite" : "Add favorite"}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-lg shadow-sm backdrop-blur transition ${
            fav ? "bg-white text-rose-500" : "bg-white/80 text-stone-400 hover:text-rose-500"
          }`}
        >
          {fav ? "♥" : "♡"}
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link
          to={`/book/${book.google_id}`}
          className="font-serif font-semibold leading-snug text-stone-800 line-clamp-2 hover:text-amber-800"
        >
          {book.title || "Untitled"}
        </Link>
        <p className="mt-0.5 line-clamp-1 text-sm text-stone-500">
          {(book.authors || []).join(", ") || "Unknown author"}
        </p>
        <div className="mt-auto pt-2">
          <Stars rating={book.rating} />
        </div>
      </div>
    </div>
  );
}
