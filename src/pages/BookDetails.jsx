import { useParams, Link } from "react-router-dom";
import { useBook } from "../hooks/useBooks";
import { useFavorites } from "../hooks/useFavorites";
import BookCover from "../components/BookCover";
import Stars from "../components/Stars";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useBook(id);
  const { toggle, isFavorite } = useFavorites();

  if (isLoading) return <p className="py-16 text-center text-stone-400">Loading…</p>;
  if (isError || !book)
    return (
      <div className="py-16 text-center">
        <p className="text-stone-500">Book not found.</p>
        <Link to="/" className="mt-3 inline-block text-amber-800 hover:underline">← Back to search</Link>
      </div>
    );

  const fav = isFavorite(book.google_id);
  const meta = [book.publisher, book.pages && `${book.pages} pages`, book.language?.toUpperCase()].filter(Boolean);

  return (
    <div>
      <Link to="/" className="text-sm text-stone-500 hover:text-amber-800">← Back</Link>

      <div className="mt-4 grid gap-8 sm:grid-cols-[200px_1fr]">
        <div className="mx-auto w-40 overflow-hidden rounded-2xl border border-stone-200 shadow-md sm:mx-0 sm:w-full">
          <div className="aspect-[3/4] bg-stone-100">
            <BookCover book={book} />
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold leading-tight text-stone-800">{book.title}</h1>
          <p className="mt-1 text-lg text-stone-500">{(book.authors || []).join(", ") || "Unknown author"}</p>

          <div className="mt-3"><Stars rating={book.rating} /></div>

          {meta.length > 0 && (
            <p className="mt-3 text-sm text-stone-400">{meta.join(" · ")}</p>
          )}

          {(book.categories || []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {book.categories.map((c) => (
                <span key={c} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  {c}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => toggle(book)}
            className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium shadow-sm transition ${
              fav ? "bg-rose-50 text-rose-600 hover:bg-rose-100" : "bg-amber-800 text-white hover:bg-amber-900"
            }`}
          >
            {fav ? "♥ Saved to favorites" : "♡ Add to favorites"}
          </button>
        </div>
      </div>

      {book.description && (
        <div className="mt-8 max-w-2xl">
          <h2 className="font-serif text-lg font-semibold text-stone-800">About this book</h2>
          <p className="mt-2 leading-relaxed text-stone-600">{book.description}</p>
        </div>
      )}
    </div>
  );
}
