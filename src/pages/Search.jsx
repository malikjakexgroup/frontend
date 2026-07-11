import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { useSearch } from "../hooks/useBooks";

const SUGGESTIONS = ["Atomic Habits", "Deep Work", "Fiction", "Science", "History"];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const { data, isLoading, isError } = useSearch(q);
  const go = (value) => setParams(value ? { q: value } : {});

  return (
    <div>
      {!q && (
        <section className="pb-8 pt-6 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-800 sm:text-5xl">
            Find your next favorite book
          </h1>
          <p className="mx-auto mt-3 max-w-md text-stone-500">
            Search millions of titles by name, author, or topic — and save the ones you love.
          </p>
        </section>
      )}

      <div className="mx-auto max-w-2xl">
        <SearchBar initial={q} onSearch={go} />
        {!q && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-stone-400">Try:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => go(s)}
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-600 transition hover:border-amber-300 hover:text-amber-800"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {q && (
        <div className="mt-10">
          {isLoading && (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] rounded-2xl bg-stone-200" />
                  <div className="mt-2 h-3 w-3/4 rounded bg-stone-200" />
                  <div className="mt-1 h-3 w-1/2 rounded bg-stone-200" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-center text-rose-700">
              Something went wrong. Please try again.
            </p>
          )}

          {data && data.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-4xl">🔍</div>
              <p className="mt-3 text-stone-500">No books found for “{q}”.</p>
            </div>
          )}

          {data && data.length > 0 && (
            <>
              <p className="mb-4 text-sm text-stone-500">
                {data.length} result{data.length > 1 ? "s" : ""} for “<span className="font-medium text-stone-700">{q}</span>”
              </p>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {data.map((b) => (
                  <BookCard key={b.google_id} book={b} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
