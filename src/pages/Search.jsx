import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import { useSearch, useFeatured } from "../hooks/useBooks";

const SUGGESTIONS = ["Atomic Habits", "Harry Potter", "Sapiens", "1984", "The Hobbit"];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const { data, isLoading, isError } = useSearch(q);
  const { data: featured = [] } = useFeatured();
  const go = (value) => setParams(value ? { q: value } : {});

  return (
    <div>
      {!q && (
        <section className="intro pb-10 pt-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Discover</p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight sm:text-6xl">
            Find the book you <span className="italic text-gold">didn’t know</span> you needed.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            A quiet, considered way to search millions of titles — and keep the ones
            that stay with you.
          </p>
        </section>
      )}

      <div className={q ? "" : "max-w-2xl"}>
        <SearchBar initial={q} onSearch={go} />
        {!q && (
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-faint">Begin with</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => go(s)}
                className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted hover:border-gold/50 hover:text-gold"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- Landing showcase: drifting cover walls + curated grid --- */}
      {!q && featured.length > 0 && (
        <>
          <div className="mt-16 -mx-6 space-y-4">
            <Marquee books={featured.slice(0, 14)} />
            <Marquee books={featured.slice(14, 28)} reverse />
          </div>

          <section className="mt-20">
            <div className="mb-8 flex items-baseline justify-between">
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Popular now</p>
              <span className="text-[10px] uppercase tracking-[0.18em] text-faint">Handpicked</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {featured.slice(0, 12).map((b, i) => (
                <Reveal key={b.google_id} delay={Math.min(i, 10) * 55}>
                  <BookCard book={b} />
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}

      {/* --- Search results --- */}
      {q && (
        <div className="mt-12">
          {isLoading && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[2/3] rounded-[2px] bg-surface2" />
                  <div className="mt-3.5 h-3 w-3/4 rounded bg-surface2" />
                  <div className="mt-2 h-2.5 w-1/2 rounded bg-surface2" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="border-l-2 border-rose/60 pl-4 text-sm text-rose">
              Something interrupted the search. Please try again.
            </p>
          )}

          {data && data.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-muted">Nothing found for “{q}”.</p>
              <p className="mt-2 text-sm text-faint">Try another title or author.</p>
            </div>
          )}

          {data && data.length > 0 && (
            <>
              <p className="mb-8 text-[11px] uppercase tracking-[0.2em] text-muted">
                {data.length} result{data.length > 1 ? "s" : ""} · “<span className="text-ink">{q}</span>”
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {data.map((b, i) => (
                  <Reveal key={b.google_id} delay={Math.min(i, 10) * 55}>
                    <BookCard book={b} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
