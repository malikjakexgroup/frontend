import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-800">Your favorites</h1>
      {favorites.length === 0 ? (
        <div className="py-16 text-center">
          <div className="text-4xl">🔖</div>
          <p className="mt-3 text-stone-500">No favorites yet.</p>
          <Link to="/" className="mt-3 inline-block text-amber-800 hover:underline">Discover books →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((b) => (
            <BookCard key={b.google_id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
