import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import Reveal from "../components/Reveal";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Your shelf</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight">Favorites</h1>

      {favorites.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-muted">Your shelf is empty.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-gold hover:underline">
            Discover something to keep →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((b, i) => (
            <Reveal key={b.google_id} delay={Math.min(i, 10) * 55}>
              <BookCard book={b} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
