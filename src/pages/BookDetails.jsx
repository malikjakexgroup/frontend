import { useParams, Link } from "react-router-dom";
import { useBook } from "../hooks/useBooks";
import { useFavorites } from "../hooks/useFavorites";
import { authorLine } from "../lib/books";
import BookCover from "../components/BookCover";
import Stars from "../components/Stars";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useBook(id);
  const { toggle, isFavorite } = useFavorites();

  if (isLoading) return <p className="py-24 text-center text-faint">Loading…</p>;
  if (isError || !book)
    return (
      <div className="py-24 text-center">
        <p className="font-display text-2xl text-muted">This book couldn’t be found.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-gold hover:underline">
          ← Back to discover
        </Link>
      </div>
    );

  const fav = isFavorite(book.google_id);
  const meta = [book.publisher, book.pages && `${book.pages} pages`, book.language?.toUpperCase()]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <article className="intro">
      <Link to="/" className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-gold">
        ← Discover
      </Link>

      <div className="mt-8 grid gap-10 sm:grid-cols-[240px_1fr]">
        <div className="mx-auto w-48 overflow-hidden rounded-[3px] ring-1 ring-line shadow-[0_30px_60px_-25px_rgba(198,161,91,0.3)] sm:mx-0 sm:w-full">
          <div className="aspect-[2/3] bg-surface">
            <BookCover book={book} />
          </div>
        </div>

        <div>
          <h1 className="font-display text-4xl font-light leading-tight tracking-tight">
            {book.title}
          </h1>
          <p className="mt-3 text-[13px] uppercase tracking-[0.16em] text-muted">
            {authorLine(book)}
          </p>

          <div className="mt-5"><Stars rating={book.rating} /></div>

          {meta && <p className="mt-5 text-sm text-faint">{meta}</p>}

          {(book.categories || []).length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {book.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-gold-dim/30 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-gold-dim"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {book.preview_link && (
              <a
                href={book.preview_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-black hover:shadow-[0_0_28px_-6px_rgba(198,161,91,0.6)]"
              >
                Read on Google Books
              </a>
            )}
            {book.pdf_link && (
              <a
                href={book.pdf_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-black transition hover:bg-[#d8b673] hover:shadow-[0_0_30px_-6px_rgba(198,161,91,0.7)]"
              >
                ↓ Download PDF
              </a>
            )}
            <button
              onClick={() => toggle(book)}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition ${
                fav
                  ? "border-rose/40 text-rose hover:bg-rose/10"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {fav ? "♥  Saved" : "♡  Save"}
            </button>
          </div>

          {!book.pdf_link && (
            <p className="mt-3 text-[11px] text-faint">
              Free PDF isn’t available for this edition — use “Read on Google Books” to
              preview or purchase.
            </p>
          )}
        </div>
      </div>

      {book.description && (
        <div className="mt-14 max-w-2xl border-t border-line pt-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-gold">About</p>
          <p className="mt-4 leading-[1.8] text-ink/85">{book.description}</p>
        </div>
      )}
    </article>
  );
}
